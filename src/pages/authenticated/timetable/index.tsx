import FullCalendar from '@fullcalendar/react'

// @ts-ignore
import dayGridPlugin from '@fullcalendar/daygrid'

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
    return (
        <div className='container'>
            <div className="section">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    editable
                    selectable
                    weekends={true}
                    events={events}
                    eventContent={renderEventContent}
                />
            </div>
        </div>
    );
}

export default TimeTablePage;