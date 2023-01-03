import jwt_decode from "jwt-decode";

export const verifyToken = (token: string) => {
    try {
        if (!token) {
            // if the token is empty just return an empty stuff :)
            throw new Error("The token is empty");
        }

        const { exp, selected_student_lname, student_reference, is_student } = jwt_decode(token) as any;

        // if the token is expired just exit :)
        return {
            authToken: Date.now() >= exp * 1000 ? null : token, // by default i was checking for this
            selected_student_lname, student_reference, is_student
        }
    } catch (error) {

        return {
            authToken: null,
            selected_student_lname: "", student_reference: "", is_student: false 
        };
    }
}