const randomArray = require('../random')

const bubbleSort = arr => {
  if (arr.length === 0) return arr
  console.log('初始化数组: ', arr)
  let flag = false // 标记退出
  let times = 0 // 排序的次数
  for (let i = 0; i < arr.length; i++) {
    flag = false
    times++
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        let t = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = t
        flag = true
      }
    }
    if (!flag) break
  }
  console.log('移动的次数', times)
  return arr
};

console.log(
  '排序后: ', bubbleSort([3, 5, 4, 1, 2, 6])
)
console.log(
  '排序后: ', bubbleSort(randomArray(10))
)