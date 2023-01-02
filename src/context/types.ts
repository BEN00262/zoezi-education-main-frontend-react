export type ActionType = string;

export interface IZoeziMainGlobalContext {
    authToken: string | null
    isZoeziMobileApp: boolean
    iszoeziDesktopApp: boolean
    isParentContext: boolean
    isManagedContext: boolean
    lastname?: string // filled during signin
}

export interface IAction {
    type: ActionType
    payload: any
}

export type ZoeziReducerFuncType = (state: IZoeziMainGlobalContext, action: IAction) => IZoeziMainGlobalContext