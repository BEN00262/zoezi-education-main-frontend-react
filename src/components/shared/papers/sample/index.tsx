import React,{useState, useEffect,Suspense} from 'react';
import { Container } from 'react-materialize';
import { positions, Provider as AlertProvider } from 'react-alert';
// @ts-ignore
import AlertTemplate from 'react-alert-template-basic';

// import './App.css';
import DataLoader from './rendering_engine/DataLoader';
import HttpClientAxios from './rendering_engine/HttpClientAxios';
import DataLoaderInterface, { IQuestion } from './rendering_engine/DataLoaderInterface';

const dataLoader: DataLoaderInterface = new DataLoader(
    '/fetch_sample_questions',
    "sample-questions",
    new HttpClientAxios()
);

const LazyQuestionComponent = React.lazy(() => import('./components/question_comp'));

const options = {
    position: positions.MIDDLE,
    timeout:3000
}

export default function SamplePaperComp() {
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

  return (
    <AlertProvider template={AlertTemplate} {...options}>
        <Suspense fallback={
            <Container>
                Preparing paper ...
            </Container>
        }>
            <LazyQuestionComponent questions={data} fetchQuestions={fetchData}/>
        </Suspense>
    </AlertProvider>
  )
}