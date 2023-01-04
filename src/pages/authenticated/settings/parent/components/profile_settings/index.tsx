const ParentProfileSettingsComp = () => {
    return (
        <div className="card z-depth-0" style={{ border: "1px solid #dcdee2" }}>

        <div className="card-content">
          <span className="card-title center"><b><small>PROFILE SETTINGS</small></b></span>
          <div>
            <div className="section">
    
              <div>
                <form /*onsubmit="EditMyProfile(event);"*/>
                  <div className="row">
                    <div className="col m6 s12">
                      <label htmlFor="first_name"><b>First Name</b></label>
                      <input id="first_name" name="firstname" type="text" className="validate" 
                        style={{
                            border: "1px solid #dcdee2",borderRadius:2,height:40,outline:0,boxSizing: "border-box",width: "100%",display: "flex",padding:6,
                        }} value="<%=user.firstname%>"/>
                    </div>
    
                    <div className="col m6 s12">
                      <label htmlFor="last_name"><b>Last Name</b></label>
    
                      <input id="last_name" name="lastname" type="text" className="validate"  
                        style={{
                            border: "1px solid #dcdee2",borderRadius:2,outline:0,boxSizing: "border-box",width: "100%",display: "flex",padding:6,height:40,
                        }} value="<%=user.lastname%>"/>
                    </div>
                  </div>
    
                  <div className="row">
                    <div className="col s12 m6">
                      <label htmlFor="mpesa_num"><b>Phone Number</b></label>
                      <input id="mpesa_num" name="mpesaNumber" type="text" className="validate"  style={{
                        border: "1px solid #dcdee2",borderRadius:2,outline:0,boxSizing: "border-box",width: "100%",display: "flex",padding:6,height:40,
                      }} value="<%=user.mpesaNumber%>"/>
                    </div>
                  
                    <div className="col s12 m6">
                      <label htmlFor="email"><b>Email</b></label>
                      <input id="email" name="email" type="email" className="validate"  style={{
                        border: "1px solid #dcdee2",borderRadius:2,outline:0,boxSizing: "border-box",width: "100%",display: "flex",padding:6,height:40,
                      }} value="<%=user.email%>"/>
                    </div>
                  </div>
    
                  <div id="passwordsedit" hidden>
    
                    <div className="row">
                      <div className="col m6 s12">
                        <label htmlFor="oldpassword"><b>Old Password</b></label>
                        <input id="oldpassword" name="oldpassword" type="text"  style={{
                            border: "1px solid #dcdee2",borderRadius:2,outline:0,boxSizing: "border-box",width: "100%",display: "flex",padding:6,height:40,
                        }} className="validate" value=""/>
                      </div>
                    
                      <div className="col m6 s12">
                        <label htmlFor="newpassword"><b>New Password</b></label>
                        <input id="newpassword" name="newpassword" type="text"   
                            style={{
                                border: "1px solid #dcdee2",borderRadius:2,outline:0,boxSizing: "border-box",width: "100%",display: "flex",padding:6,height:40,
                            }} className="validate" value=""/>
                      </div>
                    </div>
                  </div>
    
                  <div className="row">
                    <div className="col s12 m6">
                      <p>
                        <label>
                          <input type="checkbox" id="changePasswordToggle" /*onclick="ToggleChangePassword()"*//>
                          <span className="light sub-modal-texts">Change password</span>
                        </label>
                      </p>
                      <br className="show-on-small"/>
                    </div>
                    <div className="col s12 m6 center">
                      <button className="waves-effect waves-light btn-small z-depth-0 sub-modal-texts" type="submit" style={{ width: "100%" }}><b>Edit Profile</b></button>
                    </div>
                  </div>
    
                  
    
                  {/* <div className="input-field">
                    <input  type="hidden" name="_csrf" value="<%= csrftoken %>">
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
    
    )
}

export default ParentProfileSettingsComp;