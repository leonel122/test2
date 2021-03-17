
const assert = require('assert')
const filtersShops = require('../../../../src/services/shops/hooks/filters-shops')

describe('Test shops/hooks/filters-shops.unit.test.js', () => {
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
    assert(typeof filtersShops === 'function', 'Hook is not a function.')
  })

  it('???', () => {
    contextBefore.method = 'create'
    assert(true)

    /*
    filtersShops()(contextBefore)

    assert.deepEqual(contextBefore.data, {

    })
    */
  })
})
