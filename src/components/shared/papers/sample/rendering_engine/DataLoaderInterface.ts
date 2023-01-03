import { Observable } from 'rxjs';

export interface IOption {
    option: string;
    isCorrect: boolean;
}

export interface IChildren {
    question: string;
    options: IOption[];
    additionalInfo?: string;
}

export interface IQuestion {
    _id: string;
    subject: string;
    answer: string;
    options: string;
    questionType: string;
    question: string;
    options_next?: IOption[];
    additionalInfo?: string;
    children?:IChildren[];
}

export default interface DataLoaderInterface {
    getQuestions(num: number):Observable<IQuestion[]>;
}