/**
 * Symbol.toStringTag
 */

const arr = [0]
console.log(Object.prototype.toString.call(arr)) // '[object Array]'

arr[Symbol.toStringTag] = 'MyArray'

console.log(
  Object.prototype.toString.call(arr), // [object MyArray]
  arr.toString(), // 0
)

function MyArray(...args) {
  // assign length
  this.length = arguments.length
  // assign value
  for (let i = 0, len = args.length; i < len; i++) {
    this[i] = args[i]
  }
}

const myArr1 = new MyArray(1, 2, 3)

console.log(
  Object.prototype.toString.call(myArr1), // '[object Object]'
  myArr1.toString(), // '[object Object]'
)

// modify toStringTag
MyArray.prototype[Symbol.toStringTag] = 'MyArray'

const myArr2 = new MyArray(1, 2, 3)

console.log(
  Object.prototype.toString.call(myArr2), // '[object MyArray]'
  myArr2.toString(), // '[object MyArray]'
)

// override toString
MyArray.prototype.toString = function () {
  return Object.keys(this).filter(key => key !== 'length').map(key => this[key]).join(',')
}

console.log(
  Object.prototype.toString.call(myArr2), // '[object MyArray]'
  myArr2.toString(), // '1,2,3'
)