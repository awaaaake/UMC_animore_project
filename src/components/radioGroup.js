import React from "react";

function RadioGroup({ label, children, onChange  }) {
  const handleRadioChange = (value) => {
    onChange(value); // 선택된 값(value)을 상위 컴포넌트로 전달
   
  };
    return (
      <fieldset>
        <legend>{label}</legend>
        {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          onChange: handleRadioChange, // Radio 컴포넌트에 onChange 함수 전달
        })
      )}
      </fieldset>
    );
  }

  export default RadioGroup;