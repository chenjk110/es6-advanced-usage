/**
 * Symbol.hasInstance
 */
Array[Symbol.hasInstance]([]) // true, 相当于 [] instanceof Array
String[Symbol.hasInstance]('') // true

// 利用Symbol.hasInstance可以将instaceof操作符编程函数来使用，更加灵活
// 定死一个类没有实例
class NoInstance {
  static [Symbol.hasInstance]() {
    return false
  }
}

const noInstance = new NoInstance()
console.log(noInstance instanceof NoInstance) // always return false

/**
 * 通过条件判断是否为实例
 */

class SpecialNumber {
  static [Symbol.hasInstance](n) {
    return (n instanceof Number) && n >= 0 && n <= 100
  }
}

const spNum1 = new Number(5)
const spNum2 = new Number(-1)

console.log(
  spNum1 instanceof SpecialNumber, // true
  spNum2 instanceof SpecialNumber, // false
)