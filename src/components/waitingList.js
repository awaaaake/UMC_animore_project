//예약요청
import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReservationList.css';
import './watingList.css';
import "@popperjs/core";
import ShopReservationList from "./shopReservationList"; 
import axios from "axios";

function WaitingList() {
    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState([]);
    const [fetchedData, setFetchedData] = useState(false); // 상태 추가
  
    useEffect(() => {
      if (!fetchedData) {  // fetchedData 상태가 false일 때만 요청 보냄 (새로고침 할때)
        const token = ''; // 토큰 추가
  
        axios({
          method: 'GET',
          url: '/manage/bookings/requests',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            if (response.data.isSuccess) {
              setData(response.data.result);
              setShowDetails(true);
              setFetchedData(true);
              console.log('성공:', response.data);
            } else {
              console.error('에러 메시지:', response.data.message);
            }
          })
          .catch(error => {
            console.error('에러 발생:', error);
          });
      }
    }, [fetchedData]);

    // const handleDetailsClick = () => {
    //     setShowDetails(prevShowDetails => !prevShowDetails);
    // };

    return (
        <div className="wationgBox">
            <div className="waiting">예약요청</div>
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
            page={2} 
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

export default WaitingList;
