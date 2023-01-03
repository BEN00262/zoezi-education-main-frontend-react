import axios from "axios"
import { ILibPaperQuestions } from "./ILibPaper"


const getLibraryPaper: (baseURL: string) => Promise<ILibPaperQuestions | null> = (baseURL: string) => {
    return axios.get(baseURL)
        .then(({ data }: { data: ILibPaperQuestions | null }) => {
            return data ? data : null
        })
}

export default getLibraryPaper;