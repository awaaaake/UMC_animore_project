import logo from './logo.svg';
import './App.css';
import { nestedroutesy, Routes, Route, Link, useNavigate, Outlet, useLocation, BrowserRouter } from 'react-router-dom';
import Animore_logo from './img/13.png';
import Editprofile from './pages/editprofile';
import Home from './pages/home';
import Memberinfo from './pages/memberInfo';
import Withdrawal from './pages/withdrawal';
import Inforeset from './pages/inforeset';
import IsWithdrawn from './pages/isWithdrawn';
import WithdrawalConf from './pages/withdrawalConf';
import Mypage from './pages/mypage';
import Adminpage from './pages/adminpage';
import Adminhome from './pages/adminhome';
import Adminprofile from './pages/adminprofile';
import Isadmin from './pages/isadmin';
import AdminWithdrawn from './pages/adminWithdrawn';
import AdminWithdrawal from './pages/adminwithdrawal';
import ManageSys from './components/manageSys';
import SelectPage from './components/selectPage';
import ReserveListTotal from './components/reserveListTotal';
import FinalPage from './components/finalPage';
import Menubar from './components/menubar';
import Reservation from './components/Reservation'

//import NaverLoginPage from './pages/login.js';


import React, { useState } from 'react';
import MainPage from './js/mainpage';
import SingUp from './js/singup';
import SingUpNext from './js/signupnext';
import Main from './js/main';
import UserToken from './js/userToken';


function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<MainPage />} />
        <Route path="/main/:oauth" element={<Main />} />
        <Route path="/userToken" element={<UserToken />} />
        {/* <SignUp /> */}
        <Route path="/signup" element={<SingUp />} />
        {/* <SignupNext /> */}
        <Route path="/signupNext" element={<SingUpNext />} />
        {/* 미용실 */}
        <Route path="/hairshop" element={<SingUpNext />} />
        {/* 예약내역 */}
        <Route path="/reservationdetails" element={<SingUpNext />} />




        {/* <Route path="/login" element={
            <NaverLoginPage></NaverLoginPage>
          }></Route> */}
        <Route path="/mypage" element={
          <Mypage></Mypage>}>
          <Route path="profile" element={
            <Editprofile navigate={navigate}></Editprofile>
          }
          />
          <Route path="" element={
            <Home navigate={navigate}></Home>
          }></Route>
          <Route path="memberinfo" element={
            <Memberinfo navigate={navigate}></Memberinfo>
          }>
          </Route>
          <Route path="withdrawal" element={
            <Withdrawal navigate={navigate}></Withdrawal>
          }>
          </Route>
          <Route path="userinfo-reset" element={
            <Inforeset navigate={navigate}></Inforeset>
          }></Route>
          <Route path="iswithdrawn" element={
            <IsWithdrawn navigate={navigate}></IsWithdrawn>
          }></Route>
          <Route path='*' element={<div>없는 페이지</div>}></Route>
        </Route>
        {/*관리자 페이지*/}
        <Route path='/isadmin' element={<Isadmin navigate={navigate}></Isadmin>}></Route>
        <Route path="/adminpage" element={
          <Adminpage></Adminpage>}>
          <Route path="" element={
            <Adminhome navigate={navigate}></Adminhome>
          }></Route>
          <Route path="adminprofile" element={
            <Adminprofile navigate={navigate}></Adminprofile>
          }></Route>
          {/* <Route path="admininfo" element={
              <Admininfo navigate={navigate}></Admininfo>
            }>
            </Route> */}
          <Route path="withdrawal" element={
            <AdminWithdrawal navigate={navigate}></AdminWithdrawal>
          }></Route>
          <Route path="userinfo-reset" element={
            <Inforeset navigate={navigate}></Inforeset>
          }></Route>
          <Route path="iswithdrawn" element={
            <AdminWithdrawn navigate={navigate}></AdminWithdrawn>
          }></Route>
          <Route path='*' element={<div>없는 페이지</div>}></Route>
        </Route>
        <Route path="withdrawalConf" element={
          <WithdrawalConf navigate={navigate}></WithdrawalConf>
        }></Route>
        
        <Route path="/reservation" element={<Reservation />} />\
        <Route path="/select" element={<SelectPage />} />
        <Route path="/final" element={<FinalPage />} />
        <Route path="/reservelist" element={<ReserveListTotal />} />
        <Route path="/adminpage" element={<ManageSys />} />

      </Routes>

      

    </div>
  );
}

export default App;
