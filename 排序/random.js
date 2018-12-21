const randomArray = (n = 10) => {
  return Array.from({length: n}, () => Math.floor((Math.random() * n) + 1))
}

module.exports = randomArray;