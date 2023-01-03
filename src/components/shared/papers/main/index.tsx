import { useState } from "react"
import CongratsPopComp from "./components/CongratsPopComp"
import GlobalErrorBoundaryComp from "./components/GlobalErrorBoundaryComp"
import HeadlessComp from "./components/HeadlessComp"
import PaperFace from "./components/PaperFace"
import QuestionHOC from "./components/QuestionHOC"
import StateWatcherComp from "./components/state_watcher"
import {GlobalContextComp} from "./contexts/global"


interface IMainPaper {
    gradeName: string
    category: string
    paperID: string
    studyBuddyReference: string
    cover: boolean
}

const MainPaperComp: React.FC<IMainPaper> = ({ 
    gradeName, category, paperID, studyBuddyReference, cover
 }) => {
    localStorage.setItem("remainingTime", '0');

    const [isFrontPage, setIsFrontPage] = useState<boolean>(true);
    const [wasTimed, setWasTimed] = useState(false); // start in not timed mode

    return (
        <GlobalContextComp>
            <GlobalErrorBoundaryComp>
                <CongratsPopComp/>
                <>
                    {isFrontPage ? <PaperFace 
                        setIsFrontPage={setIsFrontPage} 
                        setWasTimed={setWasTimed}
                        gradeName={gradeName}
                        BASE_URL={`/special/paper_questions/${gradeName}/${category}/${paperID}`}
                        paperID={paperID}
                        studyBuddyReference={studyBuddyReference}
                    /> : <QuestionHOC wasTimed={wasTimed}/>}
                </>
                <StateWatcherComp/>
            </GlobalErrorBoundaryComp>
        </GlobalContextComp>
    )
}

export default MainPaperComp