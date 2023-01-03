import { useState } from "react"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { get_special_papers } from "./api"

interface ISpecialPaper {
    color: string
    _id: string
    name: string
}

const SpecialPaper: React.FC<{
    paper: ISpecialPaper,
    gradeName: string
}> = ({ paper: {color, _id, name}, gradeName }) => {
    const navigate = useNavigate();


    return (
        <div className="col s6 m3 l2">
            <div className="card hoverable z-depth-1" 
                style={{ cursor: "pointer",backgroundColor: color }} 
                onClick={_ => {
                    navigate(`/special/categories/${gradeName}/${_id}`)
                }}
            >
                <div className="center card-content">
                    <span className="sub-names truncate white-text">{name}s</span>
                </div>
            </div>
        </div>
    )
}

const SpecialPaperSkeleton = () => {
    return (
        <div className="col s6 m3 l2">
            <div className="card hoverable z-depth-1" style={{
                cursor: "pointer",
            }}>
                <div className="center card-content">
                    <Skeleton/>
                </div>
            </div>
        </div>
    )
}

interface ISubjectFetchResult {
    secondTier: ISpecialPaper[]
    gradeName: string
}


const SpecialPapersPage = () => {
    const { grade_reference_id } = useParams()
    // const [special_papers, setSpecialPapers] = useState<ISpecialPaper[]>([]);

    const { data: response, isLoading } = useQuery<ISubjectFetchResult>(['special_papers', grade_reference_id], () => get_special_papers(grade_reference_id ?? ""), {
        enabled: !!grade_reference_id,
        staleTime: 960000
    })

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
                                    isLoading ?
                                    <>
                                        {
                                            (new Array(6).fill(1)).map((_, position) => 
                                                <SpecialPaperSkeleton key={`s_skeleton_${position}`}/>
                                            )
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            response?.secondTier?.map((paper, position) => 
                                                <SpecialPaper paper={paper} gradeName={response?.gradeName} key={`special_paper_${position}`}/>
                                            )
                                        }
                                    </>
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