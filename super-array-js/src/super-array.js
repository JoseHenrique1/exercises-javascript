export const SuperArray = (itens = []) => {

  const array = {
    /**
     * Propriedade para acessar os itens
     */

    itens: [...itens],
  }

  /**
   * Adicionar um novo item ao final dos items
   */

  array.push = item => {
    array.itens[array.itens.length] = item
  }

  /**
   * Itera sobre cada um dos elementos do SuperArray enviando o item e o index
   * como segundo parametro
   */

  array.forEach = callback => {
    for (const item of array.itens) {
      callback(item)      
    }
  }

  /**
   * Retorna um novo SuperArray com os itens mapeados
   */

  array.map = callback => {
    let novoArray = []
    for (const item of array.itens) { 
        novoArray = [...novoArray, callback(item)]
    }
    return SuperArray(novoArray)
  }


  /**
   * Retorna um SuperArray novo com os itens filtrados
   */

  array.filter = callback => {
    let novoArray = []
    for (const item of array.itens) {
      if (callback(item)) {
        novoArray = [...novoArray, item]
      }
      
    }
    return SuperArray(novoArray)
  }


  /**
   * Retorna o primeiro elemento do SuperArray que satisfazer o callback recebido
   * se não encontrar, deve retornar undefined
   */

  array.find = callback => {
    for (const item of array.itens) {
      if (callback(item)) {
        return item
      }
    }
    return undefined
  }

  /**
   * Reduz o SuperArray em um único valor
   */


  array.reduce = (callback, valorInicial) => {
    let total = valorInicial
    for (const item of array.itens) {
      total = callback(total, item)
    }
    return total
  }

  return array
}
