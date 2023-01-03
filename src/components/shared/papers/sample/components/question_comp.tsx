import { useState, useEffect } from 'react';
import { Card, Button, Container  } from 'react-materialize';
import { useMediaQuery } from 'react-responsive';
// import html2canvas from 'html2canvas';
//@ts-ignore
// import domtoimage from 'dom-to-image';
// import axios from 'axios';

import NormalQuestionComp from './normal_question_comp';
import ComprehensionComp from './comprehension_question_comp';
import OldVersionQuestion from './old_version_question';
import { IQuestion } from '../rendering_engine/DataLoaderInterface';
import { useAlert } from 'react-alert';

// for sample papers we dont collect info about the user

// async function collectUserInfo(
//     _csrf: string, gradeName: string, subjectName: string, 
//     subjectID: string, ups: number, downs: number, total: number
// ) {
//     await axios.post("/collect_info", {
//         subjectName,
//         gradeName,
//         subjectID,
//         ups,
//         downs,
//         totalQuestionsAttempted: total,
//         _csrf
//     })
// }

const QuestionComp = ({ questions, fetchQuestions }:{
    questions:IQuestion[],
    fetchQuestions: () => void
}) => {
    const alert = useAlert();
    const [isMarked, setIsMarked] = useState<boolean>(false);
    const [numberAttempted, setNumberAttempted] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);

    const number_of_questions = questions.length > 0 && 
        questions[0].questionType ? questions[0].questionType === "comprehension" ? 
        questions[0].children?.length : questions.length : questions.length;

    // const gradeName = document.getElementById("gradeName")?.innerText;
    // const subjectName = document.getElementById("subjectName")?.innerText;
    // const subjectID = document.getElementById("subjectID")?.innerText;
    // const _csrf = document.getElementById("_csrf")?.innerText;

    const submitStatisticsThenFetchQuestions = () => {
        fetchQuestions()
        // should post the data --> why is it not doing so

        // reenable when doing the actual zoezi paper here

        // collectUserInfo(
        //     _csrf || "",
        //     gradeName || "",
        //     subjectName || "",
        //     subjectID || "",
        //     correctAnswersCount,
        //     numberAttempted - correctAnswersCount,
        //     number_of_questions || 0
        // );

        // take a capture of the paper --> and then fetchQuestions :)
        // @ts-ignore
        // domtoimage.toPng(window.document.getElementById("zoeziPaper")).then(canvas => {
        //     console.log(canvas)
            
        //     var img = new Image();
        //     img.src = canvas;
        //     document.body.appendChild(img);
        // })
        // .finally(() => {fetchQuestions() }) // request the system for more questions on the paper
    }

    const isTabletOrMobileDevice = useMediaQuery({
        query:"(min-width: 601px)"
    });

    const setAttempted = (attempted: number) => {
        setNumberAttempted(
            numberAttempted + attempted
        );
    }

    const incrementCorrectQuestionCount = (num: number) => {
        setCorrectAnswersCount(
            previous_count => previous_count + num
        )
    }

    const selectQuestionType = (question:IQuestion,index:number) => {
        switch(question.questionType){
            case 'normal':
                return <NormalQuestionComp
                            setAttempted={setAttempted} 
                            key={index} 
                            setCorrectAnswersCount={incrementCorrectQuestionCount}
                            question={question} 
                            position={index} 
                            isMarked={isMarked}/>
            case 'comprehension':
                return <ComprehensionComp 
                    setAttempted={setAttempted} 
                    key={index} 
                    question={question} 
                    setCorrectAnswersCount={incrementCorrectQuestionCount}
                    isMarked={isMarked}/>
            default:
                return <OldVersionQuestion 
                    setAttempted={setAttempted} 
                    setCorrectAnswersCount={incrementCorrectQuestionCount}
                    key={index} 
                    question={question} 
                    position={index} 
                    isMarked={isMarked}/>
        }
    }

    // reenable on the actual zoezi paper
    // const isKiswahili = subjectName?.split(" ")[0].toLowerCase() === "kiswahili";


    return (
        <>
            <div className="white" style={{
                display: "flex",
                flexDirection: "row",
                justifyContent:"space-between",
                borderRadius:"2px",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                padding:"5px 6px",
                position:"sticky",
                // marginTop:"55px",
                top: isTabletOrMobileDevice ? 64.2 : 56.2,
                zIndex:2,
            }}>
                    <div className="materialize-red white-text" hidden={!isMarked} style={{
                        alignSelf:"center",
                        padding:"5px",
                        borderRadius:"3px",
                    }}>
                        <b>
                            <span>
                                {/* {isKiswahili ? "ALAMA":"SCORE"} replace with on the actual zoezi paper */}
                                SCORE : {`${correctAnswersCount}/${number_of_questions}`}
                            </span>
                        </b>
                    </div>

                    <input 
                        hidden={isMarked}
                        disabled
                        type="range"
                        min="0"
                        value={`${numberAttempted}`}
                        max={number_of_questions} 
                        style={{
                            marginRight:"3px",
                            alignSelf:"center",
                            background:"#000"
                        }}
                    />
                    <div hidden={isMarked} className="teal white-text z-depth-1" style={{
                        alignSelf:"center",
                        padding:"5px",
                        borderRadius:"4px"
                    }}>
                        <b>
                            {`${numberAttempted}/${number_of_questions}`}
                        </b>
                    </div>

                    <div hidden={!isMarked}>
                        <button onClick={submitStatisticsThenFetchQuestions} className="waves-effect waves-light z-depth-1 btn-small">{
                            // isKiswahili ? "MASWALI ZAIDI" : "MORE QUESTIONS"
                            "MORE QUESTIONS"
                        }</button>
                    </div>
            </div>
            {/* "https://zoezi-mitzanimedia.com/question/five/img/background2.webp" */}
            <div id="zoeziPaper">
            <Card
                style={{
                    marginTop: "13px"
                }}

                header= {
                    <div className="card-image">
                        <div className="postergrad">
                            <img alt="" style={{
                                maxWidth:"100%",
                                height:"84px",
                                objectFit:"cover",
                            }} src="/img/background2.webp"/>
                        </div>
                        <span className="card-title text-center sub-names truncate text-bold teal">{
                            // `${subjectName}`
                            "Sample Questions"
                        }</span>
                    </div>
                }
            >
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (numberAttempted !== number_of_questions){
                        // enable on the actual zoezi paper
                        // alert.info(isKiswahili ? "Tafadhali jibu maswali yote" : "complete all the questions");
                        alert.info("complete all the questions");
                        return;
                    }
                    setIsMarked(true);
                }
                }>
                    { questions.map((question: IQuestion,index: number) => selectQuestionType(question,index)) }

                    <Button
                        node="button"
                        waves="light"
                        small
                        style={{
                            marginTop:"15px"
                        }}

                        disabled={isMarked}
                    >
                        {/* { isKiswahili ? "TUMA MAJIBU" : "SUBMIT ANSWERS" } */}
                        SUBMIT ANSWERS
                    </Button>
                </form>
            </Card>
            </div>
        </>
    )
}

export default QuestionComp;