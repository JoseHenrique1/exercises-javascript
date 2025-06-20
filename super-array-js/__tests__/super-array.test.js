import instrutores from './instrutores.json'
import { SuperArray } from '../src/super-array'

let SUPERARRAY

beforeEach(() => {
  SUPERARRAY = SuperArray(instrutores)
})

describe('Exemplo de testes', () => {
  it('Valor importado deve ser true', () => {
    expect(true).toBeTruthy()
  })

  it('push deve adicionar um novo instrutor ao meu super array', () => {
    const itensEsperados = [...instrutores, { nome: 'Joaquim', dandoAula: false }]

    SUPERARRAY.push({ nome: 'Joaquim', dandoAula: false })
    expect(SUPERARRAY.itens).toEqual(itensEsperados)
  })

  it('forEach deve passar por todos os instrutores e chamando o callback esperado', () => {
    let contador = 0

    SUPERARRAY.forEach((item) => {
      contador++
    })

    expect(contador).toBe(SUPERARRAY.itens.length)
  })

  it('filter deve retornar um novo array apenas com os instrutores que estão dando aula', () => {
    const arrayEsperado = [
      { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true },
      { "nome": "William Cardozo", "dandoAula": true }
    ]
    
    const novoArray = SUPERARRAY.filter((item)=>item.dandoAula)
    
    expect(novoArray.itens).toEqual(arrayEsperado)
  })

  it('map deve retornar um novo array com o numero de nomes que o instrutor tem', () => {
    const arrayEsperado = [2,2,2,3,2,2,2,3]
    
    const novoArray = SUPERARRAY.map((item)=>item.nome.split(' ').length)
    
    expect(novoArray.itens).toEqual(arrayEsperado)
  })

  it('find deve retornar o primeiro instrutor que está dando aula', () => {
    const instrutorEsperado = { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true }
    
    const instrutorEncontrado = SUPERARRAY.find((item)=>item.dandoAula)
    
    expect(instrutorEncontrado).toEqual(instrutorEsperado)
  })

  it('reduce deve retornar o total de letras no nome dos instrutores', () => {
    const totalEsperado = 126

    const total = SUPERARRAY.reduce((acumulador, item) => {
      return acumulador += item.nome.replaceAll(' ', '').length
    }, 0)

    expect(total).toBe(totalEsperado)
  })

  it('reduce deve retornar um boolean se todos os instrutores estão dando aula', () => {
    const todosIntrutoresDandoAula = SUPERARRAY.reduce((acumulador, item) => {
      return acumulador && item.dandoAula
    }, true)

    expect(todosIntrutoresDandoAula).toBeFalsy()
  })
})
