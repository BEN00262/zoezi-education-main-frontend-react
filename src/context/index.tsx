import { useReducer } from 'react';
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