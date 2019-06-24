const randomArray = require('../../random');

const insetSort = (arr) => {
  if (arr.length <= 1) return
  for (let i = 1; i < arr.length; ++i) {
    const value = arr[i]
    let j = i - 1
    for (; j >= 0; j--) {
      if (arr[j] > value) {
        arr[j+1] = arr[j] // 数据移动
      } else {
        break
      }
    }
    arr[j+1] = value
  }
  return arr
}

console.log(
  insetSort(
    randomArray(10)
  )
)
