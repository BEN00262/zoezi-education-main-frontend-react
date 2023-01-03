// @ts-ignore
import M from 'materialize-css';
import { useEffect, useState } from 'react';
import { updateQuestions, setSubjectName, useZoeziPaperDispatch } from '../contexts/global';
import { generate_paper_map, get_number_of_questions_in_paper, IPaperMap } from '../grouper/grouper';
import { IQuestion, PagedPaper } from '../rendering_engine/DataLoaderInterface';
import HttpClientAxios from '../rendering_engine/HttpClientAxios';
import PaperFetch from '../rendering_engine/PaperFetch';
import QuestionHOC from './QuestionHOC';

interface IButtonProps {
    icon: string
    btnText: string
    isDisabled?: boolean
    color?: string
    onClick: () => void
}

const Button: React.FC<IButtonProps> = ({ icon, btnText, onClick, isDisabled, color }) => {
    return (
        <button 
            disabled={isDisabled || false}
            style={{
                marginTop: "5px"
            }}
            className={`waves-effect waves-light btn-small${color ? " "+color : ""}`}
            onClick={onClick}
        >
            <i className="material-icons right">{icon}</i>{btnText}
        </button>
    )
}

// <!-- :gradeName/:category/:paperID -->
const gradeName = document.getElementById("gradeName")?.innerText
const category = document.getElementById("category")?.innerText
const paperID = document.getElementById("paperID")?.innerText

// const gradeName = "kcpe"
// const category = "2020"
// const paperID = "616a5d6d9ad38500164f9227"; // "616d77939b93740016005943"; // "61a06214c01bb6001670f0bd"
const savedStateID = document.getElementById("savedStateID")?.innerText || "";

const BASE_URL = `/special/library_paper_questions/${gradeName}/${category}/${paperID}/${savedStateID}`
// const BASE_URL = `http://localhost:3600/library_paper_questions/${gradeName}/${category}/${paperID}/${savedStateID}`
// we should pass the id though to the question
const paperFetch = new PaperFetch(new HttpClientAxios(), BASE_URL);

// we take the page map and the actual question array
const initialize_pages_structures = (paperMap: IPaperMap, questions: IQuestion[]) => {
    let pages = {}

    Object.entries(paperMap.pages).forEach(([page, boundaries]) => {
        pages = {
            ...pages,
            [+page]: questions.slice(boundaries.startIndex, boundaries.endIndex).map(question => {

                switch (question.questionType) {
                    case 'comprehension':
                        {
                            return {
                                questionType: "comprehension",
                                content: {
                                    question: question._id,
                                    children: []
                                }
                            }
                        }
                    case 'normal':
                        {
                            return {
                                questionType: "normal",
                                content: {
                                    status: false,
                                    question: question._id,
                                    attempted_options: []
                                }
                            }
                        }
                    default:
                        // i hope we never reach here this nukes everything
                        throw new Error("Invalid question type")
                }
            })
        }
    })

    return pages;
}

// this is the first thing seen after the paper has been fetched from the db
const HeadlessComp = () => {
    const dispatch = useZoeziPaperDispatch();
    const [paper, setPaper] = useState<PagedPaper>();
    const [navigate, setNavigate] = useState(false);

    useEffect(() => {
        paperFetch.getPaper()
            .then(({ paper, prevState }) => {
                setPaper(paper);
                setSubjectName(dispatch, paper?.subject || "")

                const _paperMap = generate_paper_map(paper?.questions || []);
                const _questions_number = get_number_of_questions_in_paper(paper?.questions || []);

                updateQuestions(dispatch, {
                    questions: paper?.questions || [],
                    paperMap: _paperMap,
                    gradeName: gradeName || "",
                    paperID: paperID || "",
                    isLibraryPaper: true,
                    paperHistoryID: prevState._id || "",
                    currentPage: prevState.currentPage || 0,
                    compSubQuestionPage: prevState.compSubQuestionPage || 0,
                    isMarked: prevState.isMarked || false,
                    isTimed: (prevState.isTimed || paper?.isTimed) || false,
                    remainingTime: prevState.remainingTime || 10000,// 0,
                    numOfQuestions: _questions_number,
                    totalPages: Object.keys(_paperMap.pages).length,
                    studyBuddyReference: document.getElementById("studyBuddyReference")?.innerText || "",

                    attemptTree: {
                        subject: paper?.subject || "",
                        score: {
                            passed: prevState?.attemptTree?.score?.passed || 0,
                            total: prevState?.attemptTree?.score?.total || _questions_number
                        },

                        pages: prevState?.attemptTree?.pages || initialize_pages_structures(_paperMap, paper?.questions || [])
                    }
                });
                setNavigate(true);
            });
    }, []);

    if (!paper) {
        return <div className='row'>loading...</div>
    }

    if (navigate) {
        // here we dont really care for the wasTimed thing
        return <QuestionHOC wasTimed={false}/>
    }

    return null;
}

export default HeadlessComp