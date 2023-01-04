import { useState } from "react";
import { IStudent } from "../../../types";


const SuspendedAccountsComp = () => {
    // fetch the students if none just display there isnt any student who has been suspended
    const [suspended_students, setsuspendedStudents] = useState<IStudent[]>([]);

    return (
        <>
            {
                suspended_students.length ?
                <>
                    {
                        suspended_students.map((child, position) => {
                            return (
                                <div className="col s12 m4" key={`suspended_student_${position}`}>
                                    <div
                                        className="hoverable z-depth-1" 
                                        style={{
                                            cursor: "pointer", border: "1px solid #d3d3d3",borderRadius:2,padding:5,
                                        }}
                                    >
                                        <div style={{ display: "flex",flexDirection: "row",alignItems: "center" }}>
                                            <img
                                                style={{ height:100,width:100,objectFit: "contain",border: "1px solid #d3d3d3",borderRadius: "50%" }} 
                                                src={child.profilePic || '/img/default-profile.png'}
                                            />
                    
                                            <ul style={{ paddingLeft:20 }}>
                                                <li><span style={{ letterSpacing:1 }}><b>{child.firstname} {child.lastname}</b></span></li>
                                                <li className="sub-modal-texts">{child.school}</li>
                                                <li className="sub-modal-texts">Grade {child.grade}</li>
                                                <li className="sub-modal-texts materialize-red-text"><b>{child.timeRemaining} days remaining</b></li>

                                                {/* send a post request to the server at this point */}
                                                <li>
                                                    <a href="/recover-suspended-account/<%=child._id.toString()%>" className="waves-effect waves-light btn-small">recover</a>
                                                </li>
                                            </ul>
                                        
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
                :
                <div className="col s12 center">
                    <p className="sub-names">There are no suspended accounts</p>
                </div>
            }
        </>
    );
}

export default SuspendedAccountsComp;