// @ts-ignore
import M from "materialize-css"
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { get_study_buddies_participations } from "./api";

interface IShares {
    gradeName: string
    subject: string
    fullname: string
    // slug: string
    paperID: string
    _id: string
    category: string
    studyBuddyReference: string
}

const MySharesMyFriendsComp: React.FC<{
    shares: IShares[]
}> = ({shares}) => {
    const navigate = useNavigate();

    return (
        <>
        {
            shares.length ?
            <>
                {
                    shares.map((share, position) => {
                        return (
                            <div className="col s6 m3 l2" key={`shares_${position}`}>
                                <div className="card hoverable z-depth-1" 
                                    style={{ cursor: "pointer" }}
                                    onClick = {_ => navigate(`/study-buddies/${share.gradeName}/${share.category}/${share.paperID}/${share._id}/${share.studyBuddyReference}`)}
                                >
                                    <div className="card-image">
                                        <img className="img-box-responsive" src={`/img/${share.gradeName}_special/${share.subject.toLowerCase().split(' ')[0]}.png`}/>
                                    </div>
                                    <div className="center card-content">
                                        <span className="sub-names truncate">{share.fullname}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </>
            :
            <div className="col s12 center">
                <img src="/img/not-found.svg" style={{ height:200,width: "auto",objectFit: "contain" }} className="img-responsive" alt="not found image"/>
                <p>No paper(s) found</p>
            </div>
        }
        </>
    );
}


const StudyParticipationPage = () => {
    useEffect(() => {
        M.Tabs.init(document.querySelector(".tabs"), {})
    }, []);


    const { data } = useQuery<{
        myPapers: IShares[]
        myFriends: IShares[]
    }>('study-buddies-participation', get_study_buddies_participations, {
        staleTime: 60000
    })

    return (
        <div className="container">
            <div className="section">

                <div className="row">

                    <div className="col s12">
                        <h3 className="hide-on-small-only"><i className="mdi-content-send brown-text"></i></h3>
                        <h5 className="center sub-sub-headings">STUDY BUDDIES</h5>
                        <div className="divider"></div>

                        {/* <!--pass all the available grades here--> */}
                        <div className="section">
                            <div className="row">
                                <div className="col s12">
                                <ul className="tabs tabs-fixed-width" style={{ overflowX: "hidden" }}>
                                    <li className="tab col s3"><a className="active" href="#myshares">My share(s)</a></li>
                                    <li className="tab col s3"><a href="#donepapers">Done Paper(s)</a></li>
                                </ul>
                                </div>
                            </div>

                            <div className="row" id="myshares">
                                <MySharesMyFriendsComp shares={data?.myPapers || []}/>
                            </div>

                            <div id="donepapers" className="row">
                                <MySharesMyFriendsComp shares={data?.myFriends || []}/>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default StudyParticipationPage;