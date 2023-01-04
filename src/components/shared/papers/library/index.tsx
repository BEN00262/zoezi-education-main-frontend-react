import React,{useState, useEffect,Suspense} from 'react';
import { Container } from 'react-materialize';

import getLibraryPaper from './interface/fetchpaper'
import { ILibPaperQuestions } from './interface/ILibPaper';


const LibraryPaper:React.FC<{libraryRef: string}> = ({ libraryRef }) => {
  const [data,setData] = useState<ILibPaperQuestions | null>(null);


  useEffect(() => {
    fetchData(0);
  },[]);

  const fetchData = (operation = 1) => {
    getLibraryPaper(`/library/${libraryRef}`)
      .then(data => {
        setData(data);
      })
      .catch(error => {
          console.log(error);
          setData(null);
      })
  }

  const LazyQuestionComponent = React.lazy(() => import('./components/question_comp'));


  return (
        <>
          <Suspense fallback={
            <Container>
                Preparing paper ...
            </Container>
          }>
            {data && <LazyQuestionComponent paper={data} fetchData={fetchData}/>}
          </Suspense>
      </>
  )
}

export default LibraryPaper;