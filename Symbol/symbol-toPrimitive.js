/**
 * Symbol.toPrimitive
 */


// 原始值返回
function Temperature(degree) {
  this.degree = degree
}

Temperature.prototype[Symbol.toPrimitive] = function (hint) {
  switch(hint) {
    case 'string':
      return `${this.degree}度`
    case 'number':
      return this.degree
    case 'default':
      return `${this.degree}摄氏度`
  }
}

const temp = new Temperature(28)

console.log(+temp + 3) // 31
console.log('现在是：' + temp + '!') // '现在是：28摄氏度!'
console.log(String(temp)) // '28度'
console.log(Number(temp)) // 28