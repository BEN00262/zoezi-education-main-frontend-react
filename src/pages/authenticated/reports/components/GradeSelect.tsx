import axios from 'axios'
import React from 'react'
import { createRef, useEffect, useState } from 'react'
import Select from 'react-select';

// @ts-ignore
import M from 'materialize-css';

import { IProgressData, IDataPoint } from '../interfaces/interfaces'
import { zip } from '../utils'
// import ReactToPdf from './ReactToPdf'
import { get_special_paper_analytics, get_special_paper_stats } from '../api';

const ChartDisplayComp = React.lazy(() => import("./ChartDisplay"));
const ActivityDisplayComp = React.lazy(() => import("./Activity"));
const RevisionSummaryComp = React.lazy(() =>  import("./RevisionSummary"));
const ReportCardComp = React.lazy(() =>  import("./ReportCard"));

// fetch the data from this element ---> all the other elements get the data from here and use it
interface IGradeData {
    label: string // name of the grade for the visuals
    value: string // id
    _id: string
    is_special: boolean // if the paper is a special one
}

interface IPaperType {
    label: string // name of the grade for the visuals
    value: string // id
    _id: string
}

function generate_attempts_time_series(analytics: IProgressData[]) {
    let datapoints = zip(...analytics).map(
        attempt => attempt.reduce(
            (acc, x) => ({
                passed: (x?.attemptTree?.score.passed || 0) + acc.passed,
                total: (x?.attemptTree?.score.total || 0) + acc.total,
            }), { passed: 0, total: 0})
    ).map(y => (y.passed / y.total) * 100 );

    return {
        labels: datapoints.map((_, datapointIndex) => `Attempt ${datapointIndex + 1}`),
        datapoints
    }
}

interface IStudent {
    profilePic: string
    name: string
}

interface IReportData {
  is_special_paper: boolean
  selected_grade_name: string
  selected_paper_type?: string
  selected_paper_sub_type?: string
  attempted_grouping_position?: number
}

// const process.env.REACT_APP_BASE_URL = "http://localhost:3600";
// const process.env.REACT_APP_BASE_URL = "/analytics"

