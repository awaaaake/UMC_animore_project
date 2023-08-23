//예약완료
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReservationList.css';
import './watingList.css';
import "@popperjs/core";
import ShopReservationList from "./shopReservationList"; 
import { useSelector } from 'react-redux';


function FixedList() {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false); // 상태 추가
  const token = useSelector(state => state.token);
  
  useEffect(() => {
    if (!fetchedData) {
      // fetchedData 상태가 false일 때만 요청 보냄 (새로고침 할때)
      

      axios({
        method: 'GET',
        url: '/api/manage/bookings/confirmed',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setData(response.data.result);
          setShowDetails(true);
          setFetchedData(true); // fetchedData 상태를 true로 변경
          console.log('성공:', response.data);
        })
        .catch(error => {
          console.error('에러 발생:', error);
        });
    }
  }, [fetchedData]);
  const handleDetailsClick = () => {
      setShowDetails(prevShowDetails => !prevShowDetails);
  };

  return (
      <div className="wationgBox">
          <div className="waiting">예약완료</div>
          <div className="rowline"></div>  
          <div className="colPage2">
              <p className="tile title1">예약일자</p>
              <p className="tile title2">반려동물이름</p>
              <p className="tile title3">보호자 이름</p>
              <p className="tile title4">보호자 연락처</p>
              <p className="tile title5">예약상세</p>
          </div>
          <div>
          {data.map((item, index) => (
          <ShopReservationList
            key={index}
            page={3} 
            startTime={item.startTime}
            petName={item.petName}
            nickname={item.nickname}
            phone={item.phone}
            reservationId ={item.reservationId}
          />
        ))}
          </div> 
      </div>           
  );
}

export default FixedList;