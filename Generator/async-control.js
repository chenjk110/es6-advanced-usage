/**
 * 
 * @param {Generator Function} defTask 
 */
function run(defTask) {
  const task = defTask() 

  let result = task.next()

  function handleResAndNext(res) {
    result = task.next(res)
    next()
  }

  function handleErr(err) {
    task.throw(err)
  }

  function next() {
    if (!result.done) {
      if (typeof result.value === 'function') {
        result.value(function(err, res) {
          if (err) {
            handleErr(err)
            return
          }
          handleResAndNext(res)
        })
      } else if (result.value instanceof Promise) {
        return result.value.then(handleResAndNext, handleErr)
      } else {
        result = task.next(result.value)
        next()
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