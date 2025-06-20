export const selecionarPista = (idPista, pistas) => {
  return pistas.find(pista => pista.id === idPista)
}
export const selecionarPersonagens = (idsDePersonagens, personagens) => {
  return idsDePersonagens.map(idPersonagem => {
    return personagens.find(personagem => personagem.id === idPersonagem)
  })
}
export const escolherAliadoEInimigo = (corredor, idAliado, idInimigo, personagens) => {
  const aliado = personagens.find(personagem => personagem.id === idAliado)
  const inimigo = personagens.find(personagem => personagem.id === idInimigo)
  return {
    ...corredor,
    aliado: aliado?.nome,
    inimigo: inimigo?.nome
  }
}

export const calcularVantagemPista = (corredor, pista) => {
  if (corredor.vantagem === pista.tipo) {
    return {
      ...corredor,
      velocidade: corredor.velocidade + 2,
      drift: corredor.drift + 2,
      aceleracao: corredor.aceleracao + 2
    }
  }
  return corredor 
}
export const calcularDebuffPista = (corredor, pista) => {
  return  {
    ...corredor,
    velocidade: corredor.velocidade + pista.debuff,
    drift: corredor.drift + pista.debuff,
    aceleracao: corredor.aceleracao + pista.debuff
  }
}
export const calcularBuffAliado = (personagem, corredores) => { 
  const nomeAliado = personagem.aliado || ""
  const corredorAliado = corredores.find(corredor => corredor.nome === nomeAliado)
  
  if (corredorAliado) {
    const diferencaAbsoluta = Math.abs(personagem.posicaoAtual - corredorAliado.posicaoAtual)
    if (diferencaAbsoluta >= 0 && diferencaAbsoluta <= 2) {     
      return {
        ...personagem,
        velocidade: personagem.velocidade + 1,
        drift: personagem.drift + 1,
        aceleracao: personagem.aceleracao + 1
      }    
    }
  }
  return personagem
}
export const calcularDebuffInimigo = (personagem, corredores) => {
  const nomeInimigo = personagem.inimigo || ""
  const corredorInimigo = corredores.find(corredor => corredor.nome === nomeInimigo)
  if (corredorInimigo) {
    const diferencaAbsoluta = Math.abs(personagem.posicaoAtual - corredorInimigo.posicaoAtual)
    if (diferencaAbsoluta >= 0 && diferencaAbsoluta <= 2) {
      return {
        ...personagem,
        velocidade: personagem.velocidade - 1,
        drift: personagem.drift - 1,
        aceleracao: personagem.aceleracao - 1
      }    
    }
  }
  return personagem
}



export const calcularBuffPosicaoPista = (corredores, pista) => {
  const corredoresOrdenados = [...corredores].sort((a, b) => b.posicaoAtual - a.posicaoAtual)

  return corredoresOrdenados.map(corredor => {
    for (const posicaoBuff of pista.posicoesBuffs) {

      if (corredor.posicaoAtual >= posicaoBuff && corredor.posicaoAnterior < posicaoBuff) {
        const corredoresQuePassaramEstePontoAntesCorredorAtual = corredoresOrdenados.filter(
          corredorFilter => 
            corredorFilter.posicaoAtual >= posicaoBuff 
            && corredorFilter.posicaoAtual > corredor.posicaoAtual
        )
      
        const buff = corredoresQuePassaramEstePontoAntesCorredorAtual.length
        return {
          ...corredor,
          velocidade: corredor.velocidade + buff,
          drift: corredor.drift + buff,
          aceleracao: corredor.aceleracao + buff
        }
      }
    }
    return corredor    
  })
}

export const calcularNovaPosicao = (corredores, rodadaAtual) => {
  if (rodadaAtual <= 3) {
    return corredores.map(corredor => {
      const velocidade = corredor.aceleracao > 0 ? corredor.aceleracao : 0
      const proximaPosicao = corredor.posicaoAtual + velocidade
      return {
        ...corredor,
        posicaoAnterior: corredor.posicaoAtual,
        posicaoAtual: proximaPosicao
      }
    })
  }
  else if (rodadaAtual % 4 === 0) {
    return corredores.map(corredor => {
      const velocidade = corredor.drift > 0 ? corredor.drift : 0
      const proximaPosicao = corredor.posicaoAtual + velocidade
      return {
        ...corredor,
        posicaoAnterior: corredor.posicaoAtual,
        posicaoAtual: proximaPosicao
      }
    }) 
  }
  else {
    return corredores.map(corredor => {
      const velocidade = corredor.velocidade > 0 ? corredor.velocidade : 0
      const proximaPosicao = corredor.posicaoAtual + velocidade
      return {
        ...corredor,
        posicaoAnterior: corredor.posicaoAtual,
        posicaoAtual: proximaPosicao
      }
    })
  }
}

//retornar o vencedor
export const realizarCorrida = (pista, corredores) => {
  let rodadaAtual = 1
  const corredoresPosicoes = corredores.map(corredor => ({
    ...corredor,
    posicaoAtual: 0,
    posicaoAnterior: 0
  }))
  let corredoresComPosicaoIncrementada = corredoresPosicoes
  
  while (true) {
    //Incrementar buffs e debuffs
    const corredoresComDebuffPista = corredoresComPosicaoIncrementada.map(corredor => calcularDebuffPista(corredor, pista))
    const corredoresComBuffAliado = corredoresComDebuffPista.map(corredor => calcularBuffAliado(corredor, corredoresComDebuffPista))
    const corredoresComDebuffInimigo = corredoresComBuffAliado.map(corredor => calcularDebuffInimigo(corredor, corredoresComBuffAliado))
    const corredoresComBuffPosicaoPista = calcularBuffPosicaoPista(corredoresComDebuffInimigo, pista)

    //Incrementar a posicao dos corredores
    corredoresComPosicaoIncrementada = calcularNovaPosicao(corredoresComBuffPosicaoPista, rodadaAtual)
  
    //Verificar se houve vencedor
    const vencedor = corredoresComPosicaoIncrementada.find(
      corredor => corredor.posicaoAtual >= pista.tamanho && corredor.nome !== 'Dick Vigarista'
    )
    
    if (vencedor) {
      return vencedor
    }
    corredoresComPosicaoIncrementada = corredoresComPosicaoIncrementada.map(corredor => {
      const corredorOriginal = corredores.find(corredorOriginal => corredorOriginal.id === corredor.id)
      return {
        ...corredor,
        velocidade: corredorOriginal.velocidade,
        drift: corredorOriginal.drift,
        aceleracao: corredorOriginal.aceleracao
      }
    })
    rodadaAtual++
  }
}