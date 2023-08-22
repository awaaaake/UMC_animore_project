import './mypage.css';
import { useState, useEffect } from 'react';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import Animore_logo from '../img/13.png';
import Header from './header_navbar';

function Mypage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState('/');

  const handleItemClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <div className="Mypage">
      {/* location 객체는 pathname 속성을 포함하고 있으므로, 
      location.pathname을 사용하여 경로를 비교해야 합니다.  */}
      {/* {location.pathname === '/mypage/withdrawalConf' ? null : <Header location={location} navigate={navigate} activeItem={activeItem} handleItemClick={handleItemClick}></Header>} */}
      <section className='mypage'>
        {
          location.pathname === '/mypage/withdrawalConf' ? null : <Mypagemenu location={location} navigate={navigate} activeItem={activeItem} handleItemClick={handleItemClick}></Mypagemenu>
        }
        <Outlet></Outlet>
      </section>
    </div>
  );
}


function Mypagemenu(props) {
  return (
    <div className='menu_aw'>
      <ul>
        <h4>MY PAGE</h4>
        <li
          className={props.location.pathname  === '/mypage' ? 'active' : ''}
          onClick={() => props.handleItemClick('/mypage')}
        >
          홈
        </li>
        <li
          className={props.location.pathname  === '/mypage/faq' ? 'active' : ''}
          onClick={() => props.handleItemClick('/mypage/faq')}
        >
          FAQ
        </li>
        <li
          className={props.location.pathname === '/mypage/notice' ? 'active' : ''}
          onClick={() => props.handleItemClick('/mypage/notice')}
        >
          공지사항
        </li>
        <li
          className={props.location.pathname === '/mypage/memberInfo' ? 'active' : ''}
          onClick={() => props.handleItemClick('/mypage/memberInfo')}
        >
          회원정보 수정
        </li>
        <li
          className={props.location.pathname === '/mypage/withdrawal' || props.location.pathname === '/mypage/iswithdrawn' ? 'active' : ''}
          onClick={() => props.handleItemClick('/mypage/withdrawal')}
        >
          회원탈퇴
        </li>
      </ul>
    </div>
  )
}


export default Mypage;
