/**
 * advanced usage of generator and iterator
 */


// input argument to next()
function *sum() {
  const n1 = yield 1
  const n2 = yield n1 + 3
  yield n2 + 5
}

const sumIt = sum()

console.log(sumIt.next()) // { value: 1, done: false }
console.log(sumIt.next(1)) // input pre-result: 1 -> next(1) -> { value: 4, done: false }
console.log(sumIt.next(4)) // input pre-result: 4 -> next(4) -> { value: 9, done: fasle }
console.log(sumIt.next(9)) // input pre-result: 9 -> next(9) -> { value: undefined, done: true}
// will ignore input when iterator is done


// throw Error
function *testInputErr() {
  const input = yield 1
  yield input + 1
  yield 'last value'
}

const inpErrIt = testInputErr()
console.log(inpErrIt.next()) // { value: 1, done: false }
console.log(inpErrIt.next(1)) // { value: 1, done: false }
// console.log(inpErrIt.throw(new Error('ERROR!'))) // 

// combination of iterator in generator function


function *stepOneIt() {
  yield 100
  yield 200
}

function *stepTwoIt() {
  yield 'A'
  yield 'B'
}

function *combineIts() {
  yield *stepOneIt()
  yield *stepTwoIt()
  yield 'Finished'
}

const combIt = combineIts()

console.log(combIt.next()) // { value: 100, done, false }
console.log(combIt.next()) // { value: 200, done, false }
console.log(combIt.next()) // { value: 'A', done, false }
console.log(combIt.next()) // { value: 'B', done, false }
console.log(combIt.next()) // { value: 'Finished', done, false }
console.log(combIt.next()) // { value: undefined, done, true }