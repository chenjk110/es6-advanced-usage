// deleteProperty trape take effect when use 'delete' operator
const unDeletable = new Proxy({}, {
  deleteProperty: function (target, key, receiver) {
    throw Error('not permitted to delete.')
  }
})

unDeletable.name = 'helloworld'

try {
  delete unDeletable.name
} catch (err) {
  console.error(err.message) // Error: not permitted to delete.
}


// only delete invalid value
const deleteInvalid = new Proxy({}, {
  deleteProperty: function (target, key, receiver) {
    if (Reflect.get(target, key, receiver) != null) { // the key will be deleted while value as undefined or null.
      throw Error(`the key '${key}' will not be deleted.`)
    }
    Reflect.deleteProperty(target, key, receiver)
  }
})

deleteInvalid.name = 'my name'

try {
  delete deleteInvalid.name
} catch (err) {
  console.error(err.message) // the key 'name' will not be deleted.
}

  
try {
  deleteInvalid.name = undefined
  delete deleteInvalid.name // fine!
  console.log('deleted!!') 
} catch (err) { }