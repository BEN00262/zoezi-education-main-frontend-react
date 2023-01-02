import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC<{ code: number, message: string }> = ({ code, message }) => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="section">
                <div className="row center">
                    <h1 className="sub-headings" style={{ fontSize:100 }}>Oops!</h1>
                    <p className="contactustext">
                        <h5><b>{code}</b> | <span style={{ fontSize:16 }}>{message}</span></h5>
                    </p>
                    <button className="waves-effect waves-light btn materialize-red z-depth-1" onClick={_ => {
                        navigate(-1) // go back to the previous page
                    }}>
                        <b>GOTO HOMEPAGE</b>
                    </button>
                </div>
            
            </div>
        </div>
    )
}

export default ErrorPage;