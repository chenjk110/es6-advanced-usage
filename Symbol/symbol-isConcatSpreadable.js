/**
 * 自定义isConcatSpreadable属性
 */

const arr1 = [1, 2]
const res1 = arr1.concat(3, [4, 5]) 
console.log(res1) // [ 1, 2, 3, 4, 5 ]
// concat会将可以数组拆分成独立的元素进行合并

// 自定义一个数据结构，表示可展开
const collect1 = {
  0: 'Hello',
  1: 'World',
  length: 2,
  [Symbol.isConcatSpreadable]: true
}

const collect2 = {
  0: 'Jack',
  1: 19,
  // length: 2,
  [Symbol.isConcatSpreadable]: true
}

const collect3 = {
  ...collect2,
  length: Object.keys(collect2).length, // 需要指定length与Symbol.isConcatSpreadable才有效
}

const collect4 = {
  ...collect3,
  length: Object.keys(collect3).length, // 长度不一致
}

console.log(
  [].concat(collect1, collect2), // ['Hello', 'World']
  [].concat(collect1, collect3), // [ 'Hello', 'World', 'Jack', 19 ]
  [].concat(collect4) // [ 'Jack', 19, <1 empty items> ]
)

/**
 * cancat不可分解数组
 */

class UnConcatSpreadableArray extends Array {
  get [Symbol.isConcatSpreadable](){
    return false
  }
}

const unConSpArr = new UnConcatSpreadableArray()
const arr2 = [1, 2, 3]
const arr3 = [4, 5, 6]
unConSpArr.push(4, 5, 6)

console.log(
  arr2.concat(arr3), // [ 1, 2, 3, 4, 5, 6 ]
  arr2.concat(unConSpArr), // [ 1, 2, 3, UnConcatSpreadableArray [ 4, 5, 6 ] ]
)