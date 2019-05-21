/**
 * Symbol的创建 
 */
const s1 = Symbol('s1')
const s1_ = Symbol('s1')
console.log(s1) // Symbol(s1)
console.log(s1 === s1_) // false

/**
 * 由于Symbol是基本数据结构，所以typeof操作符也能正确返回信息
 */
console.log(typeof s1) // 'symbol'

/**
 * 由symbol创建另一个symbol
 */
const s2 = Symbol(s1.toString())
console.log(s2) // Symbol(Symbol(s1))


/**
 * Symbol 作为唯一的属性名，并参与属性计算
 */
const obj1 = {}
const obj2 = {}
const name = Symbol('name')
obj1[name] = 'Jack'
obj2[name] = 'Mick'
console.log(obj1) // { [Symbol(name)]: 'Jack' }
console.log(obj2['Jack']) // undefined
console.log(obj2[name]) // 'Mick'


/**
 * 全局注册Symbol并共享
 * 
 */
const devAPI = Symbol.for('dev-api')
const prodAPI = Symbol.for('prod-api')

const config = {
  [devAPI]: 'https://dev.somehost.com',
  [prodAPI]: 'https://somehost.com',
}

// 在其他地方创建
const ENV = 'development'
const isDev = ENV === 'development'
const API = Symbol.for(isDev ? 'dev-api': 'prod-api')

console.log(config[API]) // https://dev.somehost.com


/**
 * 属性检索
 */
const someObj = {
  name: 'SomeObject',
  [Symbol('id')]: Math.random().toString('16').slice(2)
}

console.log(
  Object.keys(someObj), // ['name'],
  Object.getOwnPropertyNames(someObj), // ['name']
  Object.getOwnPropertySymbols(someObj), // [ Symbol(id) ],
  Object.keys(someObj).concat(
    Object.getOwnPropertySymbols(someObj)
  ), // [ 'name', Symbol(id) ]
)
