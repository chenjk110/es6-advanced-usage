/**
 * 迭代执行器
 * @param {Generator Function} defTask 
 */
function run(defTask) {
  const task = defTask() 

  let result = task.next()

  // 处理结果并继续迭代
  function handleResAndNext(res) {
    result = task.next(res)
    next()
  }

  // 处理错误并抛出异常
  function handleErr(err) {
    task.throw(err)
  }

  // 通用回调函数
  function commonCallback(err, res) {
    if (err) {
      handleErr(err)
      return
    }
    handleResAndNext(res)
  }
  
  function next() {
    if (!result.done) {
      if (typeof result.value === 'function') {
        // 传统方式回调处理
        result.value(commonCallback)
      } else if (result.value instanceof Promise) {
        // promise回调处理
        return result.value.then(handleResAndNext, handleErr)
      } else {
        // 返回值直接下一步处理
        handleResAndNext(result.value)
      }
    }
  }

  next()
  
}

// async with tranditional callback
function crateAsyncTimer() {
  return function (cb) {
    setTimeout(() => cb(null, Math.random()), 1000)
  }
}

// async with promise
function creatPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('PromiseResoved: ' + new Date().toLocaleTimeString()), 1000)
  })
}

run(function*() {
  const rand1 = yield crateAsyncTimer()
  console.log(rand1)
  const rand2 = yield crateAsyncTimer()
  console.log(rand2)
  const res1 = yield creatPromise()
  console.log(res1)
  const res2 = yield creatPromise()
  console.log(res2)
})