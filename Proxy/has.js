// 'has' trape take effect when use 'in' operator
const alwaysUndefined = new Proxy({}, {
  has: function (target, key) {
    return false
  }
})

alwaysUndefined.a = 'Has a'
console.log(alwaysUndefined) // { a: 'Has a' }
console.log('a' in alwaysUndefined) // false



const namesWhiteList = [
  'name',
  'age',
  'addr',
  'phone',
  'email',
  'id'
]

// only checking key existed which in white list
const person = new Proxy({}, {
  has: function (target, key) {
    return namesWhiteList.includes(key) && Reflect.has(target, key)
  }
})

person.hello = 'Hello'
console.log(person, 'hello' in person) // { hello: 'Hello' }, false

person.name = 'Jack'
person.age = 19
person.id = 123

console.log(person) // { hello: 'Hello', name: 'Jack', age: 19, id: 123 }
console.log(
  'name' in person, // true
  'age' in person, // true
  'id' in person, // true
  'phone' in person // false
)