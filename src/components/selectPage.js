// 예약상세3
import React,{useState} from 'react';
import FinalPage from './finalPage';
import DateSelct from './dateSelect'
import { faCalendarDays  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock  } from "@fortawesome/free-solid-svg-icons";
import './selectPage.css';
import TimeSelect from './timeSelect';
import './timeSelect.css'
import axios from "axios";
import { Link } from "react-router-dom";

function SelectPage() {
  const [selectedDate, setSelectedDate] = useState(""); // 선택한 날짜를 상태로 저장
  const [showFinalPage, setShowFinalPage] = useState(false);
  const [data, setData] = useState({});
  const [isSelected, setIsSelected] = useState(Array(10).fill(false)); // 초기값은 선택되지 않음으로 설정

  const handleDateSelect = (date) => {
    setSelectedDate(date); // 하위 컴포넌트로부터 받은 날짜 값을 상태로 저장
    console.log ("받아온값",date)
  };

  const handleTimeClick = (index) => {
    const updatedSelected = [...isSelected];
    updatedSelected[index] = !updatedSelected[index];
    setIsSelected(updatedSelected);

    const selectedTime = index + 11;
    console.log("받아온값:", selectedTime); //timeSelect에서 받은값
  }
  
  const handleRequestClick = () => {
    if (selectedDate !== "" && isSelected.some(selected => selected)) {
      const selectedTime = isSelected.findIndex(selected => selected) + 11;
      const combinedDateTime = `${selectedDate} ${selectedTime}:00`;
    
    setShowFinalPage(true);
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjb3PthqDtgbAiLCJpZCI6NCwiZXhwIjoxNjkyNzYxMDA0LCJ1c2VybmFtZSI6Imdvb2dsZV8xMDg1OTYwMzM2NDczMDk5ODQ3ODUifQ.uBYZMFGYe2wq6w3LzO1TPdmg6evnMtEZGQHmSszo8yaqUtGeraBjeA-YQepR5pQn1Mi_IqkMWPOFGdMTI47EFA';
    axios({
        method: 'POST',
        url: '/booking/time/{reservationId}',  //예약날짜가 정해지면 reservationId가 생성되는거 아닌가?
        headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰을 "Authorization" 헤더에 추가
            ContentType: 'application/json' 
        },
        data: {
          startTime : combinedDateTime
        }

    
    })
        .then(response => {
            setData(response.data);
            console.log('성공:', response.data);

        })
        .catch(error => {
            console.error('에러 발생:', error.response);
        });
      }
  };

  if (showFinalPage) {
    return <FinalPage />;
    
  }
  

    return (
      <div className='all'>
        <div className='main_S'>
          <div className='left'>
            <div className='top'>
              <FontAwesomeIcon icon={faCalendarDays} className='icon' />
              날짜선택
            </div>
            <DateSelct onDateSelect={handleDateSelect}/>  
          </div>
          <div className='line'></div>
          <div className='right'>
            <div className='top'>
              <FontAwesomeIcon icon={faClock} className='icon' />
              시간선택
            </div>
            <TimeSelect isSelectedTime={isSelected} onClick={handleTimeClick}/>
          </div>
        </div>
        <Link to='/final'>
        <button className='request'onClick={handleRequestClick}>예약요청</button>
        </Link>
      </div>

    );
  }
  export default SelectPage;