import { useState } from "react"
import { useParams } from "react-router-dom"

interface ISpecialPaperCategory {
    color: string
    _id: string
    name: string
}

const SpecialPaperCategory: React.FC<ISpecialPaperCategory> = ({ color, _id, name }) => {
    return (
        <div className="col s6 m3 l2">
            <div className="card hoverable z-depth-1" style={{
                cursor: "pointer",backgroundColor: color,
            }} /*onclick="location.href='/special/subjects/<%= gradeName %>/<%=secondTierName%>/<%=midTier[r]._id%>';"*/>
                <div className="center card-content">
                    <span className="sub-names truncate white-text">{name}s</span>
                </div>
            </div>
        </div>
    )
}

const SpecialPaperCategoriesPage = () => {
    const { grade_name } = useParams();
    
    const [special_papers, setSpecialPapers] = useState<ISpecialPaperCategory[]>([]);

    return (
        <div className="container">
            <div className="section">

                <div className="row">

                    <div className="col s12">
                        <h3 className="hide-on-small-only"><i className="mdi-content-send brown-text"></i></h3>
                        <h5 className="center"><span className="sub-sub-headings" style={{
                            letterSpacing:2,
                        }}>CATEGORIES</span> | {grade_name?.toUpperCase()}</h5>
                        <div className="divider"></div>

                        {/* <!--pass all the available grades here--> */}
                        <div className="section">
                            <div className="row">

                                {
                                    special_papers.map((paper, position) => 
                                        <SpecialPaperCategory {...paper} key={`special_paper_${position}`}/>
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

export default SpecialPaperCategoriesPage;