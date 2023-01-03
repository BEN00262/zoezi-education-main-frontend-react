import { useState, useEffect, useMemo } from 'react';
// @ts-ignore
import M from 'materialize-css';


import { IQuestion } from '../rendering_engine/DataLoaderInterface';

const CheckBoxComp = ({option,isCorrect, isMarked, index, position,setSuggestedAnswer}: {
    option: string,
    isCorrect: boolean,
    isMarked: boolean,
    index: number,
    position: number,
    setSuggestedAnswer: (answer:any) => void
}) => {
    return (
        <div key={index}>
            <p>
                <label>
                    <input type="checkbox" className="filled-in" disabled={isMarked} onChange={(e) => {
                        setSuggestedAnswer({option,isCorrect})
                    }}  name={`options_${position}`}/>
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
        </div>
    );
}

const OptionComp = ({option,isCorrect, isMarked, index, position,setSuggestedAnswer}: {
    option: string,
    isCorrect: boolean,
    isMarked: boolean,
    index: number,
    position: number,
    setSuggestedAnswer: (answer:any) => void
}) => {
    return (
        <div key={index}>
            <p>
                <label>
                    <input disabled={isMarked} onChange={(e) => {
                        setSuggestedAnswer({option,isCorrect})
                    }} required className="with-gap" name={`options_${position}`} type="radio"/>
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
        </div>
    )
}

const NormalQuestionComp = ({question, position, isMarked, setAttempted, setCorrectAnswersCount}: {
    question: IQuestion,
    position: number,
    isMarked: boolean,
    setCorrectAnswersCount: (num: number) => void
    setAttempted: (attempted: number) => void
}) => {
    const [suggestedAnswer,setSuggestedAnswer] = useState<{
        option: string,
        isCorrect: boolean
    }[]>([]);
    
    const [isCorrect, setIsCorrect] = useState<boolean>(false);

    const numberOfCorrectOptions: number = useMemo(() => question?.options_next?.filter(x => x.isCorrect)?.length || 0,[question]);
    const isMultipleOption: boolean = (numberOfCorrectOptions > 1) || false;

    useEffect(() => {
        let elems = document.querySelectorAll(".question-comp img");
        M.Materialbox.init(elems);
    },[]);

    useEffect(() => {
        if (isMarked && (numberOfCorrectOptions === suggestedAnswer.length)){
            let checkIfCorrect: boolean = suggestedAnswer.every(x => x.isCorrect);
            setIsCorrect( checkIfCorrect );
            setCorrectAnswersCount( checkIfCorrect ? 1 : 0 );
        }
    },[isMarked]);

    // cache this motherfucker
    const setSuggestedAnswerFunc = (trial: {
        option: string,
        isCorrect: boolean
    }) => {
        // do we really want the suggested answer stuff to be
        // a state i seem to think not
        if (!suggestedAnswer.length){ setAttempted(1); }
        if (isMultipleOption){
            console.log(suggestedAnswer);
            const isOptionExisting = suggestedAnswer.findIndex(x => x.option === trial.option);
            // console.log(isOptionExisting)
            if (isOptionExisting > -1){
                let localSuggestedAnswer = [...suggestedAnswer];
                localSuggestedAnswer.splice(isOptionExisting);
                // rerenders the logic
                setSuggestedAnswer(localSuggestedAnswer);
                if(!localSuggestedAnswer.length){ setAttempted(-1); }

                console.log(localSuggestedAnswer);
                return;
            }
            setSuggestedAnswer([ ...suggestedAnswer,trial ]);
            // console.log(suggestedAnswer);
            return;
        }
        setSuggestedAnswer([ trial ]);
    };
    
    const ChooseRenderingOption = () => {
        let Renderer = isMultipleOption ? CheckBoxComp : OptionComp;

        return ({position, index, option,isCorrect}:{
            position: number,
            index: number,
            option: string,
            isCorrect: boolean
        }) => {
            return <Renderer
                    setSuggestedAnswer={setSuggestedAnswerFunc} 
                    key={index} position={position} 
                    option={option} 
                    index={index} 
                    isCorrect={isCorrect} 
                    isMarked={isMarked}
            />
        }
    }

    const chooseRenderingOption = ChooseRenderingOption();
    
    return (
        // try to inject the box styling here
        <div>
            <span
                dangerouslySetInnerHTML={{
                    __html: `
                    <div style="display:flex;flex-direction:row;">
                        ${isMarked ? isCorrect ? '<span style="color:green;">&#10004;</span>' : '<span style="color:red;">&#10008;</span>':''} 
                        <p style="margin-right:5px;">${position+1}.  </p><strong class="question-comp">${question.question}</strong>
                    </div>
                `}}
            ></span>

            <div style={{
                marginTop:"10px",
                marginLeft:"17px",
                marginBottom: "10px"
            }}>
                {
                    question.options_next && question.options_next.map(({option,isCorrect},index) => {
                        return chooseRenderingOption({
                            position,
                            option,
                            index,
                            isCorrect,
                        })
                    })
                }
            </div>

            <div style={{
                marginLeft:"17px",
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

export default NormalQuestionComp;