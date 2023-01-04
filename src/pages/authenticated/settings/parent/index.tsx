// @ts-ignore
import M from "materialize-css"
import { useEffect } from "react";
import ParentProfileSettingsComp from "./components/profile_settings";
import SuspendedAccountsComp from "./components/suspended_accounts";


const ParentSettingsPage = () => {

    useEffect(() => {
        M.Tabs.init(document.querySelector(".tabs"), {})
    }, []);

    return (
        <div className="container">
       
      <div className="section">

        <div className="row">

          <div className="col s12">
            <ul className="tabs tabs-fixed-width" style={{ overflowX: "hidden" }}>
              <li className="tab col s6"><a className="active" href="#profile">Profile</a></li>
              <li className="tab col s6"><a  href="#suspended">Suspended Accounts</a></li>
            </ul>
          </div>
          

          <div id="profile">
            <div className="col s12 m8 push-m2">
              {/* <%- include('profilesettings') %> */}
              <ParentProfileSettingsComp/>
            </div>
          </div>
        
          <div id="suspended">
            <div className="col s12">
              {/* <!-- suspended accounts recovery --> */}
              <div className="section">
                <div className="row">
                    <SuspendedAccountsComp/>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    );
}

export default ParentSettingsPage;