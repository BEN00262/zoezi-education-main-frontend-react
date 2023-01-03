import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { get_grade_subjects } from "./api";

interface ISubject {
    subject: string // name of the subject
    _id: string
}

const SubjectComp: React.FC<{subject: ISubject, grade_name: string }> = ({ subject: {subject, _id}, grade_name }) => {
    const navigate = useNavigate();
    
    return (
        <div className="col s6 m3 l2">
            <div 
                className="card hoverable z-depth-1" 
                style={{ cursor: "pointer" }} 
                /*onclick="location.href='/question/<%= gradeName %>/<%=subjects[r]._id%>';"*/
                onClick={_ => {

                    // fix this later
                    navigate(`/paper/${grade_name}/nothing/nothing`)
                }}
            >
                <div className="card-image">
                    <img className="img-box-responsive" src={`/img/${grade_name}/${subject.toLowerCase().split(" ")[0]}.png`}/>
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

interface ISubjectFetchResult {
    subjects: ISubject[]
    gradeName: string
}

const SubjectsPage = () => {
    const { grade_reference_id } = useParams();

    // fetch the subjects and then display them ( that easy )
    const { data: response, isLoading } = useQuery<ISubjectFetchResult>(['grade_subjects', grade_reference_id], () => get_grade_subjects(grade_reference_id ?? ""), {
        staleTime: 9600000,
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
                                                <SubjectSkeletonComp key={`subject_${position}`}/>
                                            )
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            response?.subjects?.map((subject, position) => 
                                                <SubjectComp key={`subject_${position}`} subject={subject} grade_name={response?.gradeName ?? ""}/>
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

export default SubjectsPage;