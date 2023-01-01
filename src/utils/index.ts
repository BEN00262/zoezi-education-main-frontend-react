import jwt_decode from "jwt-decode";

export const verifyToken = (token: string) => {
    try {
        if (!token) {
            // if the token is empty just return an empty stuff :)
            throw new Error("The token is empty");
        }

        const { exp } = jwt_decode(token) as any;

        // if the token is expired just exit :)
        return {
            authToken: Date.now() >= exp * 1000 ? null : token, // by default i was checking for this
        }
    } catch (error) {

        return {authToken: null, isTeacher: false, communicationId: null };
    }
}