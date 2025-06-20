import { 
  selecionarPista, 
  selecionarPersonagens, 
  escolherAliadoEInimigo,
  calcularVantagemPista,
  calcularDebuffPista,
  calcularBuffPosicaoPista,
  calcularBuffAliado,
  calcularDebuffInimigo, 
  realizarCorrida,
  calcularNovaPosicao
} from "../src/corrida"

import axios from "axios"

let pistas
let personagens

beforeAll(async () => {
  pistas = (await axios.get("https://gustavobuttenbender.github.io/gus.github/corrida-maluca/pistas.json")).data 
  personagens = (await axios.get("https://gustavobuttenbender.github.io/gus.github/corrida-maluca/personagens.json")).data 
})

describe('Corrida Maluca', () => {
  it('Deve conseguir obter a pista corretamente', () => {
    const pistaEsperada = {
      "id": 1,
      "nome": "Himalaia", 
      "tipo": "MONTANHA",
      "descricao": "Uma montanha nevada, os corredores devem dar uma volta inteira nela, como existe muita neve eles terão dificuldade em enxergar",
      "tamanho": 30,
      "debuff": -2,
      "posicoesBuffs": [6, 17]
    }

    const pista = selecionarPista(1, pistas)

    expect(pista).toEqual(pistaEsperada)
  })

  it('Deve conseguir obter o corredor corretamente', () => {
    const corredorEsperado = {
      "id": 1,
      "nome": "Dick Vigarista",
      "velocidade": 5,
      "drift": 2, 
      "aceleracao": 4,
      "vantagem": "CIRCUITO"
    }

    const corredor = selecionarPersonagens([1], personagens)[0]

    expect(corredor).toEqual(corredorEsperado)
  })

  it('Deve conseguir calcular a vantagem de tipo pista corretamente', () => {
    const pista = selecionarPista(2, pistas)
    const corredor = selecionarPersonagens([1], personagens)[0]
    const corredorEsperado = {
      "id": 1,
      "nome": "Dick Vigarista",
      "velocidade": 7,
      "drift": 4, 
      "aceleracao": 6,
      "vantagem": "CIRCUITO"
    }

    const corredorComVantagem = calcularVantagemPista(corredor, pista)

    expect(corredorComVantagem).toEqual(corredorEsperado)
  })

  it('Deve conseguir calcular o debuff de pista corretamente', () => {
    const pista = selecionarPista(1, pistas)
    const corredor = selecionarPersonagens([1], personagens)[0]
    const corredorEsperado = {
      "id": 1,
      "nome": "Dick Vigarista",
      "velocidade": 3,
      "drift": 0, 
      "aceleracao": 2,
      "vantagem": "CIRCUITO"
    }

    const corredorComDebuffPista = calcularDebuffPista(corredor, pista)

    expect(corredorComDebuffPista).toEqual(corredorEsperado)
  })

  it('Deve conseguir calcular o buff de posição de pista para 3 corredores', () => {
    const pista = selecionarPista(1, pistas)
    const [corredor1, corredor2, corredor3] = selecionarPersonagens([1, 2, 3], personagens)
    const corredoresComBuffEsperados = [
      {
        id: 1,
        nome: 'Dick Vigarista',
        velocidade: 5,
        drift: 2,
        aceleracao: 4,
        vantagem: 'CIRCUITO',
        posicaoAtual: 7,
        posicaoAnterior: 3
      },
      {
        id: 2,
        nome: 'Irmãos Rocha',
        velocidade: 6,
        drift: 3,
        aceleracao: 4,
        vantagem: 'MONTANHA',
        posicaoAtual: 6,
        posicaoAnterior: 3
      },
      {
        id: 3,
        nome: 'Irmãos Pavor',
        velocidade: 4,
        drift: 2,
        aceleracao: 3,
        vantagem: 'DESERTO',
        posicaoAtual: 5,
        posicaoAnterior: 3
      }
    ]

    
    const corredor1ComPosicao = {
      ...corredor1,
      posicaoAtual: 7,
      posicaoAnterior: 3
    }
    const corredor2ComPosicao = {
      ...corredor2,
      posicaoAtual: 6,
      posicaoAnterior: 3
    }
    const corredor3ComPosicao = {
      ...corredor3,
      posicaoAtual: 5,
      posicaoAnterior: 3
    }

    const corredores = [corredor1ComPosicao, corredor2ComPosicao, corredor3ComPosicao]

    const corredoresComBuff = calcularBuffPosicaoPista(corredores, pista)
    
    expect(corredoresComBuff).toEqual(corredoresComBuffEsperados)
  }) 

  it('Deve conseguir calcular a próxima posição corretamente se estiver sob o buff de um aliado', () => {
    const personagensPosicoes = personagens.map(personagem => ({
      ...personagem,
      posicaoAtual: 0
    }))
    const [corredor, corredorAliado] = selecionarPersonagens([1, 2], personagensPosicoes)
    const corredorComAliado = escolherAliadoEInimigo(corredor, corredorAliado.id, null, personagens)
    const posicaoInicial = 0
    const proximaPosicaoEsperada = 6

    const corredorComAliadoEBuff = calcularBuffAliado(corredorComAliado, personagensPosicoes)
    const posicaoAtual = posicaoInicial + corredorComAliadoEBuff.velocidade

    expect(posicaoAtual).toEqual(proximaPosicaoEsperada)
  })

  it('Deve conseguir calcular a próxima posição corretamente se estiver sob o debuff de um inimigo', () => {
    const personagensPosicoes = personagens.map(personagem => ({
      ...personagem,
      posicaoAtual: 0
    }))
    const [corredor, corredorInimigo] = selecionarPersonagens([1, 2], personagensPosicoes)
    const corredorComInimigo = escolherAliadoEInimigo(corredor, null, corredorInimigo.id, personagens)
    const posicaoInicial = 0
    const proximaPosicaoEsperada = 4

    const corredorComInimigoEDebuff = calcularDebuffInimigo(corredorComInimigo, personagensPosicoes)
    const posicaoAtual = posicaoInicial + corredorComInimigoEDebuff.velocidade

    expect(posicaoAtual).toEqual(proximaPosicaoEsperada)
  })

  it('Deve conseguir completar uma corrida com um vencedor', () => {
    const pista = selecionarPista(1, pistas)
    const corredores = selecionarPersonagens([1, 2], personagens)
    const corredorEsperado = {
      id: 2,
      nome: 'Irmãos Rocha',
      velocidade: 3,
      drift: 0,
      aceleracao: 1,
      vantagem: 'MONTANHA',
      posicaoAtual: 32,
      posicaoAnterior: 29
    }

    const vencedor = realizarCorrida(pista, corredores)
    
    expect(vencedor).toEqual(corredorEsperado)
  }) 



  it('Deve conseguir criar corredor corretamente somente com aliado', () => {
    const corredorEsperado = {
      "id": 1,
      "nome": "Dick Vigarista",
      "velocidade": 5,
      "drift": 2, 
      "aceleracao": 4,
      "vantagem": "CIRCUITO",
      "aliado": "Irmãos Rocha"
    }

    const corredor = selecionarPersonagens([1], personagens)[0]
    const corredorComAliado = escolherAliadoEInimigo(corredor, 2, null, personagens)

    expect(corredorComAliado).toEqual(corredorEsperado)
  })

  it('Deve conseguir criar corredor corretamente somente com inimigo', () => {
    const corredorEsperado = {
      "id": 1,
      "nome": "Dick Vigarista",
      "velocidade": 5,
      "drift": 2, 
      "aceleracao": 4,
      "vantagem": "CIRCUITO",
      "inimigo": "Irmãos Rocha"
    }

    const corredor = selecionarPersonagens([1], personagens)[0]
    const corredorComInimigo = escolherAliadoEInimigo(corredor, null, 2, personagens)

    expect(corredorComInimigo).toEqual(corredorEsperado)
  })

  it('Deve conseguir criar corredor corretamente com aliado e inimigo', () => {
    const corredorEsperado = {
      "id": 1,
      "nome": "Dick Vigarista",
      "velocidade": 5,
      "drift": 2, 
      "aceleracao": 4,
      "vantagem": "CIRCUITO",
      "aliado": "Irmãos Pavor",
      "inimigo": "Irmãos Rocha"
    }

    const corredor = selecionarPersonagens([1], personagens)[0]
    const corredorComAliadoEInimigo = escolherAliadoEInimigo(corredor, 3, 2, personagens)

    expect(corredorComAliadoEInimigo).toEqual(corredorEsperado)
  })

  it('Deve conseguir calcular as novas posições corretamente de uma rodada para a próxima', () => {
    const corredores = selecionarPersonagens([1], personagens).map(corredor => ({
      ...corredor,
      posicaoAtual: 0
    }))

    const corredoresEsperados = [{
        id: 1,
        nome: 'Dick Vigarista',
        velocidade: 5,
        drift: 2,
        aceleracao: 4,
        vantagem: 'CIRCUITO',
        posicaoAtual: 4,
        posicaoAnterior: 0
    }]

    const corredoresComPosicoesIncrementadas = calcularNovaPosicao(corredores, 1)

    expect(corredoresComPosicoesIncrementadas).toEqual(corredoresEsperados)
  })

  it('Deve impedir que corredor se mova negativamente mesmo se o calculo de velocidade seja negativo', () => {
    const corredores = selecionarPersonagens([1], personagens).map(corredor => ({
      ...corredor,
      velocidade: -10,
      aceleracao: -10,
      drift: -10,
      posicaoAtual: 0
    }))

    const corredoresEsperados = [{
        id: 1,
        nome: 'Dick Vigarista',
        velocidade: -10,
        aceleracao: -10,
        drift: -10,
        vantagem: 'CIRCUITO',
        posicaoAtual: 0,
        posicaoAnterior: 0
    }]
    const corredoresComPosicoesIncrementadas = calcularNovaPosicao(corredores, 1)
  
    expect(corredoresComPosicoesIncrementadas).toEqual(corredoresEsperados)
  })

   it('Deve impedir que o Dick Vigarista vença a corrida se estiver a uma rodada de ganhar', () => {
    const pista = selecionarPista(1, pistas)
    const corredores = selecionarPersonagens([1, 2, 3], personagens)
    const corredorEsperado = {
      id: 2,
      nome: 'Irmãos Rocha',
      velocidade: 3,
      drift: 0,
      aceleracao: 1,
      vantagem: 'MONTANHA',
      posicaoAtual: 32,
      posicaoAnterior: 29
    }

    const vencedor = realizarCorrida(pista, corredores)
    
    expect(vencedor).toEqual(corredorEsperado)
  })   
})
