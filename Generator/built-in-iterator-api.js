/**
 * Array, Set, Map内建的迭代器API
 * 
 * 1. entries()
 * 2. values()
 * 3. keys()
 */


/**
 * entries()
 */

const arr1 = [1, 2, 3, 4]
const set1 = new Set(['a', 'b', 'c'])
const map1 = new Map([['name', 'A'], ['id', 10]])

const printArrSet = it => {
  const [index, value] = it
  const resStr = `Index: ${index}, Value: ${value}`
  const sepLine = '-'.repeat(resStr.length + 1) + '\n'
  console.log(sepLine, resStr)
}

const printMap = it => {
  const [key, value] = it
  const resStr = `Key: ${key}, Value: ${value}`
  const line = '-'.repeat(resStr.length + 1) + '\n'
  console.log(line, resStr)
}

for (let it of arr1.entries()) {
  printArrSet(it)
}

for (let it of set1.entries()) {
  printArrSet(it)
}

for (let it of map1.entries()) {
  printMap(it)
}

const arr2 = ['Apple', 'Orange']
const arr2It = arr2.entries() // 与 arr2[Symbol.interator]()效果一致

console.log(arr2It.next()) // { value: [ 0, 'Apple' ], done: false }
console.log(arr2It.next()) // { value: [ 1, 'Orange' ], done: false }
console.log(arr2It.next()) // { value: undefined, done: true }



/**
 * values()
 */
const arr2ValsIt = arr2.values()
console.log(arr2ValsIt.next()) // { value: 'Apple', done: false }
console.log(arr2ValsIt.next()) // { value: 'Orange', done: false }
console.log(arr2ValsIt.next()) // { value: undefined, done: true }


// Set values()
const set1ValsIt = set1.values()
console.log(set1ValsIt.next()) // { value: 'a', done: false }
console.log(set1ValsIt.next()) // { value: 'b', done: false }
console.log(set1ValsIt.next()) // { value: 'c', done: false }
console.log(set1ValsIt.next()) // { value: undefined, done: true }



/**
 * keys()
 */
const arrKeys = arr1.keys()
for (let index of arrKeys) {
  console.log(index) // 0, 1, 2, 3
}

for (let key of set1.keys()) {
  console.log(key) // a, b, c
}

for (let key of map1.keys()) {
  console.log(key) // name, id
}

/**
 * default iterator when using for-of
 */

// Array -> values()
for (let value of ['A', 'B', 'C']) {
  console.log(value) // 'A', 'B', 'C'
}

// Set -> values()
for (let value of new Set(['a', 'b'])) {
  console.log(value) // 'a', 'b',
}

// map -> entries()
for (let [key, value] of new Map([['k1', 'v1'], ['k2', 'v2']])) {
  console.log(key, value)
  // 'k1', 'v1'
  // 'k2', 'v2'
}