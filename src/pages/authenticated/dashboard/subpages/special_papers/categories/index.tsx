import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useQuery } from "react-query"
import { get_special_paper_categories } from "./api"

interface ISpecialPaperCategory {
    color: string
    _id: string
    name: string
}

const SpecialPaperCategory: React.FC<{
    category: ISpecialPaperCategory,
    grade_name: string,
    category_name: string
}> = ({ category: { color, _id, name }, grade_name, category_name }) => {
    const navigate = useNavigate();

    return (
        <div className="col s6 m3 l2">
            <div className="card hoverable z-depth-1" 
                style={{ cursor: "pointer",backgroundColor: color }} 
                onClick={_ => {
                    navigate(`/special/subjects/${grade_name}/${category_name}/${_id}`)
                }}
            >
                <div className="center card-content">
                    <span className="sub-names truncate white-text">{name}</span>
                </div>
            </div>
        </div>
    )
}

const SpecialPaperCategorySkeleton= () => {
    return (
        <div className="col s6 m3 l2">
            <div className="card hoverable z-depth-1" style={{
                cursor: "pointer"
            }}>
                <div className="center card-content">
                    <span className="sub-names truncate white-text"><Skeleton inline/></span>
                </div>
            </div>
        </div>
    )
}

interface ICategoriesFetchResult {
    midTier: ISpecialPaperCategory[]
    secondTierName: string
}

const SpecialPaperCategoriesPage = () => {
    const { grade_name, grade_reference_id } = useParams();

    const { data: response, isLoading } = useQuery<ICategoriesFetchResult>(['special_categories', grade_reference_id], () => get_special_paper_categories(grade_reference_id ?? ""), {
        staleTime: 9600000,
        enabled: !!grade_reference_id
    })

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
                                    isLoading ?
                                    <>
                                        {
                                            (new Array(6).fill(1)).map((_, position) => 
                                                <SpecialPaperCategorySkeleton key={`sc_skeleton_${position}`}/>
                                            )
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            response?.midTier?.map((paper, position) => 
                                                <SpecialPaperCategory category={paper} grade_name={grade_name ?? ""} category_name={response?.secondTierName} key={`special_category_${position}`}/>
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

export default SpecialPaperCategoriesPage;