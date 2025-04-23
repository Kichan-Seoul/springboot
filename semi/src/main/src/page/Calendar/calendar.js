import React, { useState } from 'react';
import './calendar.css';
import Calendar from 'react-calendar';

function CalendarPage() {
  const [value, setValue] = useState(new Date());

  return (
    // 여기서 직접 가운데 정렬 포함
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 0',
      }}
    >
      <Calendar 
        onChange={setValue} 
        value={value} 
        calendarType="gregory"
        formatDay={(locale, date) => date.getDate()}
        showNeighboringMonth={false}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const day = date.getDay();
            if (day === 6) {
              return 'saturday';
            }
          }
          return null;
        }}
        tileContent={({ date, view }) =>
          view === 'month' ? (
            <div
              style={{
                marginTop: 2,
                fontSize: '0.75rem',
                color: 'rgb(63, 82, 140)',
              }}
            >
              0kcal
            </div>
          ) : null
        }
      />
    </div>
  );
}

export default CalendarPage;
