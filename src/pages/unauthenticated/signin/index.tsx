// @ts-ignore
import M from "materialize-css"
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { handle_login_dispatch, useZoeziMainDispatch } from "../../../context";
import { login } from "./api";

import { ICredentials, ILoginResult } from "./types";

const SignInFormComp: React.FC<{
    handleSetCredentials:  (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleLogin: (e: React.SyntheticEvent) => void,
    username_or_phone_number: string,
    reference_id: string
}> = ({ handleLogin, handleSetCredentials, username_or_phone_number, reference_id }) => {
    return (
        <div className="col s12 m6 push-m3" id={reference_id}>
              {/* <%- include('partials/messages.ejs') %> */}
            <form className="contactustext" onSubmit={handleLogin}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="personal_phoneNumber" type="text"  onChange={handleSetCredentials}  className="validate contactustext" name="username_or_phone_number"/>
                        <label htmlFor="personal_phoneNumber">{username_or_phone_number}</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="personal_password" type="password" onChange={handleSetCredentials} name="password" className="validate"/>
                        <label htmlFor="personal_password">Login Password</label>
                    </div>
                </div>
                <button className="waves-effect waves-light btn sub-names materialize-red" style={{
                    width: "100%"
                }} type="submit">
                    <i className="material-icons">exit_to_app</i>
                </button>
                <p className="sub-modal-texts"><b>Don't have an account? <a href="/users/register">Register</a></b><br/><a href="/recovery">Forgot your Password?</a></p>
            </form>
        </div>
    )
}

const SignInPage = () => {
    const navigate = useNavigate();
    const ZoeziMainDispatch = useZoeziMainDispatch();

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
        onSuccess(data: ILoginResult, variables, context) {
            // set the login data :)
            handle_login_dispatch(
                ZoeziMainDispatch, data.authToken
            );

            navigate('/dashboard', {
                replace: true
            })
        },

        onError(error: Error, variables, context) {
            console.log(error);
        },
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
                        <SignInFormComp 
                            handleSetCredentials={handleSetCredentials} 
                            handleLogin={handleLogin} 
                            username_or_phone_number="Phone Number"
                            reference_id="personal"
                        />

                        {/* school */}
                        <SignInFormComp 
                            handleSetCredentials={handleSetCredentials} 
                            handleLogin={handleLogin} 
                            username_or_phone_number="Username ( Assigned by school )"
                            reference_id="school"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage;