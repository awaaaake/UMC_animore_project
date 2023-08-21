import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Firstpage from '../js/fristpage';
import SecondPage from '../js/secondpage';
import HeaderResult from './header';
import ThirdPage from './thirdpage';
import Footer from './footer';

function MainPage() {
  return (
    <div className="MainPage">
      {/* 홈, 미용실, 예약내역, 마이페이지, 로그아웃 */}
      <HeaderResult/>

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