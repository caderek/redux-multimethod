export interface Action {
  type: string
}

export type Reducer = (state: any, action: Action) => any

export type Guard = (state: any, action: Action) => boolean
