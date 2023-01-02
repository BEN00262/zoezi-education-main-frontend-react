export interface ICredentials {
    username_or_phone_number: string
    password: string
}

export interface ILoginResult {
    status: boolean
    authToken: string
}