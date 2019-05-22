/**
 * super 关键字
 */

class A {
  static staticMethod() {
    console.log('staticMethod of Class A called. context: ', this)
  }

  constructor() {
    console.log('Class A constructor called. context: ', this)
  }

  methodA() {
    console.log('methodA of Class A called. context: ', this)
  }
}

class B extends A {
  constructor() {
    super() // extended Class should call this
    console.log('Class B constructor called.')

  }

  methodB() {
    super.constructor.staticMethod()
    // super -> Class A
    // static methods is assigned to constructor
    // context -> Class A
    console.log('methodB of Class B called.')
  }

  callMethodAFromA() {
    super.methodA() // context -> this, not Class A
  }
  
}

const b = new B()
b.methodB()
b.methodA()
b.callMethodAFromA()