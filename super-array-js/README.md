# super-array-js

Vamos criar um tipo de estrutura de dados que irá ter alguns métodos para facilitar a manipulação de arrays.

# Primeiros passos

Clone este repositório e em seguida instale as dependências (`npm install`). 
Se deu tudo certo, ao rodar o comando `npm test`, você deverá ter um teste passando. 

# Descrição

O objetivo desse exercício é desenvolver uma estrutura de dados que possua algumas das funcionalidades de array que temos em javascript. Todos os metódos tem a descrição do que cada um deve fazer e um exemplo. Você ira implementar os seguintes métodos no arquivo `src/super-array.js`

Sugestão de ordem para implementação:
 1. push
 2. forEach
 3. map
 4. filter
 5. find
 6. reduce

Use o array de instrutores (localizado dentro `__tests__/instrutores.json`) para realizar seus testes. 

## push

*Adicionar um item novo ao final do SuperArray.*

Parâmetros:
  - **item** - Item a ser adicionado no array.

Retorno: `void`

```js
// Utilização
const meuArrayComHeMan = SuperArray([1, 2, 3])
meuArrayComHeMan.push("He Man")

// meuArrayComHeMan.itens será [1, 2, 3, 'He Man']
```


## forEach

*Percorre todos os items do array. *

Parâmetros:
  - **callback** - Função que vai ser executada a cada iteração, recebendo um parâmetro:.
    - **item** - O item que está sendo processado no array.

Retorno: `void`

```js
// Utilização
meuArray.forEach(item => {
  console.log(item)
})
```


## filter

*Retorna um novo SuperArray com os elementos que passaram no teste implementado pela função fornecida.*

Parâmetros:
  - **callback** - Função para testar cada item do array, **deve retornar um Boolean**, recebendo um parâmetro:
    - **item** - Item que está sendo testado no array.

Retorno: `SuperArray com itens filtrados`

```js
// Utilização
const meuArray = SuperArray([1, 2, 3])

const meuArrayImpares = meuArray.filter(item => {
  return item % 2 !== 0
})

// meuArrayImpares.itens será [1, 3]
```

## map

*Retorna um novo SuperArray com os elementos remapeados.*

Parâmetros:
  - **callback** - Função para mapear o novo item do array, **deve retornar o novo item**, recebendo um parâmetro:
    - **item** - Item que está sendo processado no array.

Retorno: `SuperArray com itens mapeados`

```js
// Utilização
const meuArray = SuperArray([1, 2, 3])

const meuArrayDobrado = meuArray.map(item => {
  return item * 2
})

// meuArrayDobrado.itens será [2, 4, 6]
```

## find

*Retorna o primeiro valor do SuperArray que satisfaça o callback fornecido. Nao encontrando, deve retornar undefined*

Parâmetros:
  - **callback** - Função para testar cada item do array, **deve retornar um Boolean**, recebendo um parâmetro:
    - **item** - Item que está sendo processado no array.

Retorno: `Item encontrado ou undefined`

```js
// Utilização
const meuArray = SuperArray([1, 2, 3])

const primeiroNumeroMarioQue1 = meuArray.find(item => {
  return item > 1
})

// primeiroNumeroMarioQue1 será 2
```

## reduce

*Reduz todo o array em um único valor.*

Parâmetros:
  - **callback** - Função que é executada em cada valor do array, **deve retornar o parâmetro acumulador**, recebendo dois parâmetros:
    - **acumulador** - O valor retornado na última invocação do callback, ou o argumento valorInicial, se fornecido.
    - **item** - O item que está sendo processado no array.
  - **valorInicial** - Objeto a ser usado como o primeiro argumento da primeira chamada da função callback.

Retorno: `Um único valor de qualquer tipo (string, number, boolean, objeto, etc)`

```js
// Utilização
const meuArray = SuperArray([1, 2, 3])

const somaMeuArray = meuArray.reduce((acumulador, item) => {
  return acumulador += item
}, 0)

// somaMeuArray será 6
```

# IMPORTANTE!
**NÃO PODE UTILIZAR OS MÉTODOS DO ARRAY NATIVO, TODOS OS MÉTODOS DEVEM SER IMPLEMENTADOS DO ZERO!** 
**TODOS OS METÓDOS DEVEM SER TESTADOS!** 
**VOCÊS PODEM USAR UM METÓDO IMPLEMENTADO POR VOCÊS EM UM PRÓXIMO (ex: fiz o filter, posso usar o meu filter no find? pode.)** 

Dica: implemente uma função por vez. Se quiser explorar a ideia de TDD (Test Driven Development - pesquisem!), faça primeiro os testes e desenvolva a função após. Sempre testando para garantir que uma funcionalidade não quebra a anterior. 
No momento, que tu tiver o teste implementado, a cada funcionalidade desenvolvida corretamente testes iram passar, e isso lhe dara uma sensação de progresso e certeza no que está desenvolvendo. O legal disso é que, ao desenvolver o teste antes, tu irá largar a mão de escrever testes viciados no código que tu desenvolveu, tu vai pensar na regra antes do código. 

Bom exercício! 
