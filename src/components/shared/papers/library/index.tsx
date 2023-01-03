import React,{useState, useEffect,Suspense} from 'react';
import { Container } from 'react-materialize';

import './App.css';

import getLibraryPaper from './interface/fetchpaper'
import { ILibPaperQuestions } from './interface/ILibPaper';

// 611767dfc6f97c3e969b4f75 normal lib paper
// 6103c4e73935831c0ca2609a comprehension lib paper
// 6103ec3c4c5cd74b84f86ffc
// const baseURL = 'http://localhost:3600/library/sample/';

// get all ids in the given 
// clicked-id: id
// prev_ids:
// next_id:
const paperID = localStorage.getItem('paperID');
const navigation = localStorage.getItem('navigation')?.split(",");

// const paperID = "611767dfc6f97c3e969b4f75";
// const navigation = ["611767dfc6f97c3e969b4f75","6103ec3c4c5cd74b84f86ffc"];

const baseURL = `/library/`;

export default function App() {
  const [data,setData] = useState<ILibPaperQuestions | null>(null);
  const [swipablePaperIDs, setSwipablePaperIDs] = useState<string[]>(navigation || []);
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState<number>(navigation?.findIndex(x => x === paperID) || 0);


  useEffect(() => {
    fetchData(0);
  },[]);

  const fetchData = (operation = 1) => {
    let indexToFetch = currentSwipeIndex + operation;

    indexToFetch = !indexToFetch ? 0 : indexToFetch < 0 ? (swipablePaperIDs.length - 1) : (indexToFetch % swipablePaperIDs.length);

    getLibraryPaper(`${baseURL}${swipablePaperIDs[indexToFetch]}`)
      .then(data => {
        setData(data);
        setCurrentSwipeIndex(indexToFetch);
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