import { method } from '@arrows/multimethod'

const delegate = (actionType, transformation, guardFn) => {
  return guardFn
    ? method(
        (state, action) => action.type === actionType && guardFn(state, action),
        transformation,
      )
    : method(actionType, transformation)
}

export default delegate
