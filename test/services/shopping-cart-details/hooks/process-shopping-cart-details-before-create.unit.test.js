
const assert = require('assert')
const processShoppingCartDetailsBeforeCreate = require('../../../../src/services/shopping-cart-details/hooks/process-shopping-cart-details-before-create')

describe('Test shopping-cart-details/hooks/process-shopping-cart-details-before-create.unit.test.js', () => {
  // eslint-disable-next-line no-unused-vars
  let contextBefore, contextAfterPaginated,
    // eslint-disable-next-line no-unused-vars
    contextAfter, contextAfterMultiple

  beforeEach(() => {
    contextBefore = {
      type: 'before',
      params: { provider: 'socketio' },
      data: {

      }
    }

    contextAfter = {
      type: 'after',
      params: { provider: 'socketio' },
      result: {

      }
    }

    contextAfterMultiple = {
      type: 'after',
      params: { provider: 'socketio' },
      result: [

      ]
    }

    contextAfterPaginated = {
      type: 'after',
      method: 'find',
      params: { provider: 'socketio' },
      result: {
        data: [

        ]
      }
    }
    contextAfterPaginated.result.total = contextAfterPaginated.result.data.length
  })

  it('Hook exists', () => {
    assert(typeof processShoppingCartDetailsBeforeCreate === 'function', 'Hook is not a function.')
  })

  it('???', () => {
    contextBefore.method = 'create'
    assert(true)

    /*
    processShoppingCartDetailsBeforeCreate()(contextBefore)

    assert.deepEqual(contextBefore.data, {

    })
    */
  })
})
