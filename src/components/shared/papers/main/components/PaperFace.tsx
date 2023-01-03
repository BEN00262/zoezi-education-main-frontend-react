// @ts-ignore
import M from 'materialize-css';
import { useEffect, useMemo, useState } from 'react';
import { setDoingMode, setSubjectName, updateQuestions, useZoeziPaperDispatch, useZoeziPaperTrackedState } from '../contexts/global';
import { generate_paper_map, get_number_of_questions_in_paper, IPaperMap } from '../grouper/grouper';
import { IAttemptedPaper, IQuestion, PagedPaper } from '../rendering_engine/DataLoaderInterface';
import HttpClientAxios from '../rendering_engine/HttpClientAxios';
import PaperFetch from '../rendering_engine/PaperFetch';
import { Container } from 'react-materialize';

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

// // <!-- :gradeName/:category/:paperID -->
// const gradeName = document.getElementById("gradeName")?.innerText || "";
// const category = document.getElementById("category")?.innerText || "";
// const paperID = document.getElementById("paperID")?.innerText || "";

// const studyBuddyReference = document.getElementById("studyBuddyReference")?.innerText || "";

// const BASE_URL = `/special/paper_questions/${gradeName}/${category}/${paperID}`

// we should pass the id though to the question
// const paperFetch = new PaperFetch(new HttpClientAxios(), BASE_URL)

interface IPaperFace {
    setIsFrontPage: (state: boolean) => void
    setWasTimed: (state: boolean) => void

