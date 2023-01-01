import { useState } from "react"

interface IFAQContent {
    question: string
    answer: string
}

interface IFAQItem {
    category: string
    content: IFAQContent[]
}

const FAQComp: React.FC<IFAQContent> = (faq_content) => {
    const [is_hidden, setIsHidden ] = useState(true);
    
    return (
        <div style={{ marginLeft:5 }}>
            <h6 style={{ cursor: "pointer" }} onClick={_ => setIsHidden(old => !old)}>
                <span className="sub-modal-texts light-blue-text text-lighten-2" style={{ textTransform: "capitalize" }}>  
                    {faq_content.question}
                </span>
            </h6>
            <blockquote>
                <h6 hidden={is_hidden}>
                    <span className="sub-modal-texts" style={{ textTransform: "capitalize" }}>  
                        {faq_content.answer}
                    </span>
                </h6>
            </blockquote>
        </div>
    )
}

const FAQCategoryComp: React.FC<IFAQItem> = (faq_category) => {
    return (
        <div className="col s12 m4" style={{ marginBottom:10 }}>
            <h5>
                <u className="sub-modal-texts" style={{
                    textTransform: "capitalize",
                }}> {faq_category.category} </u>
            </h5>
            {
                faq_category.content.map((content, position) => 
                    <FAQComp key={`faq_content_${position}`} {...content}/>
                )
            }
        </div>
    )
}


const FAQPage = () => {
    const [faq_categories, setFaqCategories] = useState<IFAQItem[]>([]);

    return (
        <div className="container">
            <div className="section">
                <div className="row grey lighten-2"> 
                    <div className="col s12">
                    <h3><i className="mdi-content-send brown-text"></i></h3>
                    <h4 className="sub-modal-texts center teal-text text-lighten-1">Hello, how can we help you?</h4>
                    </div>

                    <div className="col s12">
                    <div className="row">
                        <div className="col s0 m2 hide-on-small-only"></div>

                        <div className="col s12 m8">
                            {/* <form method="post" className="z-depth-1" onsubmit="searchFAQ(event)"> */}
                            <form method="post" className="z-depth-1">
                                <div className="input-field col s12 m9">
                                    <input id="search" placeholder="Search for a question" className="white right-align" style={{
                                        border: "1px solid #dcdee2",
                                        borderRadius:2,
                                        outline:0,boxSizing: "border-box",
                                        height:40,
                                        width: "100%",display: "flex",padding:10,textAlign: "start",
                                    }} type="search" name="searchfaq" required/>
                                </div>
                                <div className="input-field col s12 m3 center">
                                    <button className="left-align btn" style={{
                                        width: "100%",borderRadius:2,
                                    }}>
                                        SEARCH
                                    </button>
                                </div>
                            </form>
                            <span className="sub-modal-texts center col s12">You can also browse the topics below to find what you are looking for</span>
                        </div>
                    </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col s12">
                        <h3><i className="mdi-content-send brown-text"></i></h3>
                        <h5 className="sub-modal-texts center"><u><b>Frequently Asked Questions</b></u></h5>
                    </div>

                    <div className="col s12">
                        <div>
                            {
                                faq_categories.map((category, position) => 
                                    <FAQCategoryComp key={`faq_category_${position}`} {...category}/>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FAQPage;