// only `number` value type avalid 
const onlyNumber = new Proxy({}, {
  set: function (target, key, value, receiver) {
    if (typeof value !== 'number') {
      throw TypeError('only set value of `number` type')
    }
    Reflect.set(target, key, value, receiver)
  }
})

onlyNumber.num1 = 124 // no problem
console.log(onlyNumber.num1)
// onlyNumber.num2 = 'abc' // TypeError


// only set once
const onlySetOnce = new Proxy({}, {
  set: function setOnce(target, key, value, receiver) {
    if (setOnce[key]) {
      throw Error(`'${key}' was existed. not permitted to setting again.`)
    }
    Reflect.set(target, key, value, receiver)
  }
})
