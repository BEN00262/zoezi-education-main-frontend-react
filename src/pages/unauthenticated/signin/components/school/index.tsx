const SchoolSignInComp = () => {
    return (
        <div className="col s12 m6 push-m3" id="school">
              {/* <%- include('partials/messages.ejs') %> */}
            <form className="contactustext" action="/users/school-login" method="POST">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="phoneNumber" type="text"  className="validate contactustext" name="mpesaNumber"/>
                        <label htmlFor="phoneNumber">Username ( Assigned by school )</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="password" type="password" name="password" className="validate"/>
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