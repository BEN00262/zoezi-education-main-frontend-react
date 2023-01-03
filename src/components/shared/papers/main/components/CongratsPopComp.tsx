import { useContext, useMemo } from 'react';
import Popup from 'reactjs-popup';
import { switchCongratsOff, useZoeziPaperDispatch, useZoeziPaperTrackedState } from '../contexts/global';

interface IStatistic {
    value: number
    text: string
    color: string
}

const Statistic: React.FC<IStatistic> = ({ value, text, color }) => {
    return (
        <div>
            <h4 style={{
                color
            }}>{value}</h4>
            <h6>{text}</h6>
        </div>
    )
}

const CongratsPopComp = () => {
    const {
        isCongratsOpened,
        attemptTree,
        subject,
    } = useZoeziPaperTrackedState();
    const dispatch = useZoeziPaperDispatch();

    const isKiswahili =  useMemo(() => subject.split(" ")[0].toLowerCase() === "kiswahili", [subject]);
    

    return (
        <Popup open={isCongratsOpened} overlayStyle={{
            backgroundColor: "rgba(0,0,0,0.5)"
        }} modal={true} onClose={() => switchCongratsOff(dispatch)} position="right center">
            <div className="card z-depth-1" style={{
                maxWidth: "350px",
                minWidth: "250px",
                borderRadius: "8px"
            }}>
                <div className="card-content center">
                    <img 
                        src="/img/badge.png" alt="congrats badge" 
                        height="200px"    
                    />
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly"
                    }}>
                        <Statistic 
                            value={attemptTree.score.passed} text={isKiswahili ? 'Sahihi' : 'Correct'} color='green'
                        />
                        <Statistic value={attemptTree.score.total - attemptTree.score.passed} text={isKiswahili ? 'Si sahihi' : 'Wrong'} color='red'/>
                    </div>

                    <h4 style={{
                        fontFamily: "'Abril Fatface', cursive",
                        color: "red"
                    }}>
                        {Math.ceil((attemptTree.score.passed / attemptTree.score.total) * 100)} %
                    </h4>

                    <h5 style={{
                        letterSpacing: "2px"
                    }}><b>{isKiswahili ? "Hongera!" : "Congratulations!"}</b></h5>
                    <p><i>{isKiswahili ? "Karatasi yako imesahihishwa" : "Your paper is now marked"}</i></p>
                    <button onClick={() => switchCongratsOff(dispatch)} className="waves-effect waves-light btn z-depth-0" style={{
                        borderRadius: "20px",
                        paddingRight: "30px",
                        paddingLeft: "30px",
                        marginTop: "15px"
                    }}>{isKiswahili ? "Tazama majibu" : "View Answers"}</button>
                </div>
            </div>
        </Popup>
    )
}

export default CongratsPopComp