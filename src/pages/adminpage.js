import './adminpage.css';
import { useState, useEffect } from 'react';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import Animore_logo from '../img/13.png';
import { useCookies } from "react-cookie";
import Isadmin from './isadmin';

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
      {/* location 객체는 pathname 속성을 포함하고 있으므로, 
      location.pathname을 사용하여 경로를 비교해야 합니다. */
        location.pathname === '/adminpage/withdrawalConf' ? null : <Header location={location} navigate={navigate} activeItem={activeItem} handleItemClick={handleItemClick}></Header>
      }
      <section className='adminpage'>
        {
          location.pathname === '/adminpage/withdrawalConf' ? null : <Adminpagemenu location={location} navigate={navigate} activeItem={activeItem} handleItemClick={handleItemClick}></Adminpagemenu>
        }
        <Outlet token={token}></Outlet>
      </section>
    </div>
  );
}


function Header(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['id']);
  
  const logOut = () => {
		removeCookie('id'); // 쿠키를 삭제
		props.navigate('/'); // 메인 페이지로 이동
	};

  return (
    <header>
      <div className='logo'>
        <img src={Animore_logo} onClick={() => props.navigate('/')} alt="로고"></img>
      </div>
      <div className="Navbar">
        <ul>
          <li 
          className={props.location.pathname === '/' ? 'active' : ''}
          onClick={() => props.handleItemClick('/')}>홈</li>
          <li 
          className={props.location.pathname === '/beautysalon' ? 'active' : ''}
          onClick={() => props.handleItemClick('/beautysalon')}>미용실</li>
          <li 
          className={props.location.pathname === '/reservation' ? 'active' : ''}
          onClick={() => props.handleItemClick('/reservation')}>예약내역</li>
          <li 
          className={props.location.pathname.startsWith('/adminpage') ? 'active' : ''}
          onClick={() => props.handleItemClick('/adminpage')}>관리자 페이지</li>
          <li 
          className={props.location.pathname === '/' ? 'active' : ''}
          onClick={logOut}>로그아웃</li>
        </ul>
      </div>
    </header>
  )
}


function Adminpagemenu(props) {
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
          className={props.location.pathname === '/adminpage/adminprofile' ? 'active' : ''}
          onClick={() => props.handleItemClick('/adminpage/adminprofile')}
        >
          업체정보관리
        </li>
        <li
          className={props.location.pathname === '/adminpage/reservation' ? 'active' : ''}
          onClick={() => props.handleItemClick('/adminpage/reservation')}
        >
          예약관리
        </li>
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
