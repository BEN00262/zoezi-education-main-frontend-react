import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useZoeziMainTrackedState } from "../../../context";
import { useIsLoggedIn } from "../../../hooks";

export const ProtectedRoute = () => {
    const location = useLocation();
    const isLoggedIn = useIsLoggedIn();


    if (!isLoggedIn) {
        return <Navigate to="/signin" state={{ from: location }}/>
    }
    
    return (
        <Outlet/>
    )
}

export const ForwardProtectedRoute = () => {
    const location = useLocation();
    const isLoggedIn = useIsLoggedIn();


    if (isLoggedIn) {
        return <Navigate to="/dashboard" state={{ from: location }}/>
    }

    return <Outlet/>
}

export const WhoseLearningProtectedRoute = () => {
    const location = useLocation();
    const { isParentContext } = useZoeziMainTrackedState();


    if (isParentContext) {
        return <Navigate to="/choose-child" state={{ from: location }}/>
    }

    return <Outlet/>
}