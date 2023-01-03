import React,{useState, useEffect,Suspense, useMemo} from 'react';
import { Container } from 'react-materialize';

import '../App.css';
import { IQuestion } from '../rendering_engine/DataLoaderInterface';
import { updateNoQuesPerPage, useZoeziPaperDispatch, useZoeziPaperTrackedState } from '../contexts/global';
import { get_already_done_pages_questions_total } from '../grouper/grouper';

const LazyQuestionComponent = React.lazy(() => import('./question_comp'));

export default function QuestionHOC({ wasTimed }: { wasTimed: boolean }) {
  const {
    subject, currentPage,
    questions, paperMap
  } = useZoeziPaperTrackedState();
  const dispatch = useZoeziPaperDispatch();

  const [data,setData] = useState<IQuestion[]>([]);
  const [alreadyDone, setAlreadyDone] = useState<number>(0);
  const isKiswahili =  useMemo(() => subject.split(" ")[0].toLowerCase() === "kiswahili", [subject])

  useEffect(() => {
    setAlreadyDone(get_already_done_pages_questions_total(questions,paperMap, currentPage));
    let current_page = paperMap.pages[currentPage];
    updateNoQuesPerPage(dispatch, current_page.endIndex - current_page.startIndex); // compute the value every time
    setData(questions.slice(current_page.startIndex, current_page.endIndex))
  }, [currentPage])
  
  return (
        <>
          <Suspense fallback={
            <Container>
                {isKiswahili ? "Karatasi inatayarishwa ..." : "Preparing paper ..."}
            </Container>
          }>
            <LazyQuestionComponent 
              questions={data} 
              alreadyDone={alreadyDone} 
              isKiswahili={isKiswahili}
              wasTimed={wasTimed}
            />
          </Suspense>
      </>
  )
}