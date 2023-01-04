export interface IStudent {
    profilePic: string
    firstname: string
    lastname: string
    grade: string
    school: string
    gender: string
    preferences: {
        numberOfQuestions: number
    }
}