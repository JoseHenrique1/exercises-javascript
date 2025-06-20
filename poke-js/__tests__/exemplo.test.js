import { pokemons } from "../src/pokemons"
import { criarTreinador, capturarPokemon } from "../src"

describe('Aventura pokemon', () => {
  it('Deve subir o nível do pokemon corretamente', () => {
    const treinador = criarTreinador('David', 18, 9, pokemons)
    const nivelPokemonEsperado = 10

    const novoTreinado = capturarPokemon(treinador, 2, pokemons)
    
    expect(novoTreinado.pokemons[0].levelInicial).toBe(nivelPokemonEsperado)
  })

  it('Deve evoluir pokemon ao atingir o nível necessário', () => {
    const treinador = criarTreinador('David', 18, 1, pokemons)
    const nomePokemonEsperado = "Wartortle"

    const novoTreinador1 = capturarPokemon(treinador, 2, pokemons)
    const novoTreinador2 = capturarPokemon(novoTreinador1, 2, pokemons)
    const novoTreinador3 = capturarPokemon(novoTreinador2, 2, pokemons)
    const novoTreinador4 = capturarPokemon(novoTreinador3, 2, pokemons)
    const novoTreinador5 = capturarPokemon(novoTreinador4, 2, pokemons)
    
    expect(novoTreinador5.pokemons[0].nome).toBe(nomePokemonEsperado)
  })


  it('Não deve evoluir pokemon caso não possua o level necessário', () => {
    const treinador = criarTreinador('David', 18, 1, pokemons)
    const idPokemonEsperado = 1

    const novoTreinador1 = capturarPokemon(treinador, 2, pokemons)
    
    expect(novoTreinador1.pokemons[0].id).toBe(idPokemonEsperado)
  })

  it('Treinador será criado com nome correto', () => {
    const nomeEsperado = 'David'
    
    const treinador = criarTreinador('David', 18, 1, pokemons)
    
    expect(treinador.nome).toBe(nomeEsperado)
  })

  it('Treinador será criado com a idade correta', () => {
    const idadeEsperada = 18
    
    const treinador = criarTreinador('David', 18, 1, pokemons)
    
    expect(treinador.idade).toBe(idadeEsperada)
  })

  it('Treinador será criado com o pokemon inicial correto', () => {
    const pokemonEsperado = pokemons.find(pokemon=>pokemon.id === 1)

    const treinador = criarTreinador('David', 18, 1, pokemons)
    
    expect(treinador.pokemons[0]).toEqual(pokemonEsperado)
  })

  it('Treinador terá seus pokemons atualizados após nova captura', () => {
    const treinador = criarTreinador('David', 18, 1, pokemons)

    const novoTreinador1 = capturarPokemon(treinador, 2, pokemons)

    console.log(JSON.stringify(novoTreinador1.pokemons, null, 2));
    console.log(JSON.stringify(treinador.pokemons, null, 2));
    
    
    
    expect(novoTreinador1.pokemons).not.toEqual(treinador.pokemons)
  })


})