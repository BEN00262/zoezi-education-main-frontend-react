import { Link } from "react-router-dom";
import { useZoeziMainTrackedState } from "../../../../context";
import { useIsLoggedIn } from "../../../../hooks";
import ContactUsComp from "./ContactUs";

const FooterComp = () => {
    const {
        isZoeziMobileApp, iszoeziDesktopApp
    } = useZoeziMainTrackedState();

    const isLoggedIn = useIsLoggedIn()

    return (
        <>
            {
                isZoeziMobileApp || iszoeziDesktopApp ?
                <footer className="page-footer white" style={{ marginTop:40 }}></footer>
                    :
                <footer className="page-footer white">
                    <div className="footer-copyright">
                        <div className="container">
                            {
                                !isLoggedIn ?
                                <>
                                    <ContactUsComp/>
                                    <div className="divider"></div>
                                </> : null
                            }
                            <div className="row center black-text">
                                <p className="text-lighten-2">
                                    <small>
                                        <span><Link to="/terms-of-use">Terms of Use</Link> and <Link to="/privacy-notice">Privacy Notice.</Link></span>
                                        <br/>Copyright © {new Date().getFullYear()} Zoezi Education<br/>
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            }
        </>
    )
}

export default FooterComp;