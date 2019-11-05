import { method } from '@arrows/multimethod'
import { Action, Guard, Reducer } from './common-types'

type Delegate = (
  actionType: string,
  transformation: Reducer,
  guardFn?: Guard,
) => Reducer

const delegate: Delegate = (actionType, transformation, guardFn) => {
  return guardFn
    ? method(
        (state: any, action: Action) =>
          action.type === actionType && guardFn(state, action),
        transformation,
      )
    : method(actionType, transformation)
}

export default delegate
