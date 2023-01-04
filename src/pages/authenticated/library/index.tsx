import { useEffect, useState } from "react";
import { useQuery } from "react-query";

// @ts-ignore
import M from 'materialize-css';

import { get_library_details } from "./api";
import { useNavigate } from "react-router-dom";



interface ILibrary {
    _id: string
    papers: {
        grade: string
        navigation: string[]
        papers: {
            grade: string 
            subject: string
            score: {
                passed: number
                total: number
            }, 
            _id: string
        }[]
    }[],
    special_papers: {
        _id: { 
            gradeName: string
            secondTier: string 
            category: string 
        }, 
        
        papers: { 
            grade: string
            subject: string
            scores: {
                passed: number
                total: number
            }, 
            _id: string
            paperID: string 
            historyID: string 
        }[] 
    }[]
    howManyDaysAgo: string
}


const LibraryPage = () => {
    // const [library, setLibrary] = useState<ILibrary[]>([]);
    const navigate = useNavigate();

    const { data: library } = useQuery<ILibrary[]>('library', get_library_details, {
        staleTime: 1200000
    });

    useEffect(() => {
        M.Collapsible.init(document.querySelector(".collapsible"), {
            accordion: false
        });
    }, []);

    return (
        <div className="container">
        <div className="section">

            {/* <!-- <div className="row">
                <label for="datefilter">Filter by Date</label>
                <input type="date" className="salsa-calendar-input" id="datefilter" style="cursor:pointer;border:1px solid #dcdee2;border-radius:4px;outline:0;box-sizing:border-box;outline: 0;height:40px;width:100%;display: flex;padding: 6px;">
            </div> --> */}

            {
                library?.length ?
                <>
                     <div className="row">
                        {
                            library.map(({_id: date, papers, special_papers, howManyDaysAgo }, parentIndex) => {
                                return (
                                    <>
                                        <div className="section">
                                            <div className="row">

                                                <h3 className="hide-on-small-only"><i className="mdi-content-send brown-text"></i></h3>
                                                <h6 className="sub-sub-headings">{(new Date(date)).toDateString()} {howManyDaysAgo}</h6>
                                                <div className="divider"></div>


                                                <ul className="collapsible expandable z-depth-0">
                                                    {/* <!-- for the non special papers --> */}
                                                    {
                                                        papers.map(({grade, papers, navigation}, index) => {
                                                            return (
                                                                <li className={(parentIndex === 0 && index === 0) ? 'active' : ''}>
                                                                    <div className="collapsible-header">
                                                                        <img className="img-box-responsive" style={{ objectFit: "contain" }} height="40" width="40" src={`/img/${grade.toLowerCase()}.png`}/>
                                                                        <p className="sub-modal-texts" style={{ marginLeft:5,fontWeight: "bolder" }}>
                                                                            <span style={{
                                                                                border: "1px solid #651fff",borderRadius:10,paddingRight:10, paddingLeft:10,backgroundColor: "rgba(101,31,255, 0.2)",whiteSpace: "nowrap",
                                                                            }}>
                                                                                {papers.length} paper (s)
                                                                            </span>
                                                                        </p>
                                                                    </div>



                                                                    <div className="collapsible-body" style={{ padding:1,marginTop:5 }}>
                                                                        <div className="row">
                                                                            {
                                                                                papers.map(({ grade, subject, score: {passed, total}, _id }) => {
                                                                                    return (
                                                                                        <div className="col s6 m3 l2">
                                                                                            <div className="hoverable" 
                                                                                                style={{
                                                                                                    backgroundColor: "#fffde7",marginBottom:5,cursor: "pointer",border: "1px solid #d3d3d3",borderRadius:2,padding:4,
                                                                                                }}

                                                                                                onClick={_ => navigate(`/library/normal/${_id}`)}
                                                                                            >

                                                                                                <div className="center">

                                                                                                    <span className="sub-names truncate"><b>{subject}</b></span>
                                                                                                    <br/>
                                                                                                    <span className="sub-modal-texts teal-text truncate" style={{
                                                                                                        backgroundColor: "#fff",border: "1px solid #d3d3d3", padding:4, borderRadius:2,
                                                                                                    }}>
                                                                                                    <b>{subject.toLowerCase().includes("kiswahili") ? "ALAMA: " : "SCORE: "}{passed}/{total}</b>
                                                                                                </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }

                                                    {/* <!-- for the special papers --> */}
                                                    {
                                                        special_papers.map(({_id: { gradeName, secondTier, category }, papers: spapers }, index) => {
                                                            return (
                                                                <li className={(parentIndex === 0 && (index + papers.length) === 0) ? 'active' : ''}>
                                                                    {/* <!-- <div className="row"> --> */}
                                                                    <div className="collapsible-header">
                                                                        <img className="img-box-responsive" style={{ objectFit: "contain" }} height="40" width="40" src={`img/${gradeName.toLowerCase()}.png`}/>
                                                                        {/* <!-- trying to style this things --> */}
                                                                        <p className="sub-modal-texts" style={{ marginLeft:5,fontWeight: "bolder" }}>
                                                                            <span style={{
                                                                                border: "1px solid #15ccbd",borderRadius:10,paddingRight:10, paddingLeft:10,backgroundColor: "rgba(21,204,189, 0.2)",whiteSpace: "nowrap",
                                                                            }}>
                                                                                {secondTier}
                                                                            </span> 
                                                                            &nbsp;|&nbsp; 
                                                                            <span style={{
                                                                                border: "1px solid #ffa726",borderRadius:10,paddingRight:10, paddingLeft:10,backgroundColor: "rgba(255,167,38, 0.2)",whiteSpace: "nowrap",
                                                                            }}>
                                                                                {category}
                                                                            </span> 
                                                                            &nbsp;|&nbsp; 
                                                                            <span style={{
                                                                                border: "1px solid #651fff",borderRadius:10,paddingRight:10, paddingLeft:10,backgroundColor: "rgba(101,31,255, 0.2)",whiteSpace: "nowrap",
                                                                            }}>
                                                                                {spapers.length} paper (s)
                                                                            </span>
                                                                        </p>
                                                                    </div>



                                                                    <div className="collapsible-body" style={{ padding:1,marginTop:5 }}>
                                                                        <div className="row">
                                                                            {
                                                                                spapers.map(({ grade, subject, scores: {passed, total}, _id, paperID, historyID }) => {
                                                                                    return (
                                                                                        <div className="col s6 m3 l2">
                                                                                            <div className="hoverable" style={{
                                                                                                backgroundColor: "#fffde7",marginBottom:5,cursor: "pointer",border: "1px solid #d3d3d3",borderRadius:2,padding:4,/*"onclick="javascript: "location.href=/special/library_paper_questions_display/<%=gradeName%>/<%=category%>/<%=paperID%>/<%=historyID%>"*/
                                                                                            }}>

                                                                                                <div className="center">

                                                                                                    <span className="sub-names truncate"><b>{subject}</b></span>
                                                                                                    <br/>
                                                                                                    <span className="sub-modal-texts teal-text truncate" style={{
                                                                                                        backgroundColor: "#fff",border: "1px solid #d3d3d3", padding:4, borderRadius:2,
                                                                                                    }}>
                                                                                                        <b>
                                                                                                        {subject.toLowerCase().includes("kiswahili") ? "ALAMA: " : "SCORE: "}{passed}/{total}
                                                                                                        </b>
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>

                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </>
                :
                <div className="row center">
                    <div className="col s12">
                        <img src="img/sad-kid.png" height="200px" />
                        <p className="sub-names">Sorry you have an empty library. Please try some questions</p>
                    </div>
                </div>
            }
        </div>
    </div>
    );
}

export default LibraryPage;