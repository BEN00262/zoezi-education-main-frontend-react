import { useState } from "react"
import CongratsPopComp from "./components/CongratsPopComp"
import GlobalErrorBoundaryComp from "./components/GlobalErrorBoundaryComp"
import HeadlessComp from "./components/HeadlessComp"
import PaperFace from "./components/PaperFace"
import QuestionHOC from "./components/QuestionHOC"
import StateWatcherComp from "./components/state_watcher"
import {GlobalContextComp} from "./contexts/global"


const MainPaperComp: React.FC<{
    isLibraryReferenced: boolean
}> = ({ isLibraryReferenced }) => {
    localStorage.setItem("remainingTime", '0');

    const [isFrontPage, setIsFrontPage] = useState<boolean>(true);
    const [wasTimed, setWasTimed] = useState(false); // start in not timed mode

    return (
        <GlobalContextComp>
            <GlobalErrorBoundaryComp>
                <CongratsPopComp/>
                <>
                    {isLibraryReferenced ? <HeadlessComp/> :  isFrontPage ? <PaperFace setIsFrontPage={setIsFrontPage} setWasTimed={setWasTimed}/> : <QuestionHOC wasTimed={wasTimed}/>}
                </>
                <StateWatcherComp/>
            </GlobalErrorBoundaryComp>
        </GlobalContextComp>
    )
}

export default MainPaperComp