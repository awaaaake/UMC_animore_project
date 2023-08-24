//예약내역1
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReservationList from "./ReservaionList";
import './reserveListTotal.css';
import { useSelector } from 'react-redux';

function ReserveListTotal() {
  const [data, setData] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [fetchedData, setFetchedData] = useState(false); // 상태 추가
  const token = useSelector(state => state.token);
  
  useEffect(() => {
    if (!fetchedData) {
      // fetchedData 상태가 false일 때만 요청 보냄 (새로고침 할때)
      

      axios({
        method: 'GET',
        url: '/api/my/booking/visit',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setData(response.data);
          setShowDetails(true);
          setFetchedData(true); // fetchedData 상태를 true로 변경
          console.log('성공:', response.data);
        })
        .catch(error => {
          console.error('에러 발생:', error);
        });
    }
  }, [fetchedData]);

  return (
    <div className="main_T">

      <p className="listTitle">예약내역</p>
      <div className="rowlinePage1"></div>
      <div className="colPage1">
        <p className="tile">예약일자</p>
        <p className="tile">매장명</p>
        <p className="tile">매장 주소</p>
        <p className="tile">매장 연락처</p>
        <p className="tile">예약상세</p>
      </div>
      <div>
          <ReservationList
            key="1"
            page="1"
            date="2023.8.24"
            shop="뽀끌래 깍을래"
            address="서울 여의도"
            telephone="02-453-9841"
            reservationId="1"
          />
      </div>
      <div>
          <ReservationList
            key="2"
            page="2"
            date="2023.8.23"
            shop="제일 잘 깍는 미용실"
            address="서울 강남"
            telephone="02-845-9845"
            reservationId="2"
          />
      </div>
      <div>
          <ReservationList
            key="3"
            page="3"
            date="2023.7.24"
            shop="깔끔하게 깍아줄게"
            address="부산 남구"
            telephone="051-845-9841"
            reservationId="3"
          />
      </div>
      <div>
          <ReservationList
            key="4"
            page="4"
            date="2023.7.20"
            shop="바리스타 미용실"
            address="진주 북구"
            telephone="052-974-1564"
            reservationId="4"
          />
      </div>
      <div>
          <ReservationList
            key="5"
            page="5"
            date="2023.7.15"
            shop="이메일 미용실"
            address="인천 북구"
            telephone="031-453-1548"
            reservationId="5"
          />
      </div>
    </div>
  );
}

export default ReserveListTotal;
