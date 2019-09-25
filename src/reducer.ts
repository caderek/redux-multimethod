import { Method, Multimethod } from '@arrows/multimethod/internal/types'
import { multi, method } from '@arrows/multimethod'
import { Action } from './common-types'

type CreateReducer = (
  ...delegates: Method[]
) => (
  initialState: {} | null,
) => (state: {} | null, action: Action) => Multimethod

const reducer: CreateReducer = (...delegates) => (initialState) => (
  state = initialState,
  action,
) => {
  return multi(
    (_, action) => action.type,
    method((state) => state),
    ...delegates,
  )(state, action)
}

export default reducer
