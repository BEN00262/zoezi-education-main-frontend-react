import React from "react";
import Lottie from "lottie-react";
import { Container } from "react-materialize";

// animations
import LoadingChartAnimation from './animations/loading_charts.json';

const GradeSelectCompSuspense = React.lazy(() => import("./components/GradeSelect"));
// const OnlineReportCompSuspense = React.lazy(() => import("./components/OnlineReport"));


// add a lottie animation at this point as a transitional page
const TransitionalPage = () => {
    return (
        <Container>
            <div className="section">

                <div /*className="valign-wrapper"*/>
                    <Lottie 
                        animationData={LoadingChartAnimation} 
                        style={{
                            height: "300px"
                        }}
                    />
                </div>
            </div>
        </Container>
    );
}

const ReportsPage = () => {
    return (
        <React.Suspense fallback={<TransitionalPage/>}>
            {/* {
                is_online_printable_report ? <OnlineReportCompSuspense
                    {...{
                      is_special_paper,
                      selected_grade_name,
                      selected_paper_type,
                      selected_paper_sub_type,
                      attempted_grouping_position
                    }}
                /> : <GradeSelectCompSuspense/>
            } */}
            <Container>
                <div className="section">
                    <GradeSelectCompSuspense/>
                </div>
            </Container>
        </React.Suspense>
    )
}

export default ReportsPage