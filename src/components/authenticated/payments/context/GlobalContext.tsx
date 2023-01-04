import { createContext, useReducer } from "react";
import { io } from "socket.io-client";
import { INITIALIZE_SOCKETIO } from "./ActionTypes";
import reducer from "./reducer";


type IMessage = {
    type: string
    response: {
        status: boolean
        message: ""
    }
}

export interface IInitialState {
    message: IMessage
}

const initialState: IInitialState = {
    message: {
        type: "", // default type
        response: {
            status: false,
            message: ""
        }
    }
} 

export const GlobalContext = createContext(initialState);

const socket = io();

const current_user_id = document.getElementById("userID")?.innerText || "";   // "custom_user_id";

const GlobalContextComp = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    socket.on("connect", () => {
        socket.emit('payments regestration',{ current_user_id })
    });

    socket.once('payment subscription', function (data: any){
        let message = JSON.parse(data) as IMessage;
        dispatch({
            type: INITIALIZE_SOCKETIO,
            payload: message
        })
    });

    return (
        <GlobalContext.Provider value={{ ...state }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextComp