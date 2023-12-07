export default ({}, inject) => {
  inject('formatDate', (date) => {
    let [y, m, d] = date.split('-');
    return `${d}/${m}/${y}`
  })
}