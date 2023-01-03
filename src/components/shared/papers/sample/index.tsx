import React,{useState, useEffect,Suspense} from 'react';
import { Container } from 'react-materialize';

import './App.css';
import DataLoader from './rendering_engine/DataLoader';
import HttpClientAxios from './rendering_engine/HttpClientAxios';
import DataLoaderInterface, { IQuestion } from './rendering_engine/DataLoaderInterface';

// replace this on the actual zoezi paper
// const gradeName = document.getElementById("gradeName")?.innerText;
// const subjectID = document.getElementById("subjectID")?.innerText;

// const baseURL = `/grade-questions/${gradeName}/${subjectID}`;
const baseURL = '/fetch_sample_questions'
// const baseURL = 'http://localhost:3600/questions';
const dataLoader: DataLoaderInterface = new DataLoader(
  baseURL,
  // "nothing",
  "sample-questions",//subjectID || 'undefined',
  new HttpClientAxios()
);

export default function App() {
  const [data,setData] = useState<IQuestion[]>([]);

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = () => {
    dataLoader.getQuestions(5)
      .subscribe({
          next(x:IQuestion[]){
              setData(x);
          },
          error(err:Error){
              console.log(err);
          }
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
            <LazyQuestionComponent questions={data} fetchQuestions={fetchData}/>
          </Suspense>
      </>
  )
}