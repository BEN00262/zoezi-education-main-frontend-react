import { useEffect } from 'react';
// @ts-ignore
import M from 'materialize-css';

import SubQuestionComp from './sub_question_comp';
import { IQuestion } from '../rendering_engine/DataLoaderInterface';

const ComprehensionComp = ({question,isMarked, setAttempted, setCorrectAnswersCount}:{
    question: IQuestion,
    isMarked: boolean,
    setCorrectAnswersCount: (num:number) => void
    setAttempted: (attempted: number) => void
}) => {

    // useEffect
    useEffect(() => {
        let elems = document.querySelectorAll(".question-comp img");
        M.Materialbox.init(elems);
    },[]);

    return (
        <div>
            <span
                dangerouslySetInnerHTML={{
                    __html: `<div class="question-comp">${question.question}</div>`
                }}
            ></span>
            <div style={{
                marginTop:"5px"
            }}>
                {
                    question.children && question.children.map((child,index) => {
                        return <SubQuestionComp 
                            key={index} 
                            question={child} 
                            index={index} 
                            isMarked={isMarked}
                            setAttempted={setAttempted}
                            setCorrectAnswersCount={setCorrectAnswersCount}
                            />
                    })
                }
            </div>
        </div>
    )
}

export default ComprehensionComp;