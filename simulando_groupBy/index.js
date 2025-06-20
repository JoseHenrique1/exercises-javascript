
const array = [
  { "id":1, "valor":"A", "age":11 },
  { "id":2, "valor":"B", "age":12 },
  { "id":3, "valor":"C", "age":13 }
]

console.log(array);


function groupBy(array, key) {
  const object = array.reduce((acc, item) => {
    const valueKeyForItem = item[key]; //ex: 1
    const otherKeys = Object.keys(item).filter(currentKey=>currentKey!=key); // ex: valor, age, name...
    
    const objectCustom = otherKeys.reduce((ac,cur_item)=>{
      return {
        ...ac,
        [cur_item] : item[cur_item]
      }
    },{})
    
    return {
      ...acc,
      [valueKeyForItem]: {
        ...objectCustom
      }
    }

  }, {})

  return object;
}

console.log(JSON.stringify(groupBy(array, "valor"), null, 2));



/* 
se a chave for id:

{ 1:{valor:A}, 2:{valor:B}, 3:{valor:C}, }

deixar dinamico para qualquer chave e deve retorna null se a chave nao existir

a funcao inicial recebe (array, chave) */