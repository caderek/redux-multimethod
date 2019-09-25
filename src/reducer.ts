import { multi, method } from '@arrows/multimethod'

const reducer = (...methods) => (initialState) => (
  state = initialState,
  action,
) => {
  return multi(
    (_, action) => action.type,
    method((state) => state),
    ...methods,
  )(state, action)
}

export default reducer
