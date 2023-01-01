import { useState } from "react";
import { useParams } from "react-router-dom";

interface ISpecialSubject {
    subject: string // name of the subject
    _id: string
}

const SubjectComp: React.FC<{
    subject: ISpecialSubject, grade_name: string, 
    second_tier?: string, category_name: string 
}> = ({ subject: {subject, _id}, grade_name, category_name, second_tier }) => {
    return (
        <div className="col s6 m3 l2">
            <div className="card hoverable z-depth-1" style={{ cursor: "pointer" }} /*onclick="location.href='/special/paper/<%=gradeName%>/<%=secondTier%>/<%=category%>/<%=subjects[r]._id%>';"*/>
                <div className="card-image">
                    <img className="img-box-responsive" src={`img/${grade_name}/<%= ${subject.toLowerCase().split(" ")[0]}.png`}/>
                </div>
                <div className="center card-content">
                    <span className="sub-names truncate">{subject}</span>
                </div>
            </div>
        </div>
    )
} 

const SpecialPaperSubjectsPage = () => {
    const { grades_reference_id, grade_name, category_name,  } = useParams();
    const [subjects, setSubjects] = useState<ISpecialSubject[]>([]);

    // fetch the subjects and then display them ( that easy )

    return (
        <div className="container">

            <div className="section">

                <div className="row">

                    <div className="col s12">
                        <h3 className="hide-on-small-only"><i className="mdi-content-send brown-text"></i></h3>
                        <h5 className="center sub-sub-headings">SUBJECTS</h5>
                        <div className="divider"></div>

                        {/* <!--pass all the available subjects here--> */}
                        <div className="section">
                            <div className="row">
                                {
                                    subjects.map((subject, position) => 
                                        <SubjectComp 
                                            key={`subject_${position}`} 
                                            subject={subject} 
                                            grade_name={grade_name ?? ""} 
                                            category_name={category_name ?? ""}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SpecialPaperSubjectsPage;