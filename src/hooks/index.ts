import { useMemo } from "react";
import { useZoeziMainTrackedState } from "../context"

export const useIsLoggedIn = () => {
    const { authToken } = useZoeziMainTrackedState();

    return useMemo(() => {
        // TODO: proper checks for the authToken
        return !!authToken
    }, [authToken])
}