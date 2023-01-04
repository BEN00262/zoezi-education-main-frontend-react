// @ts-ignore
import M from "materialize-css"
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useZoeziMainTrackedState } from "../../../context";
import { get_current_student } from "./api";
import PreferenceComp from "./components/preferences";
import ProfileSettingsComp from "./components/profile_settings";
import SubscriptionsComp from "./components/subscriptions";
import { IStudent } from "./types";

const SettingsPage = () => {
    const { isManagedContext, authToken } = useZoeziMainTrackedState();

    // fetch the student from the server and display them here
    const { data: student } = useQuery<IStudent>(['student', authToken], get_current_student, {
        enabled: !!authToken,
        staleTime: 120000
    });

    useEffect(() => {
        M.Tabs.init(document.querySelector(".tabs"), {})
    }, []);


    return (
        <div className="container">
       
            <div className="section">

                <div className="row">
                    <div className="col s12">
                        <ul className="tabs" style={{ overflowX: "hidden" }}>
                            <li className="tab col s6"><a className="active" href="#profile">Profile</a></li>
                            <li className={`tab ${isManagedContext ? 'disabled': ''} col s6`}><a  href="#subscriptions">Subscriptions</a></li>
                        </ul>
                    </div>
                    

                    <div id="profile">
                        <div className="col s12 m8">
                            <ProfileSettingsComp {...(student || {} as IStudent)}/>
                        </div>
            
                        <div className="col s12 m4">
                            <PreferenceComp {...(student || {} as IStudent)}/>
                        </div>
                    </div>
                    
                    {/* <!-- hide subscriptions for managed accounts --> */}
                    <div id="subscriptions">
                        <div className="col s12">
                        {
                            !isManagedContext ?
                                <SubscriptionsComp/>
                            : null
                        }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SettingsPage;