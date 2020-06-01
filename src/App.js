import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ResizableBox } from 'react-resizable';

const currentMonth = new Date();
const nextMonth = new Date(new Date().setMonth(currentMonth.getMonth() + 1));

const scheduleTime = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), currentMonth.getDate(), 0 , 0, 0);

const doctors = [
  { name: "Dr. Khatre" },
  { name: "Dr.Manasi", 
    appointments: [
      {
        name: "Anand Jain",
        startTime: "2020-06-01T01:45:00.000Z",
        duration: 15
      },
      {
        name: "Varun Wilson",
        startTime: "2020-06-01T01:45:00.000Z",
        duration: 15
      }
    ]
  },
  { name: "Dr. Bhatra" },
  { name: "Dr. Sivakumar" },
  { name: "Dr. Akash" },
  { name: "Dr. Dhanya" },
  { name: "Dr. Rajkumar" },
  { name: "Dr. Ansari" },
  { name: "Dr. Sivakumar" },
  { name: "Dr. Akash" },
  { name: "Dr. Dhanya" },
  { name: "Dr. Rajkumar" },
  { name: "Dr. Ansari" },
  { name: "Dr. Sivakumar" },
  { name: "Dr. Akash" },
  { name: "Dr. Dhanya" },
  { name: "Dr. Rajkumar" },
  { name: "Dr. Ansari" },
]

function App() {

  const ensure0To12 = (scheduleTime) => scheduleTime.getHours() || 12;

  const ensureDoubleDigits = (scheduleTime) => !scheduleTime.getHours() || scheduleTime.getHours() > 9 ? ensure0To12(scheduleTime) : "0" + scheduleTime.getHours();

  const ensure12Hour = (scheduleTime) => scheduleTime.getHours() > 12 ? scheduleTime.getHours() - 12 : ensureDoubleDigits(scheduleTime);

  const getHour = (scheduleTime) => ensure12Hour(scheduleTime);

  return (
    <div className="App">
      <div className="header">
        <h1>Doctor Appointment Scheduling</h1>
        <div>React app</div>
      </div>
      <div className="main">
        <div className="calender">
          <Calendar
            onChange={() => {}}
            value={null}
            activeStartDate={currentMonth}
          />
          <Calendar
            onChange={() => {}}
            value={null}
            activeStartDate={nextMonth}
          />
        </div>
        <div className="scheduler">
          <div className="sideColumn">
            <div className="toprow"></div>
            {
              [...Array(24 * 4)].map((row, i) => {
                scheduleTime.setMinutes( scheduleTime.getMinutes() + (i ? 15 : 0) )
                console.log(scheduleTime.toISOString())
                return (
                  <div className="row">
                    { getHour(scheduleTime) } : { scheduleTime.getMinutes() || "00" }
                    <small>{ scheduleTime.getHours() > 11 ? " PM" : " AM" }</small>
                  </div>
                )
              })
            }
          </div>
          {
            doctors.map(doc => (
              <div className="column">
                <div className="toprow"> { doc.name } </div>
                {[...Array(24 * 4)].map(item => <div className="row innerCell">
                    { Math.random() > 0.95 ?
                      <ResizableBox className={`box active`} width={200} height={60} minConstraints={[200, 60]} draggableOpts={{grid: [200, 60]}} axis="y">
                        <span className="text">Drag to increase</span>
                      </ResizableBox> : null
                    }
                </div>)}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
