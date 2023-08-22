// 예약상세3 - 시간선택
import React, { useState } from 'react';
import './timeSelect.css';

const TimeSelect = ({ isSelectedTime, onClick }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index);
    onClick(index);
  };

  return (
    <div className="TimeButtonContainer">
      {isSelectedTime.map((selected, index) => (
        <button
          key={index}
          className={`Timebtn ${selectedButtonIndex === index ? 'selected-time' : ''}`}
          onClick={() => {
            handleButtonClick(index);
          }}
        >
          {index + 11}:00
        </button>
      ))}
    </div>
  );
};

export default TimeSelect;

