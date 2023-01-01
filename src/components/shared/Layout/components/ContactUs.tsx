const ContactUsComp = () => {
    return (
        <div className="row black-text ">

            <div className="col s12 m6 center grey lighten-2 section scrollspy" id="aboutussection">
                <h3><i className="mdi-content-send brown-text"></i></h3>
                <h4 className="sub-names">About Us</h4>
                <p className="light"><b>Zoezi Revision is a digital education content platform. We offer interactive revision materials (questions & answers, step-by-step Math solutions & notes) based on the Kenya curricula: Competence-Based Curriculum (CBC - Grade 1-5), 8-4-4 (ClassName 6 to 8), KCPE past & model papers, and Social & Emotional Learning (SEL) skills.
                </b></p>
            </div>

            <div className="col s12 m6 center section scrollspy" id="contactusparent">
                <div className="col s12 center">
                    <h3><i className="mdi-content-send brown-text"></i></h3>
                    <h4 className="sub-names">Talk to Us</h4>
                </div>
                <p className="light"><i className="im im-mail" style={{verticalAlign:-6,fontSize:20}}></i> <a href="mailto:ask@zoezi-education.com" style={{ color: "black" }}><b>ask@zoezi-education.com</b></a>
                <br/><i className="im im-mobile" style={{verticalAlign:-6,fontSize:20}}></i> <a href="tel:+254115815941" style={{ color: "black" }}><b>+254115815941</b></a></p>

                <a href="https://wa.me/254115815941" target="_blank" style={{
                        marginRight: "4px"
                    }}  rel="noreferrer"><img className="img-responsive" src="/img/socials/wa.svg" height="31" width="31"/></a>
                <a href="https://web.facebook.com/zoezi.platform" style={{
                        marginRight: "4px"
                    }}  target="_blank" rel="noreferrer"><img className="img-responsive" src="/img/socials/fb.svg" height="31" width="31"/></a>
                
                <a href="https://www.linkedin.com/in/zoezi-education-86a1951a9" target="_blank" style={{
                        marginRight: "4px"
                    }}  rel="noreferrer"><img className="img-responsive" src="/img/socials/ln.svg" height="31" width="31"/></a>
                <a href="https://twitter.com/Zoezi_Education?s=09" target="_blank" rel="noreferrer"><img className="img-responsive" src="/img/socials/tw.svg" height="31" width="31"/></a>
            </div>
        </div>
    )
}

export default ContactUsComp;