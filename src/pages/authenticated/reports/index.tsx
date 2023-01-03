import React from "react";
import { Container } from "react-materialize";

const GradeSelectCompSuspense = React.lazy(() => import("./components/GradeSelect"));
const OnlineReportCompSuspense = React.lazy(() => import("./components/OnlineReport"));


const ReportsPage = () => {

    return (
        <React.Suspense fallback={<>loading reports...</>}>
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