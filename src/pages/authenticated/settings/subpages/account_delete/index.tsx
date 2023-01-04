import { Link } from "react-router-dom";

const AccountDeletePage = () => {
    // send the delete request to the server

    return (
        <main style={{
            display: "flex",justifyContent: "center",alignItems: "center",
        }}>
            <div className="container">
                <div className="section">
                    <div className="row center">
                        <img className="img-responsive" src="/img/sad-remove.png" height="200px" />
                        <p>Are you sure you want to delete the account? Deleted account will be recoverable within 30 days</p>
                        <Link to="/student-edit-profile" className="waves-effect waves-light btn-small materialize-red">Cancel</Link>
                        <Link to="/delete/confirmed" className="waves-effect waves-light btn-small white black-text" style={{
                            border: "1px solid #d32f2f",
                            marginLeft: "5px"
                        }}>Proceed</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AccountDeletePage;