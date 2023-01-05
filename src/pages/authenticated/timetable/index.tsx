import FullCalendar from '@fullcalendar/react'

// @ts-ignore
import dayGridPlugin from '@fullcalendar/daygrid'
import { useZoeziMainTrackedState } from '../../../context'

const events = [
  { title: 'Meeting', start: new Date() }
]

// a custom render function
function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }


const TimeTablePage = () => {
  const { selected_student_lname } = useZoeziMainTrackedState()

  return (
      <div className='container'>
          <div className="section">
            <div className="row center">
                <div className="col s12">
                    <h3><i className="mdi-content-send brown-text"></i></h3>
                    <h5 className="sub-names">{selected_student_lname}'s Timetable</h5>
                </div>
            </div>
            <div className="row">
              <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    editable
                    selectable
                    weekends={false}
                    events={events}
                    eventContent={renderEventContent}
                    headerToolbar={{
                      right: 'prev,next today',
                      left: 'title'
                    }}
                />
            </div>
          </div>
      </div>
  );
}

export default TimeTablePage;