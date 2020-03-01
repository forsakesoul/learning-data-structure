function factorial(n, total = 1) {
  if (n === 1) {
    return total
  }
  return factorial(n - 1, total * n)
}


// 尾递归： 个人理解，在函数栈最后去执行一次函数的调用
console.log(factorial(5))