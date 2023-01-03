import { useEffect } from "react"
import axios from 'axios'
import { switchCongratsOff, updateTotalScore, useZoeziPaperDispatch, useZoeziPaperTrackedState } from "../contexts/global"
import { IComprehensionContent, INormalContent, IPagePaperStudentTree } from "../interfaces/librarypaper";

const markTree = (tree: IPagePaperStudentTree) => {
    let passed =  0;

    Object.entries(tree.pages).forEach(([page, elements]) => {

        passed += elements.reduce((acc, element) => {

            switch(element.questionType) {
                case 'normal':
                    {
                        let content = element.content as INormalContent
                        acc += content.status ? 1 : 0;
                        break;
                    }
                case 'comprehension':
                    {
                        let content = element.content as IComprehensionContent

                        acc += content.children.reduce((acc, _child) => {
                            let child = _child as INormalContent
                            acc += child.status ? 1 : 0;
                            return acc;
                        }, 0);
                        break;
                    }
            }


            return acc
        }, 0)

    })

    return passed;
}

const _csrf = document.getElementById("_csrf")?.innerText || "";
const category = document.getElementById("category")?.innerText || "";
const secondTier = document.getElementById("secondTier")?.innerText || "";
const studyBuddyReference = document.getElementById("studyBuddyReference")?.innerText || "";

const StateWatcherComp = () => {
    const {
        attemptTree,
        isMarked,
        currentPage,
        compSubQuestionPage,
        paperHistoryID,
        gradeName,
        subject,
        isTimed,
        paperID,
        isLibraryPaper,
    } = useZoeziPaperTrackedState();
    const dispatch = useZoeziPaperDispatch();

    // const UPDATE_URL = `http://localhost:3600/special-paper-analytics/${paperID}`;
    const UPDATE_URL = `/special/special-paper-analytics/${paperID}`

    useEffect(() => {
        if (isMarked) {
            updateTotalScore(dispatch, markTree(attemptTree));

            if (!isLibraryPaper) {
                switchCongratsOff(dispatch, true);
            }
        }
    }, [isMarked]);


    useEffect(() => {
        // check the selected mode if the mode is of timed nature set the stuff
        // we also need to save if the paper was timed and if so store the time --> else we cant do nothing
        // if its a library paper just ignore the sending part completely
        if (!isLibraryPaper && (compSubQuestionPage !== 0 || currentPage !== 0)) {
            axios.post(UPDATE_URL, {
                currentPage,
                compSubQuestionPage,
                isMarked,
                isTimed,
                studyBuddyReference,
                category,
                remainingTime: +`${localStorage.getItem("remainingTime")}`|| 0,
                secondTier,
                gradeName,
                subject,
                attemptTree,
                paperHistoryID,
                _csrf
            })
            .catch(console.log);
        }

    }, [attemptTree])

    return null
}

export default StateWatcherComp