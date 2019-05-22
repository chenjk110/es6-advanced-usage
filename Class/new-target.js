/**
 * 指向当前类的new.target
 * 
 */
class AbstractTest {
  constructor() {
    console.log(new.target)
    if (new.target === AbstractTest) {
      throw new Error('抽象类`AbstractTest`不能用于实例化')
    }
  }

  // 抽象方法A
  methodA() {
    if (!Object.hasOwnProperty(this, 'methodA')) {
      throw new Error('需要重写抽象方法`methodA`')
    }
  }

  // 抽象方法B
  methodB() {
    if (!Object.hasOwnProperty(this, 'methodB')) {
      throw new Error('需要重写抽象方法`methodB`')
    }
  }

}

// const at = new AbstractTest() // Error, 抽象类不能实例化

class Test extends AbstractTest {
  constructor() {
    super()
  }

  methodA() {
    console.log('Test: methodA')
  }
}

const t = new Test() // ok
t.methodA()
// t.methodB() // Error 未重写抽象方法
