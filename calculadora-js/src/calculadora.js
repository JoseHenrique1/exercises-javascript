export const OPERACAO_INVALIDA = 'OPERACAO_INVALIDA'

export const calculadora = (operacao, valores) => {
  // código aqui
  const [numero1, numero2] = valores;
  if (operacao === 'soma') {
    return numero1 + numero2;
  } else if (operacao === 'subtracao') {
    return numero1 - numero2;
  } else if (operacao === 'multiplicacao') {
    return numero1 * numero2;
  } else if (operacao === 'divisao') {
    return numero1 / numero2;
  } else {
    return OPERACAO_INVALIDA
  }
}
