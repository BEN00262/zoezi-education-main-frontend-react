// @ts-ignore
import M from "materialize-css"
import { useEffect } from "react";

import PersonalSignInComp from "./components/personal";
import SchoolSignInComp from "./components/school";

const SignInPage = () => {
    useEffect(() => {
        M.Tabs.init(document.querySelector(".tabs"), {})
    }, [])
    

    return (
        <div className="container">
            <div className="section">

                <div className="row center">

                    <div className="col s12">
                        <h3><i className="mdi-content-send brown-text"></i></h3>
                        <h5 className="sub-names">Sign In</h5>
                    </div>

                    <div className="row">
                        <div className="col s12 m6 push-m3">
                            <ul className="tabs tabs-fixed-width">
                                <li className="tab col s6"><a className="active" href="#personal">Parent</a></li>
                                <li className="tab col s6"><a href="#school">School</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        {/* personal */}
                        <PersonalSignInComp/>

                        {/* school */}
                        <SchoolSignInComp/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage;