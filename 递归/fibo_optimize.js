const tempMap = new Map();
function fibo(n) {
  if (n === 1 || n === 2) return 1;
  if (tempMap.has(n)) {
    return tempMap.get(n);
  }
  let ret = fibo(n - 1) + fibo(n - 2);
  tempMap.set(n, ret);
  return ret;
}
console.log(
  fibo(50)
);