    gradeName: string
    paperID: string
    studyBuddyReference?: string
    BASE_URL: string
}

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
const PaperFace: React.FC<IPaperFace> = ({ setIsFrontPage, setWasTimed, BASE_URL, gradeName, paperID, studyBuddyReference }) => {
    const { subject } = useZoeziPaperTrackedState();
    const dispatch = useZoeziPaperDispatch();

    const [paper, setPaper] = useState<PagedPaper>();
    const [attemptedPapers, setAttemptedPapers] = useState<IAttemptedPaper[]>([]);
    const [isUnfinished, setIsUnfinished] = useState<{
        isPending: boolean
        mode: 'timed' | 'normal' | 'either'
    }>({
        isPending: false,
        mode: 'either'
    });

    const isKiswahili =  useMemo(() => subject.split(" ")[0].toLowerCase() === "kiswahili", [subject]);
    const paperFetch = useMemo(() => {
        return new PaperFetch(new HttpClientAxios(), BASE_URL)
    }, [BASE_URL])


    useEffect(() => {
        paperFetch.getPaper()
            .then(({paper, prevState, attemptedPapers}) => {
                setPaper(paper);
                setAttemptedPapers(attemptedPapers || [] as IAttemptedPaper[]);

                // set the type of the unfinished paper here also and check if it is a timed paper i think we should have something
                // setting the time if it exists
                // console.log(prevState)

                // we have to somehow find this crap fuuuuuucks
                const prev_state_was_done_in_timed_mode = ((prevState.remainingTime || 0) > 0) || false;

                if (prev_state_was_done_in_timed_mode) {
                    localStorage.setItem("remainingTime", `${prevState.remainingTime || 0}`);
                }

                setIsUnfinished({
                    isPending: !!Object.keys(prevState).length,
                    mode: prev_state_was_done_in_timed_mode ? 'timed' : 'normal'
                })
                setSubjectName(dispatch, paper?.subject || "")

                const _paperMap = generate_paper_map(paper?.questions || []);
                const _questions_number = get_number_of_questions_in_paper(paper?.questions || []);

                updateQuestions(dispatch, {
                    questions: paper?.questions || [],
                    paperMap: _paperMap,
                    gradeName,
                    paperID,
                    studyBuddyReference: prevState.studyBuddyReference || studyBuddyReference || "",
                    isLibraryPaper: false,
                    paperHistoryID: prevState._id || "",
                    currentPage: prevState.currentPage || 0,
                    compSubQuestionPage: prevState.compSubQuestionPage || 0,
                    isMarked: prevState.isMarked || false,

                    // check for other states and other stuff in this situation
                    isTimed: (prevState.isTimed || paper?.isTimed) || false,
                    remainingTime: prevState.remainingTime || 200000,// 0,
                    numOfQuestions: _questions_number,
                    totalPages: Object.keys(_paperMap.pages).length,

                    attemptTree: {
                        subject: paper?.subject || "",
                        score: {
                            passed: prevState?.attemptTree?.score?.passed || 0,
                            total: prevState?.attemptTree?.score?.total || _questions_number
                        },

                        pages: prevState?.attemptTree?.pages || initialize_pages_structures(_paperMap, paper?.questions || [])
                    }
                });
            });
    }, []);

    // in this case we dont give a damn about the time remaining
    const switchPaper = (paperHistoryID: string) => {
        let foundHistory = attemptedPapers.find(x => x._id === paperHistoryID);

        if (!foundHistory) {
            // if this occurs this will be a hug
            // very very unlikely to occur
            return;
        }

        const _paperMap = generate_paper_map(paper?.questions || []);
        const _questions_number = get_number_of_questions_in_paper(paper?.questions || []);

        // not optimal at all
        updateQuestions(dispatch, {
            questions: paper?.questions || [],
            paperMap: _paperMap,
            paperID,
            studyBuddyReference: paper?.studyBuddyReference || "",
            currentPage: foundHistory.currentPage || 0,
            compSubQuestionPage: foundHistory.compSubQuestionPage || 0,
            isMarked: foundHistory.isMarked || false,
            remainingTime: 0,
            isTimed: false,
            isLibraryPaper: true,
            gradeName,
            paperHistoryID,
            numOfQuestions: _questions_number,
            totalPages: Object.keys(_paperMap.pages).length,

            attemptTree: {
                subject: paper?.subject || "",
                score: {
                    passed: foundHistory?.attemptTree?.score?.passed || 0,
                    total: foundHistory?.attemptTree?.score?.total || _questions_number
                },

                pages: foundHistory?.attemptTree?.pages || initialize_pages_structures(_paperMap, paper?.questions || [])
            }
        });

        setIsFrontPage(false);
        setDoingMode(dispatch, false);
    }

    if (!paper) {
        return <div className='row'>loading...</div>
    }

    return (
        <>
            <div style={{
                marginTop: "10%",
            }}>

                <div className="row center">
                    <div style={{
                        marginBottom: "45px",
                        fontFamily: "'Abril Fatface', cursive",
                    }}>
                        {/* style={{
                        fontFamily: "'Abril Fatface', cursive",
                        color: "red"
                    }} */}
                        <h2 style={{
                            letterSpacing: "20px"
                        }}>{gradeName?.toUpperCase()}</h2>
                        <h5>{paper.subject}</h5>
                    </div>

                    <div>
                        <Button 
                            isDisabled={isUnfinished.isPending && isUnfinished.mode !== "normal"}
                            icon="library_books"
                            btnText={`${isUnfinished.isPending && isUnfinished.mode === "normal" ? isKiswahili ? "Endelea" : "Continue" : ""} ${isKiswahili ? "Kudurusu" : "Revision Mode"}`}
                            onClick={() => {
                                setIsFrontPage(false)
                                setDoingMode(dispatch, false)
                            }}
                        />{' '}

                        
                        {/* we need to disable something */}
                        {/* on clicking this i guess we should save the time and wait */}

                        <Button
                            isDisabled={(isUnfinished.isPending && isUnfinished.mode !== "timed") || !paper.isTimed}
                            icon="alarm"
                            color='red'
                            btnText={`${isUnfinished.isPending && isUnfinished.mode === "timed" ? isKiswahili ? "Endelea na" : "Continue with the" : ""} ${isKiswahili ? "Mwigo wa Mtihani" : "Exam Mode"}`}
                            onClick={() => {
                                // we somehow set this ( we should do this when a past paper is clicked )
                                // we need to check the status of the button
                                if (!isUnfinished.isPending) {
                                    // we need to set the time from this point
                                    // we set the remaining time to the duration i think
                                    localStorage.setItem("remainingTime", `${paper.duration || 0}`);
                                }
                                
                                setIsFrontPage(false)
                                setDoingMode(dispatch, true)
                                setWasTimed(true)
                            }}
                        />
                    </div>
                </div>

                {attemptedPapers.length > 0 ?
                <>
                    <div className="row center" style={{
                        marginTop: "50px"
                    }}>
                        <h5>{isKiswahili ? "Majaribio ya zamani" : "Past Attempts" }</h5>
                        <hr />
                    </div>
                    <div className="row" style={{
                        marginTop: "10px"
                    }}>
                        {attemptedPapers.map((attempted_paper, index) => {
                            return (
                                <div className="col s12 m4" key={`past_attempt_${index}`}>
                                    <div className="card hoverable" onClick={
                                        () => switchPaper(attempted_paper._id)
                                    } style={{
                                        marginLeft: "5px",
                                        cursor: "pointer"
                                    }}>
                                        <div className="card-content">
                                            <span className="card-title">{`${isKiswahili ? "Jaribio" : "Attempt"} ${index + 1}`}</span>
                                            <p>
                                                <span style={{
                                                    color: "green",
                                                }}>{isKiswahili ? "Sahihi" : "Passed" } : {attempted_paper?.attemptTree?.score?.passed || 0}</span> 
                                                {' '}|{' '} 
                                                <span style={{
                                                    color: "red"
                                                }}>{isKiswahili ? "Si sahihi" : "Failed" } : {
                                                    (attempted_paper?.attemptTree?.score?.total || 0) - (attempted_paper?.attemptTree?.score?.passed || 0)
                                                }</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </> : null}
            </div>
        </>
    )
}

export default PaperFace