const synchronisify = require('../lib/lib')

const delay = (t = 1000) => new Promise(resolve => setTimeout(resolve, t))

class ApiClient {
  constructor (login, pass) {
    this.login = login
    this.pass = pass
    // simulate api call for auth key
    this.init = delay().then(() => { this.apiKey = 'SECRET_API_KEY' })
  }

  action () {
    if (!this.apiKey) {
      throw new Error()
    }

    // do something
  }
}

describe('Synchronisify', function () {
  it('should wait for async constructor', function () {
    synchronisify(ApiClient, 'init')

    const client = new ApiClient('login', 'pass')
    return client.action()
  })
})
