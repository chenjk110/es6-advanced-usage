/**
 * Symbol.match
 */

// 原始使用
console.log('abc'.match(/a/)) // [ 'a', index: 0, input: 'abc' 


/**
 * String.prototype.match()函数可传入
 * 1. { [Symbol.match]: (value: string): RegExpMatchArray }
 * 2. RegExp | string
 */


// 构造自定义match规则对象
const isLenLeast10 = {
  [Symbol.match]: function (value) {
    return value.length >= 10 ? [value.substr(0, 10)] : null
  }
}

const testStr1 = 'a'.repeat(10)
const testStr2 = 'b'.repeat(9)

console.log(
  testStr1.match(isLenLeast10), // ['aaaaaaaaaa']
  testStr2.match(isLenLeast10), // null
)

// 规则：匹配查找'a'字符，匹配出包含'a'字符后面最多三位字符串
const testStr3 = 'apple orange'
const find3LetterOfA = {
  [Symbol.match]: function (value) {
    const res = []
    let idx = 0
    if (!value.length) return ''
    while(idx < value.length) {
      if (value[idx] === 'a') {
        res.push(value.substr(idx, 3))
      }
      idx++
    }
    return res.length ? res : null
  }
}

console.log(testStr3.match(find3LetterOfA)) // ['app', 'ang']


/**
 * Symbol.replace
 */

const testStr4 = 'abc'
// 查找'b'，并替换，且替换的字符串重复3次
const existLetterBandRplace3Times = {
  [Symbol.replace]: function (value, replacement) {
    let idx = 0
    while(idx < value.length) {
      if (value[idx] === 'b') {
        value = value.slice(0, idx) + replacement.repeat(3) + value.slice(idx + 1)
      }
      idx++
    }
    return value
  }
}

console.log(testStr4.replace(existLetterBandRplace3Times, 'f')) // 'afffc'
