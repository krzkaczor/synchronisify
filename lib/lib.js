module.exports = function synchronisify (asyncClass, initPromiseName = '_init') {
  Object
    .getOwnPropertyNames(asyncClass.prototype)
    .filter(name => name !== 'constructor')
    .forEach(name => {
      const method = asyncClass.prototype[ name ]

      const asyncMethod = function () {
        return this[ initPromiseName ].then(() => {
          return method.apply(this, arguments)
        })
      }

      asyncClass.prototype[ name ] = asyncMethod
    })

  return asyncClass
}
