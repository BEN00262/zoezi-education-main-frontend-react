import axios from 'axios';
import React, { useReducer } from 'react';
import { QueryClient } from 'react-query';
import { createContainer } from 'react-tracked';
import { verifyToken } from '../utils';
import { ACTION_TYPE_LOGIN, ACTION_TYPE_SWITCH_TO_PARENT, ACTION_TYPE_SWITCH_TO_STUDENT } from './ActionTypes';
import reducer from './reducer';
import { IAction, ISwitchStudent, IZoeziMainGlobalContext } from './types';

export const initialContext: IZoeziMainGlobalContext = {
    // authToken: "",
    isZoeziMobileApp: false,
    iszoeziDesktopApp: false,
    isParentContext: true,
    isManagedContext: false,

    // student_reference: localStorage.getItem("selected_student_reference") ?? null,
    // selected_student_lname: localStorage.getItem("selected_student_lname") ?? "",
    ...verifyToken(localStorage.getItem("authToken") ?? "")
}

const useValue = () => useReducer(reducer, initialContext);

export const {
    Provider: ZoeziMainContextComp,
    useTrackedState: useZoeziMainTrackedState,
    useUpdate: useZoeziMainDispatch
} = createContainer(useValue);

// create the query client for the whole app
export const ZoeziMainQueryClient = new QueryClient();

// console.log(import.meta.env)

axios.defaults.baseURL = import.meta.env.VITE_MAIN_ZOEZI_SERVER_ENDPOINT;

axios.interceptors.request.use(
    onRequest => {
        // @ts-ignore
        if (!onRequest?.headers?.['x-access-token']) {
            // @ts-ignore
            onRequest.headers['x-access-token'] = localStorage.getItem('authToken');
        }

        return onRequest;
    },

    error => Promise.reject(error)
)

type DispatchType = React.Dispatch<IAction>;

// dispatch methods
export const handle_login_dispatch = (dispatch: DispatchType, authToken: string) => {
    localStorage.setItem('authToken', authToken);
    
    dispatch({
        type: ACTION_TYPE_LOGIN,

        // destructure the authtoken and then save the values
        payload: verifyToken(authToken)
    })
}


// set to student mode
export const switch_to_selected_student = (dispatch: DispatchType, student: ISwitchStudent) => {
    // store this data in the local storage
    localStorage.setItem("selected_student_reference", student.student_reference);
    localStorage.setItem("selected_student_lname", student.selected_student_lname);    

    dispatch({
        type: ACTION_TYPE_SWITCH_TO_STUDENT,
        payload: student
    })
}

// set to student mode
export const switch_to_parent = (dispatch: DispatchType) => {
    // store this data in the local storage
    localStorage.setItem("selected_student_reference", "");
    localStorage.setItem("selected_student_lname", "");

    dispatch({
        type: ACTION_TYPE_SWITCH_TO_PARENT,
        payload: null
    })
}