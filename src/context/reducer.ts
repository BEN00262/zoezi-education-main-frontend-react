import { ACTION_TYPE_LOGIN } from "./ActionTypes";
import { IAction, IZoeziMainGlobalContext, ZoeziReducerFuncType } from "./types";

const reducer: ZoeziReducerFuncType = (state: IZoeziMainGlobalContext, action: IAction) => {

    switch (action.type) {
        case ACTION_TYPE_LOGIN:
            return {
                ...state,
                ...action.payload
            }
    }

    
    return state;
}

export default reducer;