const GradeSelectComp = () => {
    const [gradeNames, setGradeNames] = useState<IGradeData[]>([]);
    const [paperType, setPaperType] = useState<IPaperType[]>([]);
    const [paperSubType, setPaperSubType] = useState<IPaperType[]>([]);
    const [isDownloadingReport, setIsDownloadingReport] = useState(false);

    const [student, setStudent] = useState<IStudent>({
        name: "", profilePic: ""
    })

    // this should be the whole object by the way
    const [selectedGradeName, setSelectedGradeName] = useState<IGradeData>({} as IGradeData);
    const [selectedPaperType, setSelectedPaperType] = useState<IPaperType>({} as IPaperType);
    const [selectedPaperSubType, setSelectedPaperSubType] = useState<string>("");

    const [analytics, setAnalytics] = useState<IProgressData[]>([]);
    const [attemptGrouping, setAttemptGrouping] = useState<IDataPoint[][]>([]);
    const [attemptGroupingPosition, setAttemptGroupingPosition] = useState(-1);
    const [attemptsLabels, setAttemptLabels] = useState<string[]>([]);

    // use to download the page as a pdf ( somehow we need to render this stuff the same way in a computer and the phone )
    // i think thats kind of not needed for now

    // const printable_ref = createRef() as React.RefObject<any>;

    useEffect(() => {
        M.Tabs.init(document.querySelector(".tabs"), {});
    }, []);

    const fetch_analytics_data = ( gradeName: string, paperType: string, paperSubType: string ) => {
        // we have the data we can then use it
        get_special_paper_analytics(gradeName, paperType, paperSubType)
            .then(data => setAnalytics((data || []) as IProgressData[]))
    }

    // on load just fetch the grades and place them
    useEffect(() => {
        // on mount
        // fetch the top level grade names
        // we can get them through here :)

        get_special_paper_stats()
            .then(data => {
                // send the data for the grades and also for the profile and the student profile pic
                if (data) {
                    const {stats, student} = data as {
                        stats: { grade: string, is_special: boolean, _id: string }[],
                        student: IStudent
                    };

                    // set the student and the grade names
                    setStudent(student);
                    setGradeNames(
                        stats.map(({ grade, is_special, _id }) => ({
                            label: `${grade}${is_special ? " | special" : ""}`, value: `${grade}${is_special ? "_special" : ""}`, is_special, _id
                        }))
                    );
                }

                // there was an issue with the passing of the data
            });

    }, []);

    useEffect(() => {
        // we default the selectedIndex kwanza
        // we check if its a special paper or not and do the stuff
        if (Object.keys(selectedGradeName).length < 1) {
            return;
        }

        setAttemptGroupingPosition(-1);
        setAnalytics([] as IProgressData[]);

        if (selectedGradeName.is_special) {
            // fetch subsequent data ( if not just fetch the othe data )
            // place the subTypes here ( we )
            axios.get(`/analytics/special_paper_stats/${selectedGradeName._id || selectedGradeName.value}`)
                .then(({ data }) => {
                    setPaperType(
                        data.map(({ subType, _id }: { subType: string, _id: string }) => ({
                            value: subType, _id, label: `${subType}s`
                        }))
                    )
                });
            return;
        }

        // fetch the not special data
        axios.get(`/analytics/report_analytics/${selectedGradeName.value}`)
            .then(({ data }) => {
                // @ts-ignore
                let adapted_data = data?.plottable?.map(datapoint => ({
                    subject: datapoint.subjectName,
                    hits: datapoint.hits,
                    progress: [
                        {
                            subject: datapoint.subjectName,
                            attemptTree: {
                                score: {
                                    passed: datapoint.ups,
                                    total: datapoint.totalQuestionsAttempted
                                }
                            }
                        }
                    ]
                }));

                setAnalytics(adapted_data);
                setAttemptGroupingPosition(0); // set to the first data set thats what we need
            })
    }, [selectedGradeName]);


    useEffect(() => {
        if (Object.keys(selectedPaperType).length > 0) {
            setPaperSubType([] as IPaperType[]);
            axios.get(`/analytics/special_paper_stats/${selectedGradeName._id || selectedGradeName.value}/${selectedPaperType._id}`)
                .then(({ data }) => {
                    setPaperSubType(
                        data.map(({ subsubType, _id }: { subsubType: string, _id: string }) => ({
                            value: subsubType, label: subsubType, _id
                        }))
                    )
            });
        }
    }, [selectedPaperType]);

    useEffect(() => {
        if (selectedPaperSubType) {
            fetch_analytics_data(selectedGradeName.value, selectedPaperType.value, selectedPaperSubType);
        }
    }, [selectedPaperSubType]);

    useEffect(() => {
        let groupings = zip(...analytics);
        setAttemptGrouping(groupings);
        setAttemptLabels(generate_attempts_time_series(analytics).labels);
    }, [analytics]);


    const generate_pdf_report = (student_firstname: string, report_args: IReportData) => {
        setIsDownloadingReport(true);

        axios.post(`/analytics/generate-report`, {
          ...report_args, _csrf: document.getElementById('_csrf')?.innerText
        }, {
            responseType: 'blob'
        })
          .then(({ data }) => {
              // create file link in browser's memory
              const href = URL.createObjectURL(data);

              // create "a" HTLM element with href to file & click
              const link = document.createElement('a');
              link.href = href;
              link.setAttribute('download', `${(student_firstname || "LEARNER").toUpperCase() +"'S"}.pdf`); //or any other extension
              document.body.appendChild(link);
              link.click();

              // clean up "a" element & remove ObjectURL
              document.body.removeChild(link);
              URL.revokeObjectURL(href);
          })
          .finally(() => {
              setIsDownloadingReport(false);
          })
    }

    // hide the download button on mobile phones till we solve the pending issues on mobile
    // otherwise ciao
    return (
        <>
            <div>
                <button
                    onClick={_ => generate_pdf_report(student.name, {
                        is_special_paper: selectedGradeName.is_special,
                        selected_grade_name: selectedGradeName.value || selectedGradeName._id,
                        selected_paper_type: selectedPaperType.value,
                        selected_paper_sub_type: selectedPaperSubType,
                        attempted_grouping_position: attemptGroupingPosition
                    })}
                    className="waves-effect waves-light btn-small" disabled={!((attemptGroupingPosition > -1 && analytics.length) || isDownloadingReport)} style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        zIndex: 2
                    }}>Download Report <i className="material-icons right">cloud_download</i></button>
            </div>

            {/* the student profile pic :-) */}
            {/* how do we get the image in here without doing a fetch :) */}
            {
                student.name ?
                    <div className="row">
                        <div className="col s12 center">
                            <img
                                style={{
                                    height: "100px",
                                    width: "100px",
                                    objectFit: "contain",
                                    border: "1px solid #d3d3d3",
                                    borderRadius: "50%"
                                }}
                                src={student.profilePic || "https://image.shutterstock.com/image-vector/illustration-face-boy-on-white-260nw-123780619.jpg"}
                            />
                            <br />
                            <span style={{
                                letterSpacing: "1px",
                                fontWeight: "bold"
                            }} className="sub-modal-texts">{student.name}</span>
                        </div>
                    </div>
                : null
            }

            {/* the main content */}
            {/* send the generation of the reports to the backend */}
            <div className="row">
                <div className="col s12">
                    <ul className="tabs tabs-fixed-width" style={{
                        borderBottom: "1px solid #efefef"
                    }}>
                      <li className="tab col s3"><a className="active" href="#reports">Reports</a></li>
                      <li className="tab col s3"><a href="#activity">Activity</a></li>
                      {/*<li className="tab col s3"><a href="#generated_reports">Generated Reports</a></li>*/}
                    </ul>
                </div>
            </div>


            <div className="row" id="reports">
                <div className="col s12 m12 l4">
                    <div className="card z-depth-0" style={{border:"1px solid #dcdee2"}}>
                    <div className="card-content">
                        <span className="card-title center"><b><small>PERFORMANCE ANALYSIS</small></b></span>
                        <div className="row">

                            <div className="col s12 m12">
                                <label>Select Grade</label>
                                <Select
                                    onChange={(item: any) => {
                                        setSelectedPaperType({} as IPaperType);
                                        setSelectedPaperSubType("");
                                        setSelectedGradeName(item || {} as IGradeData);
                                    }}
                                    options={gradeNames}
                                    placeholder="choose grade..."/>

                            </div>

                            <div className="col s12 m12" hidden={!(selectedGradeName && selectedGradeName.is_special)}>
                                {/* for special grades only */}
                                <label>Select Type</label>
                                <Select
                                    options={paperType}
                                    onChange={(item: any) => {
                                        setSelectedPaperType(item || {} as IPaperType)
                                    }}
                                    placeholder="choose type..."/>
                            </div>

                            <div className="col s12 m12" hidden={!(selectedPaperType && selectedPaperType.value)}>
                                <label>Select Paper</label>
                                <Select
                                    onChange={(item: any) => {
                                        setSelectedPaperSubType(item?.value || "")
                                    }}
                                    options={paperSubType}
                                    placeholder="choose paper..."/>
                            </div>

                            <div className="col s12 m12" hidden={!(selectedPaperSubType && attemptsLabels)}>
                                {/* for special grades only */}
                                <label>Select Attempt</label>
                                <Select
                                    onChange={(item: any) => {
                                        setAttemptGroupingPosition(item?.value || 0);
                                    }}
                                    options={attemptsLabels.map((label, index) => {
                                        return {value: index, label }
                                    })}
                                    placeholder="choose attempt..."/>
                            </div>

                        </div>

                        {/* // <!-- create a report generator button --> */}
                        <div className="row" id="performanceReportButton" hidden>

                            <div className="col s12 m12">
                                <button onClick={() => {
                                    // "activatePerfomanceReport();"
                                }} data-position="bottom" data-tooltip="Scroll down to view or download the report" className="btn-small sub-modal-texts tooltipped white black-text waves-effect waves-black z-depth-1" style={{width:"100%", fontWeight:"bold"}}>PERFORMANCE REPORT<i className="material-icons right">assessment</i></button>
                            </div>

                        </div>

                    </div>
                    </div>
                </div>

                <div className="col s12 m12 l8">
                    <React.Suspense fallback={<>loading chart...</>}>
                        <ChartDisplayComp subjectView={attemptGrouping[attemptGroupingPosition] || []}/>
                    </React.Suspense>
                </div>

                {attemptGroupingPosition > -1 ?
                    <React.Suspense fallback={<>loading report card...</>}>
                        <ReportCardComp subjectView={attemptGrouping[attemptGroupingPosition] || []} is_special={true}/>
                    </React.Suspense>
                : null}
                { analytics.length ?
                    <React.Suspense fallback={<>loading revision summary...</>}>
                        <RevisionSummaryComp analytics={analytics}/>
                    </React.Suspense>
                : null }
            </div>

            <div className="row" id="activity">
                <div className="hide-on-small col l2"></div>
                <div className="col s12 m12 l8">
                    <React.Suspense fallback={<>loading acitivity chart...</>}>
                        <ActivityDisplayComp/>
                    </React.Suspense>
                </div>
            </div>
        </>
    )
}

export default GradeSelectComp
