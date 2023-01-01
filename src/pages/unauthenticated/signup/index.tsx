const SignUpPage = () => {
    return (
        <div className="container">
            <div className="section">

                <div className="row center">

                    <div className="col s12">
                        <h3><i className="mdi-content-send brown-text"></i></h3>
                        <h5 className="sub-names">Sign Up</h5>
                    </div>

                    <div className="col s12 l8 push-l2">
                        {/* <%- include('partials/messages.ejs') %> */}

                            <form action="/users/register" className="contactustext" method="POST">
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="first_name" name="firstname" type="text" className="validate contactustext"/>
                                        <label htmlFor="first_name">First Name</label>
                                        <span className="helper-text left-align" data-error="wrong" data-success="right">Parent / Guardian</span>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="last_name" name="lastname" type="text" className="validate contactustext"/>
                                        <label htmlFor="last_name">Last Name</label>
                                        <span className="helper-text left-align" data-error="wrong" data-success="right">Parent / Guardian</span>
                                    </div>

                                    <div className="input-field col s12 m6">
                                        <input id="mpesa_num" name="mpesaNumber" type="text" className="validate contactustext"/>
                                        <label htmlFor="mpesa_num">Phone Number</label>
                                        <span className="helper-text left-align" data-error="wrong" data-success="right">Use a valid Safaricom phone number</span>
                                    </div>

                                    <div className="input-field col s12 m6">
                                        <input id="email" name="email" type="email" className="validate contactustext"/>
                                        <label htmlFor="email">Email</label>
                                        <span className="helper-text left-align" data-error="wrong" data-success="right">Optional ( required for Authors )</span>
                                    </div>

                                    <div className="input-field col s12 m6">
                                        <input id="password" name="password" type="password" className="validate"/>
                                        <label htmlFor="password">Password</label>
                                        <span className="helper-text left-align" data-error="wrong" data-success="right">Minimum 8 characters</span>
                                    </div>

                                    <div className="input-field col s12 m6">
                                        <input id="confirmpassword" name="password2" type="password" className="validate"/>
                                        <label htmlFor="confirmpassword">Confirm Password</label>
                                    </div>
                                </div>

                                {/* <div className="input-field">
                                    <input type="hidden" name="_csrf" value="<%= csrftoken %>"/>
                                </div> */}

                                {/* <div className="input-field">
                                    <input type="hidden" name="referral_link" value="<%= referral_link %>"/>
                                </div> */}

                                <p className="sub-modal-texts"><small>By creating an account, you agree to Zoezi <a href="/termsofuse">Terms of Use</a> and <a href="/privacynotice">Privacy Notice.</a></small></p>

                                <button className="waves-effect waves-light btn sub-names materialize-red" /*onclick="loaderOverlay();"*/ style={{ width: "40%" }} type="submit">REGISTER</button>

                                <p className="sub-modal-texts"><b>Already have an account?<a href="/users/login"> Login</a></b></p>
                            </form>
                            {/* <div className="loader loader-default" id="loaderoverlay" data-half></div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;