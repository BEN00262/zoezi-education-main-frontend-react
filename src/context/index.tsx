import axios from 'axios';
import { useReducer } from 'react';
import { QueryClient } from 'react-query';
import { createContainer } from 'react-tracked';
import reducer from './reducer';
import { IZoeziMainGlobalContext } from './types';

export const initialContext: IZoeziMainGlobalContext = {
    authToken: "",
    isZoeziMobileApp: false,
    iszoeziDesktopApp: false,
    isParentContext: false,
    isManagedContext: false
}

const useValue = () => useReducer(reducer, initialContext);

export const {
    Provider: ZoeziMainContextComp,
    useTrackedState: useZoeziMainTrackedState,
    useUpdate: useZoeziMainDispatch
} = createContainer(useValue);

// create the query client for the whole app
export const ZoeziMainQueryClient = new QueryClient();

console.log(import.meta.env)

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