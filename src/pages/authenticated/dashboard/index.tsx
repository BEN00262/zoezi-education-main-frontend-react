import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useZoeziMainTrackedState } from "../../../context";
import GreetingsComp from "./components/greetings";

interface IDashboardBaseContent {
    _id: string
    logo?: string // will make the change on the backend
    available: boolean
    subscribed: boolean
}

interface IDashboardGrade extends IDashboardBaseContent {
    grade: string
}

interface IDashboardSpecialPaper extends IDashboardBaseContent {
    name: string
}

const DashboardSampleGrade = () => {
    return (
        <div className="card hoverable z-depth-1" style={{ cursor: "pointer" }}  /*onclick="getSampleQuestions()"*/>
            <div className="card-image">
                <img className="img-box-responsive" src="img/sample.png"/>
            </div>
            <div className="row center card-content">
                <div className="center">
                    <button className="waves-effect waves-light btn materialize-red z-depth-0" style={{
                        borderRadius:20,paddingLeft:30,paddingRight:30,
                    }}>
                        <small>
                            <b>Try Sample</b>
                        </small>
                    </button>
                </div>
            </div>
        </div>
    )
}


const DashboardGradeCard: React.FC<{
    content: IDashboardGrade | IDashboardSpecialPaper,
    is_special: boolean
}> = ({ content, is_special }) => {
    const navigate = useNavigate();

    // used to convert to a given data details to fetch the required data
    const details: { name: string, link: string } = useMemo(() => {

        if (is_special) {
            const local_content = content as IDashboardSpecialPaper;

            return {
                name: local_content.name,
                link: local_content.subscribed ? `/special/${local_content._id}` : `/subscription_payments/${local_content.name}/${local_content._id}/true`
            }
        }

        const local_content = content as IDashboardGrade;

        return { 
            name: local_content.grade, 
            link: local_content.subscribed ? `/subjects/${local_content._id}` : `/subscription_payments/${local_content.grade}/${local_content._id}`
        }
    }, [is_special, content]);

    if (!is_special && (content as IDashboardGrade).grade?.toLowerCase()?.includes("sample")) {
        return <DashboardSampleGrade/>
    }


    return (
        <div className="card hoverable z-depth-1" style={{ cursor: "pointer" }} onClick={_ => {
            // find the place to head and do the stuff
            navigate(details.link)
        }}>

            <div className="card-image">
                <img className="img-box-responsive" src={`img/${details.name.toLowerCase()}.png`}/>
            </div>

            <div className="row center card-content">
                {
                    content.available ?
                    <button className={`waves-effect waves-light center btn z-depth-0 ${content.subscribed ? "materialize-red" : ""}`} style={{
                        borderRadius:20,paddingLeft:30,paddingRight:30
                    }}>
                        <small>
                            <b>{content.subscribed ? "OPEN" : "UNLOCK"}</b>
                        </small>
                    </button>
                    :
                    <button className="waves-effect waves-light btn center z-depth-0 materialize-red" style={{
                        borderRadius:20,paddingLeft:30,paddingRight:30
                    }}>
                        <small><b>COMING</b></small>
                    </button>
                }
            </div>
        </div>
    )
}


interface IDashboardData {
    grades: IDashboardGrade[]
    special_papers: IDashboardSpecialPaper[]
}

const DashboardPage = () => {
    const { isManagedContext } = useZoeziMainTrackedState();

    // fetched during page load ( on mount )
    const [dashboard_content, setDashboardContent] = useState<IDashboardData>({
        grades: [],
        special_papers: []
    });

    // check if the account is managed and has no open papers
    const is_managed_with_no_bought_content = useMemo(() => {
        return isManagedContext && !dashboard_content.grades.length && !dashboard_content.special_papers.length;
    }, [isManagedContext, dashboard_content]);

    return (
        <div className="container ">
            <div className="section">

                <div>
                    <GreetingsComp/>
                    <h3 className="hide-on-small-only"><i className="mdi-content-send brown-text"></i></h3>
                    <h5 className="center sub-sub-headings">GRADES</h5>
                    <div className="divider"></div>


                    {/* can be used to pass info about the system ( we will build a proper system though ) */}
                    <div className="section">
                        <div className="row">
                            {
                                is_managed_with_no_bought_content ?
                                    <div className="row center">
                                        <div className="col s12">
                                            <img className="img-responsive" src="img/empty-subscriptions-school.png" height="200px" />
                                            <p className="sub-names">Sorry, grade not active. Contact your class teacher</p>
                                        </div>
                                    </div>
                                :

                                <div className="col s6 m3 l2">
                                    {/* mash the two data points and then display them yeah */}
                                    {
                                        [
                                            // v1 content
                                            ...dashboard_content.grades.map(x => ({is_special: false, content: x })),

                                            // v2 content
                                            ...dashboard_content.special_papers.map(x => ({is_special: true, content: x }))  
                                        ].map((content, position) => 
                                            <DashboardGradeCard {...content}  key={`grade_${position}`}/>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardPage