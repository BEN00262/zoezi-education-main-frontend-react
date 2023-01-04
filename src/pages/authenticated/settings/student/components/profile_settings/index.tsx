import { Link } from "react-router-dom";
import { useZoeziMainTrackedState } from "../../../../../../context";
import { IStudent } from "../../../types";

const ProfileSettingsComp: React.FC<IStudent> = (student) => {
    const { isManagedContext } = useZoeziMainTrackedState();

    // we will get the student :)


    return (
        <div className="card z-depth-0" style={{ border: "1px solid #dcdee2" }}>

            <div className="card-content">
            <span className="card-title center"><b><small>PROFILE SETTINGS</small></b></span>
            <div>
                <div className="section">

                <div>
                    
                    {/* <!-- send using ajax create a simple stuff to do this --> */}
                    <form /*onsubmit="EditStudentProfile(event);"*/ className="contactustext" method="POST" encType="multipart/form-data">
                        <div className="row center">
                            {/* <!-- profile pic upload place --> */}
                            <div className="input-field">
                                <div style={{ position: "relative",width:250,margin: "auto" }}>
                                    <img 
                                        id="profile-pic-preview"
                                        style={{ filter: "brightness(50%)",height:200,width:200,objectFit: "contain",borderRadius: "50%" }}
                                        src={student.profilePic || '/img/default-profile.png'}/>
                                
                                    <div style={{ position: "absolute",bottom:85,right:50 }}>
                                        <label
                                            htmlFor="profile-pic-upload" 
                                            id="profile-pic-label2" 
                                            className="sub-modal-texts btn-small waves-effect waves-light"
                                        ><i className="material-icons left">camera_alt</i>profile picture</label>
                                        <input type="file" name="profilePic" id="profile-pic-upload" accept="image/*" style={{ display: "none" }} /*onchange="showPreview(event);"*//> 
                                    </div>
                                </div>
                            </div>

                            {/* <!-- end of profile pic upload place -->
                            <!-- you cant update the name, current school or current grade for managed accounts and also the gender --> */}
                            <div className="input-field col s6">
                                <input disabled={isManagedContext}  id="first_name" name="firstname" type="text" value={student.firstname} className="validate contactustext"/>
                                <label htmlFor="first_name">First Name</label>
                            </div>

                            <div className="input-field col s6">
                                <input disabled={isManagedContext}  id="last_name" name="lastname" type="text" value={student.lastname} className="validate contactustext"/>
                                <label htmlFor="last_name">Last Name</label>
                            </div>

                            <div className="input-field col s12 m6">
                                <input disabled={isManagedContext}  id="grade_id" name="grade" type="text" value={student.grade} className="validate contactustext"/>
                                <label htmlFor="grade_id">Current Grade / ClassName</label>
                            </div>

                            <div className="input-field col s12 m6">
                                <input disabled={isManagedContext}  id="school_id" name="school" type="text" value={student.school} className="validate contactustext"/>
                                <label htmlFor="school_id">Current School</label>
                                <span className="helper-text left-align" data-error="wrong" data-success="right">Enter the full name of the school</span>
                            </div>

                            <div className="input-field col s12 m12">
                                Select Gender
                                <p>
                                    <label>
                                    <input disabled={isManagedContext} className="with-gap" name="gender" type="radio" value="boy" checked={student.gender === 'boy'}/>
                                    <span>Boy</span>
                                    </label>

                                    <label>
                                        <input disabled={isManagedContext} className="with-gap" name="gender" value="girl" type="radio" checked={student.gender === 'girl'}/>
                                        <span>Girl</span>
                                    </label>
                                </p>
                            </div>

                        </div>

                        {/* <div className="input-field">
                             <input type="hidden" name="_csrf" value="<%= csrftoken %>"/>
                         </div> */}

                        <button className="waves-effect waves-light btn-small materialize-red sub-modal-texts" style={{ width: "100%" }} type="submit">Edit Profile</button>
                        <Link hidden={isManagedContext} to="/delete" className="waves-effect waves-light btn-small white black-text sub-modal-texts" style={{
                            width: "100%",border: "1px solid #d32f2f",marginTop:5
                        }} type="button">Delete Account</Link>
                    </form>

                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default ProfileSettingsComp;