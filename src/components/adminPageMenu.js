
import React, { useState } from "react";
import './adminpageMenu.css';

function Adminpagemenu(props) {
  // useState를 통해 예약요청과 예약완료 메뉴의 펼침 상태를 관리
  const [reservationMenuExpanded, setReservationMenuExpanded] = useState(false);

  // 메뉴 항목 클릭 시 펼침 상태 변경 함수
  const handleReservationMenuClick = () => {
    setReservationMenuExpanded(!reservationMenuExpanded);
  };

  return (
    <div className='menu'>
      <ul>
        <h4>Management</h4>
        <li
          className={props.activeItem === '/adminpage' ? 'active' : ''}
          onClick={() => props.handleItemClick('/adminpage')}
        >
          홈
        </li>
        <li
          className={props.activeItem === '/adminpage/reservation' ? 'active' : ''}
          onClick={handleReservationMenuClick} // 예약관리 메뉴 클릭 시 펼침 상태 변경
        >
          예약관리
        </li>
        {/* 예약요청과 예약완료 메뉴를 조건부 렌더링 */}
        {reservationMenuExpanded && (
          <>
            <li
              className={props.activeItem === '/adminpage/reservation/request' ? 'active' : 'expanded' }
              onClick={() => props.handleItemClick('/adminpage/reservation/request')}
            >
              예약요청
            </li>
            <li
              className={props.activeItem === '/adminpage/reservation/complete' ? 'active' : 'expanded'}
              onClick={() => props.handleItemClick('/adminpage/reservation/complete')}
            >
              예약완료
            </li>
          </>
        )}
        <li
          className={props.activeItem === '/adminpage/notice' ? 'active' : ''}
          onClick={() => props.handleItemClick('/adminpage/notice')}
        >
          공지사항
        </li>
        <li
          className={props.activeItem === '/adminpage/withdrawal' ? 'active' : ''}
          onClick={() => props.handleItemClick('/adminpage/withdrawal')}
        >
          회원탈퇴
        </li>
      </ul>
    </div>
  );
}

export default Adminpagemenu;
