import { Navigate, Outlet, useLocation } from "react-router-dom";
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