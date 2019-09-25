import { method, multi } from '@arrows/multimethod'
import { Method, Multimethod } from '@arrows/multimethod/internal/types'
import { IAction } from './common-types'

type CreateReducer = (
  ...delegates: Method[]
) => (
  initialState: {} | null,
) => (state: {} | null, action: IAction) => Multimethod

const reducer: CreateReducer = (...delegates) => (initialState) => (
  state = initialState,
  action,
) => {
  return multi(
    // @ts-lint ignore
    (_, { type }) => type,
    method((x) => x),
    ...delegates,
  )(state, action)
}

export default reducer
