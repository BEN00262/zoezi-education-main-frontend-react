// @ts-ignore
import M from "materialize-css"
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { login } from "./api";

import PersonalSignInComp from "./components/personal";
import SchoolSignInComp from "./components/school";
import { ICredentials } from "./types";

const SignInPage = () => {
    useEffect(() => {
        M.Tabs.init(document.querySelector(".tabs"), {})
    }, []);

    const [credentials, setCredentials] = useState<ICredentials>({
        username_or_phone_number: "",
        password: ""
    });

    const handleSetCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(old => ({
            ...old,
            [e.target.name]: e.target.value
        }))
    }

    const login_mutation = useMutation((credentials: ICredentials) => login(credentials), {

    });

    const handleLogin = (e: React.SyntheticEvent) => {
        e.preventDefault()
        login_mutation.mutate(credentials)
    }
    

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
                        <PersonalSignInComp handleSetCredentials={handleSetCredentials} handleLogin={handleLogin}/>

                        {/* school */}
                        <SchoolSignInComp handleSetCredentials={handleSetCredentials} handleLogin={handleLogin}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage;