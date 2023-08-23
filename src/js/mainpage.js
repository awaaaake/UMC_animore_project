import React, { useState } from 'react';
import { nestedroutesy, Routes, Route, Link, useNavigate, Outlet, useLocation, BrowserRouter } from 'react-router-dom';

import Firstpage from '../js/fristpage';
import SecondPage from '../js/secondpage';
import HeaderResult from './header';
import ThirdPage from './thirdpage';
import Footer from './footer';
import MainHeader from './main_navbar';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NanumBarunGothic';
    src: url('../fonts/NanumBarunGothic.eot');
    src: url('../fonts/NanumBarunGothic.eot') format('embedded-opentype'),
      url('../fonts/NanumBarunGothic.woff') format('woff');
  }

  * {
    font-family: 'NanumBarunGothic', san-serif;
  }
`;

function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState('/');

  const handleItemClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <div className="MainPage">
      <GlobalStyle />
      {/* 홈, 미용실, 예약내역, 마이페이지, 로그아웃 */}
      {/* <MainHeader location={location} navigate={navigate} activeItem={activeItem} handleItemClick={handleItemClick}> </MainHeader> */}

      {/* 1번째 페이지 */}
      <Firstpage/>
      {/* 2번째 페이지 */}
      <SecondPage/>
      {/* 3번째 페이지 */}
      <ThirdPage/>
      {/* 이용 약관 */}
      <Footer/>
    </div>
  );
}

export default MainPage;