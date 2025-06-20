// inicie por aqui
export const criarTreinador = (nome, idade, pokemonId, pokemons) => {
  return {
    nome,
    idade,
    pokemons: [pokemons.find(pokemon=>pokemon.id === pokemonId)]
  }
}

export const capturarPokemon = (treinador, pokemonId, pokemons) => {
  const pokemonsComLeveisAtualizados = subirLevelDosPokemons(treinador.pokemons)

  const pokemonsEvoluidos = evoluirPokemon(pokemonsComLeveisAtualizados, pokemons)

  const pokemonCapturado = pokemons.find(pokemon=>pokemon.id === pokemonId)
  if (pokemonCapturado === undefined) {
    console.log("Pokemon nao encontrado");
    
  }

  const novoTreinador = {
    ...treinador,
    pokemons: [...pokemonsEvoluidos, pokemonCapturado]
  }

  return novoTreinador
}

const subirLevelDosPokemons = (pokemonsTreinador) => {
  const novosPokemons = pokemonsTreinador.map(pokemon => {
    if (pokemon.evolucao !== undefined && pokemon.evolucao !== null) {
      return {
        ...pokemon,
        levelInicial: pokemon.levelInicial + 1
      }
    }
    return pokemon
  })

  return novosPokemons
}


const evoluirPokemon = (pokemonsTreinador, pokemonsOriginais) => {
  const novosPokemons = pokemonsTreinador.map(pokemon => {
    if (pokemon.evolucao && pokemon.evolucao.level === pokemon.levelInicial) {
      const pokemonEvoluido = pokemonsOriginais.find(pokemonFind => pokemonFind.id === pokemon.evolucao.id)
      return pokemonEvoluido
    }
    return pokemon
  })

  return novosPokemons
}