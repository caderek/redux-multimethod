import { method } from '@arrows/multimethod'
import { Guard, Reducer } from './common-types'

type Delegate = (
  actionType: string,
  transformation: Reducer,
  guardFn?: Guard,
) => Reducer

const delegate: Delegate = (actionType, transformation, guardFn) => {
  return guardFn
    ? method(
        (state, action) => action.type === actionType && guardFn(state, action),
        transformation,
      )
    : method(actionType, transformation)
}

export default delegate
