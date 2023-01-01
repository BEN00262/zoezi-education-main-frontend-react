import { useZoeziMainTrackedState } from "../../../../context";
import ContactUsComp from "./ContactUs";

const FooterComp = () => {
    const {
        isZoeziMobileApp, iszoeziDesktopApp
    } = useZoeziMainTrackedState()

    return (
        <>
            {
                isZoeziMobileApp || iszoeziDesktopApp ?
                <footer className="page-footer white" style={{ marginTop:40 }}></footer>
                    :
                <footer className="page-footer white">
                    <div className="footer-copyright">
                        {/* <% if (!login) { %>
                            <%- include('contactus') %>
                            <div className="divider"></div>
                        <% } %> */}
                        <div className="container">
                            <ContactUsComp/>
                            <div className="divider"></div>
                            <div className="row center black-text">
                                <p className="text-lighten-2">
                                    <small>
                                        <span><a href="/termsofuse">Terms of Use</a> and <a href="/privacynotice">Privacy Notice.</a></span>
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