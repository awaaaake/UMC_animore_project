import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./react-calendar-overrides.css";
import { format } from "date-fns";

function DateSelect({ onDateSelect }) {
  const [value, setValue] = useState(new Date()); // 초기값은 현재 날짜로 설정
  const onChange = (newValue) => {
    setValue(newValue);
    const selectedDateAsString = format(newValue, "yyyy-MM-dd");
    // console.log("Selected Date:", newValue);

        // 선택한 날짜를 상위 컴포넌트로 전달
     onDateSelect(selectedDateAsString);
  };

  return (
    <div>
      <Calendar  calendarType={'US'}
        onChange={onChange}
        value={value}
        formatDay={(locale, date) =>
        date.toLocaleString('en', { day: 'numeric' })
        }
        next2Label={null}
        prev2Label={null}
      />
      <div> </div>
    </div>
  );
}
export default DateSelect;