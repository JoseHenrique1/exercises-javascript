import axios from 'axios'

import {
  verificarSeAtorEstaEmSeriado,
  filtarPorAnoERetornarNome,
  calcularMediaTotalDeEpisodios,
  agruparTituloDasSeriesPorPropriedade,
} from '../src/metodos'

let series

beforeAll(async () => {
  series = (await axios.get("https://gustavobuttenbender.github.io/film-array/data/films.json")).data  
})

describe('Teste de metodos sobre filmes', () => {
  it('Deve filtrar as series com ano de estreia maior ou igual a 2010 e retornar uma listagem com os nomes', () => {
    const nomesSeriesEsperadas = [
      'Stranger Things',
      'Westworld',
      'Game Of Thrones',
      'The Walking Dead',
      '10 Days Why',
      'Band of Brothers',
      'Gus and Will The Masters of the Wizards',
      'The Walking Dead',
      '10 Days Why',
      'Mr. Robot',
      'Narcos',
      'Stranger Things',
      'Westworld'
    ] 
    const nomesSeries = []
    let anosJaVerificados = []
    for (const serie of series) {
      const anoEstreia = serie.anoEstreia
      if (anoEstreia >= 2010 && !anosJaVerificados.includes[anoEstreia]) {
        const nomesSeriesAnoAtual = filtarPorAnoERetornarNome(series, anoEstreia)  
        nomesSeries.push(...nomesSeriesAnoAtual)  
      }   
    }
    
    expect(nomesSeries).toEqual(nomesSeriesEsperadas)
  })
  it('Deve retornar true ao procurar ator que está em elenco', () => {
    const atorEstaEmSeriado = verificarSeAtorEstaEmSeriado(series, "Winona Ryder")
    expect(atorEstaEmSeriado).toBeTruthy()
  })
  it('Deve retornar false ao procurar ator que não participa de elenco', () => {
    const atorEstaEmSeriado = verificarSeAtorEstaEmSeriado(series, "Jon Snow")
    expect(atorEstaEmSeriado).toBeFalsy()
  })
  it('Deve calcular corretamente a media total de episódios de todas as series', () => {
    const mediaEsperada = 35.8
    const mediaEpisodios = calcularMediaTotalDeEpisodios(series)
    expect(mediaEpisodios).toBe(mediaEsperada)
  })
  it('Deve agrupar corretamente em um objeto os titulos das series baseado na Distribuidora', () => {
    const objetoEsperado = {
      "Netflix": [
        "Stranger Things",
        "Narcos"
      ],
      "HBO": [
        "Game Of Thrones",
        "Band of Brothers",
        "Westworld"
      ],
      "AMC": [
        "The Walking Dead",
        "Breaking Bad"
      ],
      "CWI": [
        "Gus and Will The Masters of the Wizards"
      ],
      "JS": [
        "10 Days Why"
      ],
      "USA Network": [
        "Mr. Robot"
      ]
    }
    const titulos = agruparTituloDasSeriesPorPropriedade(series, "distribuidora")
    
    expect(titulos).toEqual(objetoEsperado)
  })
})

