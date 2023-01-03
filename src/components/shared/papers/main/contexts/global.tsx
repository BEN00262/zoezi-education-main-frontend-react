import { Dispatch, useReducer } from "react";
import { createContainer } from "react-tracked";
import { IAction } from "../../../../../context/types";
import { IPaperMap } from "../grouper/grouper";
import { ILibraryPaperContent, IPagePaperStudentTree } from "../interfaces/librarypaper";
import { IQuestion } from "../rendering_engine/DataLoaderInterface";
import { 
    INITIALIZE_ATTEMPT_TREE_AT, UPDATE_ATTEMPT_TREE, 
    UPDATE_ATTEMPT_TREE_AT, UPDATE_ATTEMPT_TREE_AT_AND_MOVE, 
    UPDATE_COMP_SUB_PAGE, UPDATE_CONGRATS_POP_UP_STATE, 
    UPDATE_CURRENT_PAGE_NUMBER, UPDATE_DOING_STATE, 
    UPDATE_ISMARKED, UPDATE_NO_OF_QUES_PER_PAGE, 
    UPDATE_QUESTIONS, UPDATE_SUBJECT_NAME, 
    UPDATE_TIME_REMAINING, UPDATE_TOTAL_MARKS 
} from "./actionType";
import reducer from "./reducer";

// reset each time a paper is loaded into the system
// if we have a comprehension question the fetch should be different
// check if the paper is timed

export interface IState {
    questions: IQuestion[]
    isLibraryPaper: boolean
    studyBuddyReference: string
    paperMap: IPaperMap
    paperHistoryID: string
    paperID: string
    questionsAttempted: number
    numOfQuestions: number
    compSubQuestionPage: number
    isMarked: boolean
    isCongratsOpened: boolean
    isTimed: boolean
    remainingTime: number // used for timed papers
    attemptTree: IPagePaperStudentTree
    gradeName: string
    subject: string
    currentPage: number
    nextPage: number
    totalPages: number // total page counts --> used for some ui shit
    questionsPerPage: number
}

const initialState: IState = {
    questions: [],
    studyBuddyReference: "",
    isLibraryPaper: false,
    isCongratsOpened: false,
    questionsAttempted: 0,
    paperHistoryID: "", // we need for the paper sharing together with the actual paper id for this to work
    remainingTime: 0,
    paperID: "",
    compSubQuestionPage: 0, // only used for comprehension questions
    paperMap: { pages:{} },
    attemptTree: {
        pages: {},
        score: {passed:0, total:0},
        subject: ""
    },
    isMarked: false,
    isTimed: false,
    gradeName: "",
    subject: "",
    numOfQuestions: 0,
    currentPage: 0, // this should be persisted somewhere
    nextPage: 1,
    totalPages: 0,
    // this does not change at all its preconfigured
    // be smart on the fetching stuff
    questionsPerPage: 1 // this is not used at all now
}

const useValue = () => useReducer(reducer, initialState);

export const {
    Provider: GlobalContextComp,
    useTrackedState: useZoeziPaperTrackedState,
    useUpdate: useZoeziPaperDispatch
} = createContainer(useValue);

export const updateQuestions = (dispatch: Dispatch<IAction>, {questions, studyBuddyReference, isLibraryPaper, paperID,gradeName, isMarked, paperHistoryID,isTimed, remainingTime, compSubQuestionPage, paperMap, currentPage, totalPages, numOfQuestions, attemptTree}:{
    questions: IQuestion[],
    paperMap: IPaperMap,
    currentPage: number,
    totalPages: number,
    isMarked: boolean,
    studyBuddyReference: string
    paperID: string,
    compSubQuestionPage: number,
    numOfQuestions: number,
    attemptTree: IPagePaperStudentTree,
    isTimed: boolean,
    remainingTime: number,
    paperHistoryID: string,
    gradeName: string,
    isLibraryPaper: boolean
}) => {
    dispatch({
        type: UPDATE_QUESTIONS,
        payload: {
            questions,
            isLibraryPaper,
            compSubQuestionPage,
            paperHistoryID,
            studyBuddyReference,
            gradeName,
            paperID,
            paperMap,
            isTimed,
            remainingTime,
            currentPage,
            isMarked,
            totalPages,
            numOfQuestions,
            attemptTree
        }
    })
}

export const initializeStudentTreeContentAt = (dispatch: Dispatch<IAction>, page: number, content: ILibraryPaperContent) => {
    dispatch({
        type: INITIALIZE_ATTEMPT_TREE_AT,
        payload: {
            page,
            content
        }
    })
}

export const updateStudentTreeContentAt = (dispatch: Dispatch<IAction>, page: number, parent_question_id: string, content: ILibraryPaperContent) => {
    // we use this to update on the specific tree content
    dispatch({
        type: UPDATE_ATTEMPT_TREE_AT,
        payload: {
            parent_question_id,
            page,
            content
        }
    })
}

// run a preinitialize on every question ( then further customize the data pushing process )
export const updateAttemptTree = (dispatch: Dispatch<IAction>, page: number, content: ILibraryPaperContent[]) => {
    dispatch({
        type: UPDATE_ATTEMPT_TREE,
        payload: {
            page,
            content
        }
    })
}

// update the whole page worth of contents --> do two things at the same time :)
export const updateStudentTreeContentAtAndMove = (dispatch: Dispatch<IAction>, next_page:number,next_sub_page: number, page: number, contents: ILibraryPaperContent[]) => {
    dispatch({
        type: UPDATE_ATTEMPT_TREE_AT_AND_MOVE,
        payload: {
            page,
            contents,
            next_page,
            next_sub_page
        }
    })
}

export const updateNoQuesPerPage = (dispatch: Dispatch<IAction>, howMany: number) => {
    dispatch({
        type: UPDATE_NO_OF_QUES_PER_PAGE,
        payload: howMany
    })
}

export const setSubjectName = (dispatch: Dispatch<IAction>,subject: string) => {
    dispatch({
        type: UPDATE_SUBJECT_NAME,
        payload: subject
    })
}

export const setDoingMode = (dispatch: Dispatch<IAction>,status: boolean) => {
    dispatch({
        type: UPDATE_DOING_STATE,
        payload: status
    })
}

// this just changes it to true
export const setIsMarked = (dispatch: Dispatch<IAction>) => {
    dispatch({
        type: UPDATE_ISMARKED,
        payload: null
    })
}

export const setCurrentSubPage = (dispatch: Dispatch<IAction>,pageNum: number) => {
    dispatch({
        type: UPDATE_COMP_SUB_PAGE,
        payload: pageNum
    })
}

export const updateTotalScore = (dispatch: Dispatch<IAction>,score: number) => {
    dispatch({
        type: UPDATE_TOTAL_MARKS,
        payload: score
    })
}

export const updatePageNumber = (dispatch: Dispatch<IAction>,currentPage: number) => {
    dispatch({
        type: UPDATE_CURRENT_PAGE_NUMBER,
        payload: currentPage
    })
}

export const updateRemainingTime = (dispatch: Dispatch<IAction>, time: number) => {
    dispatch({
        type: UPDATE_TIME_REMAINING,
        payload: time
    })
}

export const switchCongratsOff = (dispatch: Dispatch<IAction>, status: boolean = false) => {
    dispatch({
        type: UPDATE_CONGRATS_POP_UP_STATE,
        payload: status
    })
}
