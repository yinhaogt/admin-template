export function addSToStock(stockCode) {
  stockCode = stockCode.toString()
  if (stockCode.split('')[0] === '6') {
    return `sh${stockCode}`
  } else {
    return `sz${stockCode}`
  }
}