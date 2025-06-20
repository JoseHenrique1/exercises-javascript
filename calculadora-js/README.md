### Calculadora em JS

Vamos fazer uma calculadora básica com JavaScript, usando o que vimos até agora em aula.

Deverá ter uma função chamada calcular, que recebe 2 parâmetros: operação e valores

Operação é um valor que vai ser usado para saber qual a operação que a calculadora deve fazer

Valores é um array de números que a calculadora vai processar

Essa função deverá retornar o valor que foi calculado, e caso o usuário passe uma operação inválida, deverá retornar a string "OPERACAO_INVALIDA"

Exemplo de utilização da função:

```js
const tresMaisQuatro = calcular("soma", [3, 4])
console.log(tresMaisQuatro) // 7

const cincoMenosDoisMenosUm = calcular("subtracao", [5, 2, 1])
console.log(cincoMenosDoisMenosUm) // 2

const operacaoInvalida = calcular("ma oe", [1, 2, 3])
console.log(operacaoInvalida) // "OPERAÇÃO INVÁLIDA"
```