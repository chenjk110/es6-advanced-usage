// Paradigm
// const source = {}
// const proxySrc = new Proxy(source, {
  // [trapeName]: function (target, key, value, receiver) {
    // target -> source
    // key,
    // value
    // receiver -> proxySrc
    // Reflect -> target's original operations
  // }
// })

const o = {
  name: 'O',
  say: function () {
    console.log('Hello, I am ' + this.name)
  }
}

const proxyO = new Proxy(o, {
  get: function(target, name) {
    console.log(`get propName: ${name}`)
    return Reflect.get(target, name)
  }
})

console.log(proxyO.name)
proxyO.say()

// throw an error when props not exits in object

const store = {}
const proxyStore = new Proxy(store, {
  get: function(target, name, receiver) {
    if (!(name in receiver)) {
      throw new ReferenceError(`${name} is not exist in Object`)
    }
    return Reflect.get(target, name, receiver)
  }
})

// proxyStore.name //Error

proxyStore.name = 'Proxy Store'
console.log(proxyStore.name)


// getting value only once
const once = {}
const proxyOnce = new Proxy(once, {
  get: function getOnce(target, name, receiver) {
    if (getOnce[name]) {
      return undefined
    } else {
      getOnce[name] = true
      return Reflect.get(target, name, receiver)
    }
  }
})


proxyOnce['name'] = 'ok'
console.log(proxyOnce) // { name: 'ok' }
console.log(proxyOnce.name) // undefined

// return all values as string
const strValues = new Proxy({}, {
  get: function(target, key, receiver) {
    return String(
      Reflect.get(target, key, receiver)
    ).toString()
  }
})

strValues.num = 100
strValues.hasValue = true
strValues.hello = function () {
  console.log('hello')
}

console.log(strValues.num) // '100'
console.log(strValues.hasValue) // 'true'
console.log(strValues.hello) // "function () {console.log('hello')}"