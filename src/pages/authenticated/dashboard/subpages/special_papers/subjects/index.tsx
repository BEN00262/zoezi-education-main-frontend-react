import { useState } from "react";
import { useParams } from "react-router-dom";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useQuery } from "react-query";
import { get_special_paper_category_subjects } from "./api";

interface ISpecialSubject {
    subject: string // name of the subject
    _id: string
}

const SubjectComp: React.FC<{
    subject: ISpecialSubject, grade_name: string, 
    second_tier?: string, category_name: string 
}> = ({ subject: {subject, _id}, grade_name, category_name, second_tier }) => {
    return (
        <div className="col s6 m3 l2">
            <div className="card hoverable z-depth-1" style={{ cursor: "pointer" }} /*onclick="location.href='/special/paper/<%=gradeName%>/<%=secondTier%>/<%=category%>/<%=subjects[r]._id%>';"*/>
                <div className="card-image">
                    <img className="img-box-responsive" src={`/img/${grade_name}_special/${subject.toLowerCase().split(" ")[0]}.png`}/>
                </div>
                <div className="center card-content">
                    <span className="sub-names truncate">{subject}</span>
                </div>
            </div>
        </div>
    )
}

const SubjectSkeletonComp = () => {
    return (
        <div className="col s6 m3 l2">
            <div className="card hoverable z-depth-1" style={{ cursor: "pointer" }}>
                <div className="row center">
                    <Skeleton circle height={140} width={140}/>
                </div>
                <div className="center card-content">
                    <span className="sub-names truncate"><Skeleton inline/></span>
                </div>
            </div>
        </div>
    )
}

interface ISpecialPaperSubjectFetchResult {
    subjects: ISpecialSubject[]
    category: string
}

const SpecialPaperSubjectsPage = () => {
    const { grade_reference_id, grade_name, category_name,  } = useParams();

    // fetch the subjects and then display them ( that easy )
    const { data: response, isLoading } = useQuery<ISpecialPaperSubjectFetchResult>(['special_paper_subjects', grade_reference_id], () => get_special_paper_category_subjects(grade_reference_id ?? ""), {
        staleTime: 960000,
        enabled: !!grade_reference_id
    })

    return (
        <div className="container">

            <div className="section">

                <div className="row">

                    <div className="col s12">
                        <h3 className="hide-on-small-only"><i className="mdi-content-send brown-text"></i></h3>
                        <h5 className="center sub-sub-headings">SUBJECTS</h5>
                        <div className="divider"></div>

                        {/* <!--pass all the available subjects here--> */}
                        <div className="section">
                            <div className="row">
                                {
                                        isLoading ?
                                        <>
                                            {
                                                (new Array(6).fill(1)).map((_, position) => 
                                                    <SubjectSkeletonComp key={`scs_skeleton_${position}`}/>
                                                )
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                response?.subjects?.map((subject, position) => 
                                                    <SubjectComp 
                                                        key={`subject_${position}`} 
                                                        subject={subject} 
                                                        grade_name={grade_name ?? ""} 
                                                        category_name={category_name ?? ""}
                                                    />
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

export default SpecialPaperSubjectsPage;