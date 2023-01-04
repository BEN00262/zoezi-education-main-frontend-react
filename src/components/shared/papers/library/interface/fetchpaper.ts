import axios from "axios"
import { ILibPaperQuestions } from "./ILibPaper"


const getLibraryPaper: (baseURL: string) => Promise<ILibPaperQuestions | null> = (baseURL: string) => {
    return axios.get(baseURL)
        .then(({ data }: any) => {
            return (data ? data.content : null) as ILibPaperQuestions | null 
        })
}

export default getLibraryPaper;