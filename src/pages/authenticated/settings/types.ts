export interface IStudent {
    profilePic: string
    firstname: string
    lastname: string
    grade: string
    school: string
    gender: string
    timeRemaining: string
    preferences: {
        numberOfQuestions: number
    }
}