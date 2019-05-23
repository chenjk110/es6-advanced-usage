function combine(...nums) {
  return nums.reduce((a, b) => a + b)
}

const sumNumber = new Proxy(combine, {
  apply: function (targetFn, thisArg, argsList) {
    argsList = argsList.map(arg => {
      arg = Number.parseFloat(arg)
      if (Object.is(NaN, arg)) throw TypeError(`'${arg}' can not be converted to 'number'`)
      return arg
    })
    return Reflect.apply(targetFn, thisArg, argsList)
  }
})

const combineStr = new Proxy(combine, {
  apply: function (targetFn, thisArg, argsList) {
    argsList = argsList.map(arg => arg + '')
    return Reflect.apply(targetFn, thisArg, argsList)
  }
})

// test sumNumber()
console.log(
  sumNumber(1, 2), // 3
  sumNumber('1', '2', '3') // 6
)

// test combineStr
console.log(
  combineStr(1, 2), // '12'
  combineStr('have', ' ', 10, ' apples'), // 'have 10 apples'
)