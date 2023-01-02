const SchoolSignInComp: React.FC<{
    handleSetCredentials:  (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleLogin: (e: React.SyntheticEvent) => void
}> = ({ handleLogin, handleSetCredentials }) => {
    return (
        <div className="col s12 m6 push-m3" id="school">
              {/* <%- include('partials/messages.ejs') %> */}
            <form className="contactustext" onSubmit={handleLogin}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="phoneNumber" type="text" onChange={handleSetCredentials}  className="validate contactustext" name="username_or_phone_number"/>
                        <label htmlFor="phoneNumber">Username ( Assigned by school )</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="password" onChange={handleSetCredentials} type="password" name="password" className="validate"/>
                        <label htmlFor="password">Login Password</label>
                    </div>
                </div>
                <button className="waves-effect waves-light btn sub-names materialize-red" style={{
                    width: "100%"
                }} type="submit">
                    <i className="material-icons">exit_to_app</i>
                </button>
            </form>
        </div>
    )
}

export default SchoolSignInComp;