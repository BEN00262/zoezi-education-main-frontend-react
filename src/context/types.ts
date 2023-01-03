export type ActionType = string;

export interface IZoeziMainGlobalContext {
    authToken: string | null
    isZoeziMobileApp: boolean
    iszoeziDesktopApp: boolean
    isParentContext: boolean
    isManagedContext: boolean

    student_reference: string | null
    selected_student_lname: string | null
    lastname?: string // filled during signin
}

export interface IAction {
    type: ActionType
    payload: any
}

export interface ISwitchStudent {
    student_reference: string
    selected_student_lname: string
}

export type ZoeziReducerFuncType = (state: IZoeziMainGlobalContext, action: IAction) => IZoeziMainGlobalContext