import { ActionType, INITIALIZE_SOCKETIO } from "./ActionTypes";
import { IInitialState } from "./GlobalContext";


export interface IAction {
    type: ActionType,
    payload?:any
}

const reducer = (state: IInitialState, action: IAction) => {
    switch (action.type) {
        case INITIALIZE_SOCKETIO:
            {
                return {
                    ...state,
                    message: action.payload
                }
            }
    }

    return state;
}

export default reducer;