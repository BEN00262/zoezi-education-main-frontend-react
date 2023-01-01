export type ActionType = string;

export interface IZoeziMainGlobalContext {
    authToken?: string
    isZoeziMobileApp: boolean
    iszoeziDesktopApp: boolean
    isParentContext: boolean
    isManagedContext: boolean
}

export interface IAction {
    type: ActionType
    payload: any
}

export type ZoeziReducerFuncType = (state: IZoeziMainGlobalContext, action: IAction) => IZoeziMainGlobalContext