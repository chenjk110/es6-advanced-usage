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


/**
 * 
 * Symbol.search
 */

const testStr5 = 'abc'

// 定义一个查询生成器，查询对应字符串，
// 匹配到返回 { exist: true, matched: Array<{ index: number, before: string, after: string }> }
// 未匹配到返回 { exist: false, matched: [] }

function createSearchRule(targetStr) {
  return {
    [Symbol.search]: function (value) {
      const matched = []
      let idx = 0

      while(idx < value.length) {
        if (value[idx] === targetStr) {
          const match = {
            index: idx,
            before: value.slice(0, idx),
            after: value.slice(idx + 1)
          }
          matched.push(match)
        }
        idx++
      }
      return { exist: !!matched.length, matched }
    }
  }
}

// 创建查找'f'字符规则
const findFRule = createSearchRule('f')
const testStr6 = 'abcdefghijk'

console.log(
  testStr6.search(findFRule) // { exist: true, matched: [ { index: 5, before: 'abcde', after: 'ghijk' } ] }
)


/**
 * Symbol.split
 * 
 */

// 创建分割，并结构化分隔结果 { original: string, marks: Array<number>, splited: Array<string> }
function createSplitRule(targetStr) {
  return {
    [Symbol.split]: function (value) {
      const splited = []
      const marks = []
      let idx = 0
      let tmp = ''
      while(idx < value.length) {
        if (value[idx] === targetStr) {
          splited.push(tmp)
          marks.push(idx)
          tmp = ''
        } else {
          tmp += value[idx]
        }
        idx++
      }
      tmp.length && splited.push(tmp)

      return { original: value, marks, splited }
    }
  }
}

const splitRule = createSplitRule(' ')
const testStr7 = 'apple orange banana'

console.log(testStr7.split(splitRule))
// { original: 'apple orange banana', marks: [ 5, 12 ], splited: [ 'apple', 'orange', 'banana' ] }