import delegate from './delegate'
import reducer from './reducer'

describe('delegate', () => {
  describe('when executed with action.type and transformer', () => {
    it('creates unguarded case for usage with reducer', () => {
      const caseA = delegate('ADD_ONE', (state) => state + 1)

      const initialState = 0
      const myReducer = reducer(caseA)(initialState)

      const stateA = myReducer(undefined, { type: 'ADD_ONE' })
      const stateB = myReducer(stateA, { type: 'ADD_ONE' })

      expect(stateA).toEqual(1)
      expect(stateB).toEqual(2)
    })
  })

  describe('when executed with action.type, transformer and guard function', () => {
    it('creates guarded case for usage with reducer', () => {
      const caseA = delegate(
        'ADD_ONE',
        (state) => state + 1,
        (state) => state < 2,
      )

      const initialState = 0
      const myReducer = reducer(caseA)(initialState)

      const stateA = myReducer(undefined, { type: 'ADD_ONE' })
      const stateB = myReducer(stateA, { type: 'ADD_ONE' })
      const stateC = myReducer(stateB, { type: 'ADD_ONE' })

      expect(stateA).toEqual(1)
      expect(stateB).toEqual(2)
      expect(stateC).toEqual(2)
    })
  })
})
