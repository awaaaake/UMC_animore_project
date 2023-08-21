import { right } from "@popperjs/core";
import React from "react";
import './radio.css';

function Radio({ children, value, name, onChange, checked, readOnly }) {
  const handleChange = (event) => {   //readOnly가 아닐때만 onChange호출
    if (!readOnly) {
      onChange(event.target.value);
    }
  };
    return (
      <label style={{width:94.84}}>
        <input className="radiobtn"
          type="radio"
          value={value}
          name={name}
          checked={checked}
          onChange={handleChange} // input 요소의 값 변경 시 handleChange 함수 호출
          readOnly={readOnly} // readOnly prop을 받아와 설정
        />
        {children}
      </label>
    );
  }

  export default Radio;