export interface IAction {
  type: string
}

export type Reducer = (state: any, action: IAction) => any

export type Guard = (state: any, action: IAction) => boolean
