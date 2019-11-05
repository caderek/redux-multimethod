import { method, multi } from '@arrows/multimethod'
import { MethodFn, Multimethod } from '@arrows/multimethod/internal/types'
import { Action } from './common-types'

type CreateReducer = (
  ...delegates: MethodFn[]
) => (
  initialState: {} | null,
) => (state: {} | null, action: Action) => Multimethod

const reducer: CreateReducer = (...delegates) => (initialState) => (
  state = initialState,
  action,
) => {
  return multi(
    (_: any, { type }: Action) => type,
    method((x: any) => x),
    ...delegates,
  )(state, action)
}

export default reducer
