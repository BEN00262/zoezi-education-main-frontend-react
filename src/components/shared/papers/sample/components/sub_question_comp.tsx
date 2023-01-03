import { useState, useEffect, useMemo } from 'react';
import { IChildren } from '../rendering_engine/DataLoaderInterface';

const CheckBoxComp = ({option,isCorrect, isMarked, index, position,setAnswers,isMultiAnswersQuestion}: {
    option: string,
    isCorrect: boolean,
    isMarked: boolean,
    index: number,
    position: number,
    isMultiAnswersQuestion: boolean,
    setAnswers: (answer:any) => void
}) => {
    return (
        <div key={index}>
            <p>
                <label>
                    <input type="checkbox" className="filled-in" disabled={isMarked} onChange={(e) => {
                        setAnswers({option,isCorrect})
                    }}  required  name={`sub_option_answer_${position}`}/>
                    <span className={isMarked && isCorrect ? "green-text" : "black-text"}>
                        {/* set the innerHTML dangerously in this paper */}
                        {/* also add restrictions for this in the paper submission thing */}
                        <b>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: option
                                }}
                            ></span>
                        </b>
                    </span>
                </label>
            </p>
        </div>
    );
}

const OptionComp = ({option,isCorrect, isMarked,keyValue,position,setAnswers, isMultiAnswersQuestion}: {
    option: string,
    isCorrect: boolean,
    keyValue: string,
    isMarked: boolean,
    position: number,
    isMultiAnswersQuestion: boolean,
    setAnswers: (answer:{
        option: string,
        isCorrect: boolean
    }) => void
}) => {
    return (
            <p key={keyValue}>
                <label>
                    <input disabled={isMarked} required onChange={(e) => {
                        setAnswers({option,isCorrect})
                    }} className="with-gap"
                        type="radio"
                        name={`sub_option_answer_${position}`}
                    />
                    <span className={isMarked && isCorrect ? "green-text" : "black-text"}>
                        <b>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: option
                                }}
                            ></span>
                        </b>
                    </span>
                </label>
            </p>
    )
}

const MultiAnswerComp = ({ children, index, isMarked, isCorrect }: {
    children: any,
    index: number,
    isMarked: boolean,
    isCorrect: boolean
}) => {
    return (
        <div style={{
            marginLeft:"15px",
            marginTop:"5px",
            marginBottom:"5px",
            display:"flex",
            flexDirection:"row",
        }}>
            {isMarked ? isCorrect ? <span style={{color:"green"}}>&#10004;</span> : <span style={{color:"red"}}>&#10008;</span>:null}
            {index+1}.
            <div>
                { children }
            </div>
        </div>
    );
}

const NonMultiAnswerComp = ({ children, index }: {
    children: any,
    index: number
}) => {
    return (
        <div style={{
            marginLeft:"15px",
            marginTop:"5px",
            marginBottom:"5px",
        }}>
            { children }
        </div>
    );
}

const SubQuestionComp = ({question, index, isMarked, setAttempted, setCorrectAnswersCount}:{
    question: IChildren,
    index: number,
    isMarked: boolean,
    setCorrectAnswersCount: (num: number) => void,
    setAttempted: (attempted: number) => void
}) => {
    const [suggestedAnswer,setSuggestedAnswer] = useState<{ option: string,isCorrect: boolean }[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);

    useEffect(() => {
        if(isMarked){
            let setAnswered = suggestedAnswer.every(x => x.isCorrect);
            setIsCorrect(setAnswered);
            setCorrectAnswersCount(setAnswered ? 1 : 0);
        }
    },[isMarked]);

    const isMultipleOption = useMemo(() => question?.options?.filter(x => x.isCorrect)?.length > 1,[question])
    const isMultiAnswersQuestion: boolean = useMemo(() => question.question === "",[question]);

    const setAnswers = (answer:{
        option: string,
        isCorrect: boolean
    }):void => {
        if (!suggestedAnswer.length){ setAttempted(1); }

        if (isMultipleOption){
            setSuggestedAnswer([ ...suggestedAnswer, answer ]);
            return;
        }
        setSuggestedAnswer([ answer ]);
    }

    const RenderQuestion = isMultiAnswersQuestion ? MultiAnswerComp : NonMultiAnswerComp;

    const ChooseRenderingOption = () => {
        let Renderer = isMultipleOption ? CheckBoxComp : OptionComp;

        return ({position, index, option,isCorrect,quesIndex}:{
            position: number,
            index: number,
            option: string,
            isCorrect: boolean,
            quesIndex: number
        }) => {
            return <Renderer
                    keyValue={`sub_option_${index}_${quesIndex}`}
                    setAnswers={setAnswers} 
                    isMultiAnswersQuestion={isMultiAnswersQuestion}
                    key={`sub_option_${index}_${quesIndex}`} 
                    position={position} 
                    option={option} 
                    index={index} 
                    isCorrect={isCorrect} 
                    isMarked={isMarked}
            />
        }
    }

    const chooseRenderingOption = ChooseRenderingOption();

    return (
        <div style={{
            marginLeft:"6px"
        }}>
            <span
                dangerouslySetInnerHTML={{
                    __html: !isMultiAnswersQuestion ? `
                        <div style="display:flex;flex-direction:row;">
                            <p style="margin-right:5px;">
                                ${isMarked ? isCorrect ? 
                                    '<span style="color:green;">&#10004;</span>' 
                                    : 
                                    '<span style="color:red;">&#10008;</span>':''
                                }${index+1}.  
                            </p>
                            <p><strong>
                            ${question.question}
                            </strong></p>
                        </div>
                    ` : ""
                }}
            ></span>

            <RenderQuestion index={index} isMarked={isMarked} isCorrect={isCorrect}>
                {
                    question.options.map(({option,isCorrect}:{
                        option: string,
                        isCorrect: boolean
                    },quesIndex) => {   
                            return chooseRenderingOption({
                                position:index,
                                index: index,
                                quesIndex: quesIndex,
                                option:option, 
                                isCorrect:isCorrect,
                            })
                    })
                }
            </RenderQuestion>

            <div style={{
                marginLeft:"15px",
                marginBottom: "10px"
            }} hidden={!isMarked}>
                <span
                    dangerouslySetInnerHTML={{
                        __html: `
                        <blockquote class="red lighten-5">
                            <span>
                                ${question.additionalInfo}
                            </span>
                        </blockquote>
                    `}}
                ></span>
            </div>
        </div>
    )
}

export default SubQuestionComp;