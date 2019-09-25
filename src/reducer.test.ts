import reducer from './reducer'
import delegate from './delegate'

describe('reducer', () => {
  describe('when partially applied', () => {
    it('creates function that takes initial state and returns reducer', () => {
      const partialReducer = reducer()

      expect(typeof partialReducer).toBe('function')
    })
  })

  describe('when created without any delegates', () => {
    it('creates reducer that always returns initial state', () => {
      const initialState = []
      const myReducer = reducer()(initialState)

      const stateA = myReducer(undefined, { type: 'SOME_ACTION' })
      const stateB = myReducer(undefined, { type: 'OTHER_ACTION' })

      expect(stateA).toBe(initialState)
      expect(stateB).toBe(initialState)
    })
  })

  describe('when created with delegates', () => {
    it('executes transformation matched by action.type', () => {
      const initialState = 0
      const myReducer = reducer(
        delegate('SET_ONE', () => 1),
        delegate('SET_TWO', () => 2),
      )(initialState)

      const stateA = myReducer(undefined, { type: 'SET_ONE' })
      const stateB = myReducer(stateA, { type: 'SET_TWO' })
      const stateC = myReducer(stateB, { type: 'NON_EXISTENT_SET_THREE' })

      expect(stateA).toEqual(1)
      expect(stateB).toEqual(2)
      expect(stateC).toEqual(2)
    })
  })
})
