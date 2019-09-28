import { method, multi } from '@arrows/multimethod'
import { Method, Multimethod } from '@arrows/multimethod/internal/types'
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
  return multi((_, { type }) => type, method((x) => x), ...delegates)(
    state,
    action,
  )
}

export default reducer
