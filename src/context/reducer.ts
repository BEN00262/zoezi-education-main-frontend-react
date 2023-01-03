import { ACTION_TYPE_LOGIN, ACTION_TYPE_SWITCH_TO_PARENT, ACTION_TYPE_SWITCH_TO_STUDENT } from "./ActionTypes";
import { IAction, IZoeziMainGlobalContext, ZoeziReducerFuncType } from "./types";

const reducer: ZoeziReducerFuncType = (state: IZoeziMainGlobalContext, action: IAction) => {

    switch (action.type) {
        case ACTION_TYPE_LOGIN:
            return {
                ...state,
                ...action.payload
            }

        case ACTION_TYPE_SWITCH_TO_STUDENT:
            return {
                ...state,
                ...action.payload
            }

        case ACTION_TYPE_SWITCH_TO_PARENT:
            return {
                ...state,
                student_reference: null,
                selected_student_lname: null
            }
    }

    
    return state;
}

export default reducer;