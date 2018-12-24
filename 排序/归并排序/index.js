const randomArray = require('../random');

const merge_sort = arr => {
  const len = arr.length;
  if (len === 1 || len === 0) return arr;
  // 分解数组
  const mid = arr.length / 2;
  let left = arr.slice(0, mid);
  let right = arr.slice(mid, arr.length);
  left = merge_sort(left);
  right = merge_sort(right);
  const merged = merge(left, right);
  return merged;
}

function merge(left = [], right = []) {
  let tempArray = [];
  let mi = 0, ai = 0, bi = 0;

  while (ai < left.length && bi < right.length) {
    if (left[ai] <= right[bi]) {
      tempArray[mi] = left[ai];
      ai++;
    } else {
      tempArray[mi] = right[bi];
      bi++;
    }
    mi++;
  }
  // 将某个数组内剩余的数字合并后的数组中
  if (ai < left.length) {
    for (let i = ai; i < left.length; i++) {
      tempArray[mi] = left[i];
      mi++;
    }
  } else {
    for (let i = bi; i < right.length; i++) {
      tempArray[mi] = right[i];
      mi++;
    }
  }
  return tempArray;
}

console.log(
  merge_sort(randomArray(5))
)