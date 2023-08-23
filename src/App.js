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
import Reservation from './components/Reservation';
import Header from './pages/header_navbar';
import Admin_Header from './pages/admin_header';
import FixedList from './components/fixecList';
import WaitingList from './components/waitingList';
import MainHeader from './js/main_navbar';

//미용실 페이지들
import Book from './Bookpage/Book.js'
import Company from './CompPage/Company.js'
import Search from './SearchPage/Search0820'

//import NaverLoginPage from './pages/login.js';


import React, { useState } from 'react';
import MainPage from './js/mainpage';
import SingUp from './js/singup';
import SingUpNext from './js/signupnext';
import Main from './js/main';
import UserToken from './js/userToken';


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState('/');

  const handleItemClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };


  return (
    <div className="App">
      {
        location.pathname === '/withdrawalConf' || location.pathname === '/isadmin' || location.pathname.startsWith('/adminpage') ||  location.pathname==='/signup' ||  location.pathname==='/login' 
          ? null : <Header location={location} navigate={navigate} activeItem={activeItem} handleItemClick={handleItemClick}></Header>
      }
      {
        location.pathname.startsWith('/adminpage') ? <Admin_Header location={location} navigate={navigate} activeItem={activeItem} handleItemClick={handleItemClick}></Admin_Header> : null 
      }
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main/:oauth" element={<Main />} />
        <Route path="/userToken" element={<UserToken />} />
        {/* <SignUp /> */}
        <Route path="/signup" element={<SingUp />} />
        {/* <SignupNext /> */}
        <Route path="/signupNext" element={<SingUpNext />} />
        {/* 미용실 */}
        {/* <Route path="/hairshop" element={<SingUpNext />} /> */}
        {/* 예약내역 */}
        {/* <Route path="/reservationdetails" element={<SingUpNext />} /> */}


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
          <Route path="reservation/request" element={
            <WaitingList navigate={navigate}></WaitingList>
          }></Route>
          <Route path="reservation/complete" element={
            <FixedList navigate={navigate}></FixedList>
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

        <Route path="/reservation" element={<Reservation />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/final" element={<FinalPage />} />
        <Route path="/reservelist" element={<ReserveListTotal />} />
        {/* <Route path="/adminpage" element={<ManageSys />} /> */}

        {/*0823미용실 추가*/}
        <Route path="/shop" element={ <Book /> } />
        <Route path="/shop/:storeId" element={ <Company/> } />
        <Route path="api/search/:searchText" element={ <Search/> } />
      </Routes>



    </div>
  );
}

export default App;