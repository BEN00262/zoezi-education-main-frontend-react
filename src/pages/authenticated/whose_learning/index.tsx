import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";


import { handle_login_dispatch, useZoeziMainDispatch, useZoeziMainTrackedState } from "../../../context";
import { get_children_within_account, switch_to_selected_student_context } from "./api";
import { IChild } from "./types";

const ChildComp: React.FC<{ child: IChild }> = ({ child }) => {
    const navigate = useNavigate();
    const zoeziMainDispatch = useZoeziMainDispatch();

    // choose the learner and then redirect to the previously clicked link
    const redirect_to_previously_clicked_link = (student_reference: string) => {
        // make the request to the server
        switch_to_selected_student_context(student_reference)
            .then((authToken: string | null) => {
                // reset the authToken

                if (authToken) {
                    // only if we have a token
                    handle_login_dispatch(
                        zoeziMainDispatch,
                        authToken
                    )
                }
        
                // TODO: respect the previous link clicked by the user
                // question is what if we dont have anything on the navigation stack ?
                navigate(/* -1 */"/dashboard");
            })
    }

    return (
        <div className="col s12 m4">
            <div 
                onClick={_ => redirect_to_previously_clicked_link(child._id)}
                // onclick="window.location.href='/who-is-learning/<%=child._id.toString()%>/?destination=<%=original_url%>'"
                className="hoverable z-depth-1" 
                style={{
                    cursor: "pointer", border: "1px solid #d3d3d3",borderRadius:2,padding:5,marginBottom:10,
                }}>
                <div style={{ display: "flex",flexDirection: "row",alignItems: "center" }}>
                <img
                    style={{
                        height:100,width:100,objectFit: "contain",border: "1px solid #d3d3d3",borderRadius: "50%",
                    }} 
                    src={child.profilePic || '/img/default-profile.png'}
                />

                <ul style={{ paddingLeft:20 }}>
                    <li><span style={{ letterSpacing:1 }}><b>{child.firstname} {child.lastname}</b></span></li>
                    <li className="sub-modal-texts">{child.school}</li>
                    <li className="sub-modal-texts">Grade {child.grade}</li>
                    <li className="sub-modal-texts">Last active: {child.lastActive}</li>
                </ul>
                
                </div>
            </div>
        </div>
    )
}

const ChildSkeletonComp = () => {
    return (
        <div className="col s12 m4">
            <div
                className="hoverable z-depth-1" 
                style={{
                    cursor: "pointer", border: "1px solid #d3d3d3",borderRadius:2,padding:5,marginBottom:10,
                }}>
                <div style={{ display: "flex",flexDirection: "row",alignItems: "center" }}>
                <Skeleton circle height={100} width={100}/>

                <ul style={{ paddingLeft:20 }}>
                    <li><span style={{ letterSpacing:1 }}><b><Skeleton inline/> <Skeleton inline/></b></span></li>
                    <li className="sub-modal-texts"><Skeleton inline width={150}/></li>
                    <li className="sub-modal-texts"><Skeleton inline/></li>
                    <li className="sub-modal-texts"><Skeleton inline/></li>
                </ul>
                
                </div>
            </div>
        </div>
    )
}

const WhoseLearningPage = () => {
    const { isZoeziMobileApp } = useZoeziMainTrackedState();

    // const [children, setChildren] = useState<IChild[]>([]);

    const {data: children, isLoading } = useQuery<IChild[]>('whose-is-learning', get_children_within_account, {
        staleTime: 1200000
    })

    return (
        <div className="container">
            <div className="section">
        
                <div className="row center">
        
                    <div className="col s12">
                        <h2><i className="mdi-content-send brown-text"></i></h2>
                        <h5 className="welcome-font materialize-red-text"><span className="teal-text">Karibu John,</span> Who is learning today?</h5>
                    </div>

                    <a className="btn-small waves-effect waves-light" href="/new-learner" style={{
                        position: "fixed",
                        bottom: isZoeziMobileApp ? "65px" : "40px",
                        right:20,
                    }}>Add Learner
                        <i className="material-icons right">person_add</i>
                    </a>

                    <div className="row">
                        {
                            isLoading ?
                            <>
                                {
                                    (new Array(3).fill(1)).map((_, position) => {
                                        return <ChildSkeletonComp key={`skeleton_child_${position}`}/>
                                    })
                                }
                            </>
                            :
                            <>
                                {
                                    children?.length ?
                                    <>
                                        {
                                            children?.map((child, position) => {
                                                return <ChildComp child={child} key={`child_${position}`}/>
                                            })
                                        }
                                    </>
                                    :
                                    <div className="col s12 center" style={{ marginTop: "80px"}}>
                                        <img className="img-responsive" src="img/welcome-emoji.png" style={{ height:150 }} />
                                        <p className="sub-modal-texts">Welcome to ZOEZI parent account. Please add your child/children (learner)</p>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhoseLearningPage;