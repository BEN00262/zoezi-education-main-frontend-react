import { useState } from "react"

interface ISpecialPaper {
    color: string
    _id: string
    name: string
}

const SpecialPaper: React.FC<ISpecialPaper> = ({ color, _id, name }) => {
    return (
        <div className="col s6 m3 l2">
            <div className="card hoverable z-depth-1" style={{
                cursor: "pointer",backgroundColor: color,
            }} /*onclick="location.href='/special/categories/<%= gradeName %>/<%=secondTier[r]._id%>';"*/>
                <div className="center card-content">
                    <span className="sub-names truncate white-text">{name}s</span>
                </div>
            </div>
        </div>
    )
}

const SpecialPapersPage = () => {
    const [special_papers, setSpecialPapers] = useState<ISpecialPaper[]>([]);

    return (
        <div className="container">
            <div className="section">

                <div className="row">

                    <div className="col s12">
                        <h3 className="hide-on-small-only"><i className="mdi-content-send brown-text"></i></h3>
                        <h5 className="center sub-sub-headings">PAPERS</h5>
                        <div className="divider"></div>

                        {/* <!--pass all the available grades here--> */}
                        <div className="section">
                            <div className="row">

                                {
                                    special_papers.map((paper, position) => 
                                        <SpecialPaper {...paper} key={`special_paper_${position}`}/>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                        
    )
}

export default SpecialPapersPage;