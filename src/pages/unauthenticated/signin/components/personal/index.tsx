const PersonalSignInComp: React.FC<{
    handleSetCredentials:  (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleLogin: (e: React.SyntheticEvent) => void
}> = ({ handleLogin, handleSetCredentials }) => {
    return (
        <div className="col s12 m6 push-m3" id="personal">
              {/* <%- include('partials/messages.ejs') %> */}
            <form className="contactustext" onSubmit={handleLogin}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="personal_phoneNumber" type="text"  onChange={handleSetCredentials}  className="validate contactustext" name="username_or_phone_number"/>
                        <label htmlFor="personal_phoneNumber">Phone Number</label>
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

export default PersonalSignInComp;