// @ts-ignore
import M from 'materialize-css';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpecialPaperLibraryComp from '../../shared/papers/main/library';

const AnalyticsCompSusp = React.lazy(() => import("./components/compound/AnalyticsComp"));

const StudyBuddiesComp = () => {
    const { gradeName, category, paperID, savedStateID } = useParams();

  useEffect(() => {
    M.Tabs.init(document.querySelector(".tabs"), {});
  }, [])
  
  return (
    <div className="container">
      <div className="section">

        <div className="row center">
            <div className="col s12">
                <h3><i className="mdi-content-send brown-text"></i></h3>
                <h5 className="sub-names">Shared by: John Kerama</h5>
                <h6 className="sub-modal-texts">{(new Date()).toUTCString()}</h6>
                <h6 className="sub-modal-texts"><b><i>https://www.zoez-education.com/study-buddies/saoffd</i></b></h6>
            </div>
        </div>

        <div className="row">
            <div className="col s12">
                <ul className="tabs tabs-fixed-width">
                <li className="tab col s3"><a className="active" href="#analytics">Ranking</a></li>
                <li className="tab col s3"><a href="#mypaper">My Paper</a></li>
                </ul>
            </div>
        </div>

        <div className="row">
            <div id="analytics" className="col s12">
                <React.Suspense fallback={<>loading...</>}>
                <AnalyticsCompSusp/>
                </React.Suspense>
            </div>
            <div id="mypaper" className="col s12">
                {
                    savedStateID ?
                    <SpecialPaperLibraryComp 
                        savedStateID={savedStateID}
                        category={category ?? ""}
                        gradeName={gradeName ?? ""}
                        paperID={paperID ?? ""}
                    />
                    :
                    null
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default StudyBuddiesComp;