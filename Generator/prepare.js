/**
 * 迭代器Generator
 */


function createGenerator(items) {
  let i = 0
  return {
    next: function () {
      const done = i >= items.length
      const value = !done ? items[i++] : undefined
      return { done, value }
    }
  }
}

const items = [1, 2, 3]
const iterator = createGenerator(items)

console.log(iterator.next()) // { done: false, value: 1 }
console.log(iterator.next()) // { done: false, value: 2 }
console.log(iterator.next()) // { done: false, value: 3 }
console.log(iterator.next()) // { done: true, value: undefined }

const persons = [
  { name: 'Jack', age: 30 },
  { name: 'Michael', age: 29 },
  { name: 'Jane', age: 17 },
  { name: 'Jhon', age: 32 }
]

const personIterator = createGenerator(persons)

// iterate pringting
for (
  let person = personIterator.next();
  !person.done;
  person = personIterator.next()
) {
  const { name, age } = person.value
  console.log(`
    name: ${name},
    age: ${age}
  `)
}


/**
 * native Generator
 */

function* createNativeIt(items) {
  for (let i = 0, len = items.length; i < len; i++) {
    yield items[i]
  }
}

const nativeIt = createNativeIt(['a', 'b', 'c'])

console.log(nativeIt.next())
console.log(nativeIt.next())
console.log(nativeIt.next())
console.log(nativeIt.next())
// { value: 'a', done: false }
// { value: 'b', done: false }
// { value: 'c', done: false }
// { value: undefined, done: true }



/**
 * 使用for-of遍历
 */
const forInIt = createNativeIt(['10', '20', '30'])
for (let value of forInIt) {
  console.log(`Number: ${value}`)
}

/**
 * 利用Symbol.iterator获取可遍历数据的迭代器
 */
const values = [321, 3114, 1902]
const valIt = values[Symbol.iterator]() // 创建迭代器

for (let val of valIt) {
  console.log('Value: ' + val)
}


/**
 * 利用Symbol.interator判断变量是否可遍历
 */
function isIterable(obj) {
  return typeof obj[Symbol.iterator] === 'function'
}


console.log(isIterable('')) // true
console.log(isIterable([])) // true
console.log(isIterable(new Set())) // true
console.log(isIterable(new Map())) // true
console.log(isIterable(new WeakSet())) // false
console.log(isIterable(new WeakMap())) // false
console.log(isIterable({ name: 'a' })) // false

// 对象默认是不实现迭代器接口，可以自行添加Symbol.iterator属性
function IterableObject() {}
IterableObject.prototype[Symbol.iterator] = function *() {
  const keys = Object.keys(this)
  for (let key of keys) {
    yield this[key]
  }
}

const itObj = new IterableObject()
itObj.name = 'I am an iterable Object'
itObj.id = 123

const objIterator = itObj[Symbol.iterator]()

console.log(objIterator.next()) // { value: 'I am an iterable Object', done: false }
console.log(objIterator.next()) // { value: 123, done: false }
console.log(objIterator.next()) // { value: undefined, done: true }
