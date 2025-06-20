export function filtarPorAnoERetornarNome(series, ano) {
  const seriesFiltradas = series.filter(serie=>serie.anoEstreia == ano)
  const nomes = seriesFiltradas.map(serie=>serie.titulo)
  return nomes
}

export function verificarSeAtorEstaEmSeriado(series, nomeAtor) {
  const atorEstaEmSeriado = series.some(serie=> serie.elenco.includes(nomeAtor))
  return atorEstaEmSeriado
}

export function calcularMediaTotalDeEpisodios(series) {
  const totalEpisodios = series.reduce((total, serie)=> total + serie.numeroEpisodios, 0) 
  const mediaEpisodios = totalEpisodios/series.length
  return mediaEpisodios
}

export function agruparTituloDasSeriesPorPropriedade(series, propriedade) {
  const seriesAgrupadasPropriedade = series.reduce((seriesAgrupadas, serie) => {
    const chave = serie[propriedade];
    if (!seriesAgrupadas[chave]) {
      seriesAgrupadas[chave] = [];
    }
    seriesAgrupadas[chave].push(serie.titulo); 
    return seriesAgrupadas;
  }, {});
  return seriesAgrupadasPropriedade
}
