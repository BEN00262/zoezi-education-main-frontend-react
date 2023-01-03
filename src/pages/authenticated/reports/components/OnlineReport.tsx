import axios from 'axios'
import React from 'react'
import { createRef, useEffect, useState } from 'react'

// @ts-ignore
import M from 'materialize-css';

import { IProgressData, IDataPoint } from '../interfaces/interfaces'
import { zip } from '../utils'

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

interface IGradeSelectData {
  is_special_paper: boolean
  selected_grade_name: string
  selected_paper_type?: string
  selected_paper_sub_type?: string
  attempted_grouping_position?: number
}

const OnlineReportComp: React.FC<IGradeSelectData> = (props) => {
    const [student, setStudent] = useState<IStudent>({
        name: "", profilePic: ""
    });

    const [analytics, setAnalytics] = useState<IProgressData[]>([]);
    const [attemptGrouping, setAttemptGrouping] = useState<IDataPoint[][]>([]);
    const [attemptGroupingPosition, setAttemptGroupingPosition] = useState(-1);
    const [attemptsLabels, setAttemptLabels] = useState<string[]>([]);

    useEffect(() => {
        M.Tabs.init(document.querySelector(".tabs"), {});
    }, []);

    // on load just fetch the grades and place them
    useEffect(() => {
        axios.get(`/analytics/special_paper_stats`)
            .then(({ data }) => {
                if (data) {
                    const {student} = data as {
                        stats: { grade: string, is_special: boolean, _id: string }[],
                        student: IStudent
                    };

                    // set the student and the grade names
                    setStudent(student);
                }
            });

    }, []);

    const fetch_analytics_data = ( gradeName: string, paperType: string, paperSubType: string ) => {
        // we have the data we can then use it
        axios.get(`/analytics/special-paper-analytics/${gradeName}/${paperType}/${paperSubType}`)
            .then(({ data }) => setAnalytics((data.data || []) as IProgressData[]))
    }

    useEffect(() => {
        if (props.is_special_paper) {
            // fill the special paper bit :)
            if (props.selected_grade_name && props.selected_paper_type && props.selected_paper_sub_type) {
                fetch_analytics_data(props.selected_grade_name, props.selected_paper_type, props.selected_paper_sub_type);
                setAttemptGroupingPosition(+(props.attempted_grouping_position ?? 0));
            }
        } else if (props.selected_grade_name) {
              // fetch the not special data
              axios.get(`/analytics/report_analytics/${props.selected_grade_name}`)
                  .then(({ data }) => {
                      // @ts-ignore
                      let adapted_data = data.map(datapoint => ({
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
        }
    }, [props]);

    useEffect(() => {
        let groupings = zip(...analytics);
        setAttemptGrouping(groupings);
        setAttemptLabels(generate_attempts_time_series(analytics).labels);
    }, [analytics]);

    // hide the download button on mobile phones till we solve the pending issues on mobile
    // otherwise ciao
    return (
        <>
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
                    </ul>
                </div>
            </div>


            <div className="row" id="reports">
                <div className="col l2"></div>

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

export default OnlineReportComp;
