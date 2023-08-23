import './adminpage.css';
import { useState, useEffect } from 'react';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import Animore_logo from '../img/13.png';
import { useCookies } from "react-cookie";
import Isadmin from './isadmin';
import Admin_Header from './admin_header';
import { useSelector } from 'react-redux';

function Adminpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('/');
  const [cookies, setCookie, removeCookie] = useCookies(['id']);

	// 페이지에 들어올때 쿠키로 사용자 체크
	const token = cookies.id; // 쿠키에서 id 를 꺼내기

  const handleItemClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <div className="Adminpage">
      <section className='adminpage'>
        {
          location.pathname === '/adminpage/withdrawalConf' ? null : <Adminpagemenu location={location} navigate={navigate} activeItem={activeItem} handleItemClick={handleItemClick}></Adminpagemenu>
        }
        <Outlet token={token}></Outlet>
      </section>
    </div>
  );
}

function Adminpagemenu(props) {
  // useState를 통해 예약요청과 예약완료 메뉴의 펼침 상태를 관리
  const [reservationMenuExpanded, setReservationMenuExpanded] = useState(false);

  // 메뉴 항목 클릭 시 펼침 상태 변경 함수
  const handleReservationMenuClick = () => {
    setReservationMenuExpanded(!reservationMenuExpanded);
  };

  return (
    <div className='menu_aw'>
      <ul>
        <h4>Management</h4>
        <li
          className={props.location.pathname === '/adminpage' ? 'active' : ''}
          onClick={() => props.handleItemClick('/adminpage')}
        >
          홈
        </li>
        <li
          className={props.location.pathname.startsWith('/adminpage/adminprofile') ? 'active' : ''}
          onClick={() => props.handleItemClick('/adminpage/adminprofile')}
        >
          업체정보관리
        </li>
        <li
          className={props.location.pathname.startsWith('/adminpage/reservation') ? 'active' : ''}
          onClick={handleReservationMenuClick} // 예약관리 메뉴 클릭 시 펼침 상태 변경
        >
          예약관리
        </li>
        {reservationMenuExpanded && (
          <>
            <li
              className={props.location.pathname === '/adminpage/reservation/request' ? 'active' : 'expanded' }
              onClick={() => props.handleItemClick('/adminpage/reservation/request')}
            >
              예약요청
            </li>
            <li
              className={props.location.pathname === '/adminpage/reservation/complete' ? 'active' : 'expanded'}
              onClick={() => props.handleItemClick('/adminpage/reservation/complete')}
            >
              예약완료
            </li>
          </>
        )}
        <li
          className={props.location.pathname === '/adminpage/notice' ? 'active' : ''}
          onClick={() => props.handleItemClick('/adminpage/notice')}
        >
          공지사항
        </li>
        <li
          className={props.location.pathname === '/adminpage/withdrawal' || props.location.pathname === '/adminpage/iswithdrawn' ? 'active' : ''} //반복이 되더라도 등호조건을 한번더 써줘야한다.
          onClick={() => props.handleItemClick('/adminpage/withdrawal')}
        >
          회원탈퇴
        </li>
      </ul>
    </div>
  )
}


export default Adminpage;
