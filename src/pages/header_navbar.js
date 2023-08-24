import Animore_logo from '../img/13.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setToken } from '../actions';
import './header_navbar.css';
import { useSelector } from 'react-redux';

const Headerstyle = styled.header`
  // 스크롤 해도 header는 같이 따라오게 하기 위해 fixed로 설정
  position: absolute;
  margin: 0px;
  top: 10px;
  right: 15px;
  width: 100%;
  height: 7.5%;
  // 투명하게 설정
  background-color: transparent;
  z-index: 9;
`;

const ImageButton = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;


const NaverLoginPage = () => {
  const handleNaverLoginClick = () => {
    window.location.href = "https://animore.co.kr/oauth2/authorization/naver";
  };

  return (
    <ImageButton
      src="https://clova-phinf.pstatic.net/MjAxODAzMjlfOTIg/MDAxNTIyMjg3MzM3OTAy.WkiZikYhauL1hnpLWmCUBJvKjr6xnkmzP99rZPFXVwgg.mNH66A47eL0Mf8G34mPlwBFKP0nZBf2ZJn5D4Rvs8Vwg.PNG/image.png"
      alt="Naver Login"
      onClick={handleNaverLoginClick} // 네이버 로그인 처리 함수 연결
    />
  );
};

// 구글 로그인 버튼 컴포넌트
const GoogleLoginPage = () => {
  const handleGoogleLoginClick = () => {
    window.location.href = "https://animore.co.kr/oauth2/authorization/google";
  };
  return (
    <ImageButton
      src="https://cloud.adofai.gg/apps/files_sharing/publicpreview/cj4GTz3xLmExWjG?file=/image%2041.png&fileId=7626&x=1920&y=1080&a=true"
      alt="Google Login"
      onClick={handleGoogleLoginClick} // 구글 로그인 처리 함수 연결
    />
  );
};

// 페이스북 로그인 버튼 컴포넌트
const FacebookLoginPage = () => {
  const handleFacebookLoginClick = () => {
    window.location.href = "https://animore.co.kr/oauth2/authorization/facebook";
  };

  return (
    <ImageButton
      src="https://cloud.adofai.gg/apps/files_sharing/publicpreview/cj4GTz3xLmExWjG?file=/image%2040.png&fileId=7625&x=1920&y=1080&a=true"
      alt="Facebook Login"
      onClick={handleFacebookLoginClick} // 페이스북 로그인 처리 함수 연결
    />
  );
};

// 카카오톡 로그인 버튼 컴포넌트
const KakaoLoginPage = () => {
  const handleKakaoLoginClick = () => {
    window.location.href = "https://animore.co.kr/oauth2/authorization/kakao";
  };

  return (
    <ImageButton
      src="https://cloud.adofai.gg/apps/files_sharing/publicpreview/cj4GTz3xLmExWjG?file=/image%2036.png&fileId=7624&x=1920&y=1080&a=true"
      alt="Kakao Login"
      onClick={handleKakaoLoginClick}
    />
  );
};


const SignupPopup = styled.div`
  // 팝업창 스타일
  width: 480px;
  height: 310px;
  position: fixed;
  top: 50%;
  left: 50%;
  align-items: center;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  background-image: url(background-image.jpg);
  background-size: cover;
  border: 2px solid #C0C0C0;
  border-radius: 30px;
  margin: 0;
  padding: 0;
`;

const TopImage = styled.img`
  width: 60%;
  height: 70px;
  position: absolute;
  top: 20%;
`;

const Message = styled.p`
  text-align: center;
  position: absolute;
  top: 41%;
  font-family: NanumBarunGothic;
  font-size: 18px;

  color: #B33E86;
  display: flex;
  align-items: center;
  color: #000000;
  white-space: pre-line; // 줄바꿈을 위한 설정
`;

const SignupButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  position: absolute;
  top: 68%;
`;

const SignupButton = styled.button`
  width: 175px;
  height: 50px;
  background-color: #A0136A;
  color: #FFFFFF;
  font-size: 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 5px;
  font-family: NanumBarunGothic;
  /* font-weight: bold; */
  letter-spacing: -2px; /* 글자 간격을 좁게 설정 */
`;

const CancelButton = styled.button`
  width: 175px;
  height: 50px;
  background-color: #FFFFFF;
  color: black;
  font-size: 25px;
  border: 2px solid #A0136A;
  border-radius: 10px;
  cursor: pointer;
  margin: 5px;
  padding: 0px;
  font-family: NanumBarunGothic;
  /* font-weight: bold; */
  letter-spacing: -2px; /* 글자 간격을 좁게 설정 */
`;


const PopupContainer = styled.div`
  // 크기
  width: 480px;
  height: 310px;
  position: fixed;

  // 가운데 위치
  top: 50%;
  left: 50%;
  align-items: center;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  background-image: url(background-image.jpg);
  background-size: cover;

  // 테두리
  border: 2px solid #C0C0C0;
  border-radius: 30px;
  margin: 0;
  padding: 0;
`;


const Text = styled.p`
  text-align: center;
  position: absolute;
  top: 43%;

  font-family: NanumBarunGothic;
  font-size: 18px;

  letter-spacing: -2px; /* 글자 간격을 좁게 설정 */
  color: #B33E86;
  display: flex;
  align-items: center;
  color: #000000;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  position: absolute;
  top: 65%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: NanumBarunGothic;
  font-size: 40px;
  color: #C0C0C0;
  transform: scaleY(0.8);
`;






// 회원가입 이동 팝업창
const SignupPopupComponent = ({ onClose }) => {
  const handleSignupClick = () => {
    // 회원 가입 창으로 이동하는 로직 작성
    // 예시: window.location.href = '/signup';
    // alert('회원 가입 창으로 이동합니다.');
    onClose(); // 팝업창 닫기
    window.location.href = '/api/signup';
  };

  const handleCancleClick = () => {
    onClose(); // 팝업 창 닫기
  };


  return (
    <SignupPopup>
      <TopImage src="https://cloud.adofai.gg/apps/files_sharing/publicpreview/cj4GTz3xLmExWjG?file=/10.png&fileId=7306&x=1920&y=1080&a=true" alt="animore" />
      <Message>AniMore에 처음 로그인 하셨습니다.<br />
        SNS 회원가입 화면으로 이동하시겠습니까?</Message>
      <SignupButtonContainer>
      <SignupButton onClick={handleSignupClick}>이동</SignupButton>
      <CancelButton onClick={handleCancleClick}>취소</CancelButton>
      </SignupButtonContainer> 
    </SignupPopup>
  );
};




function Header(props) {

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  // 처음 로그인을 구별하기 위한 변수
  const [isFirstLogin, setFirstLogin] = useState(false);
  
  const token = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjb3PthqDtgbAiLCJpZCI6MTIsImV4cCI6MTY5MzI0MjM2OSwidXNlcm5hbWUiOiJrYWthb18yOTcyNTIzOTYxIn0.8QVYIEr4SUpuo_KLBLdsDwaor42UkDxnXWDwN8ez-b9MfZtP14Ax4F4w25WajdMvE7wj5H6lS3yw6ZyiHcHY_Q`;

  useEffect(() => {
    // URL에서 토큰 값을 추출하여 처리하는 함수 
    const handleTokenFromURL = async () => {

      console.log(token);
      console.log(isLoggedIn);

      if (token != null) {
        // 유저 정보를 이용한 작업 수행
        console.log(isLoggedIn);

        setLoggedIn(true);
        setFirstLogin(true); // 추가
      }
    };
    // 컴포넌트 마운트 시 실행
    handleTokenFromURL();
  }, []);


  const handleLoginClick = () => {
    if(!token){
      setPopupOpen(true);
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    }
    console.log(isLoggedIn);
  };


  const handlePopupClose = () => {
    setPopupOpen(false);
    document.body.style.backgroundColor = "white"; // 팝업이 닫힐 때 화면 밝게 설정
  };

  const logout = () => {
    localStorage.removeItem("loginInfo");
    window.alert("로그아웃되었습니다.");
    setLoggedIn(false);
  };

  const handleLogoutClick = () => {
    if (window.confirm("정말 로그아웃하시겠습니까?")) {
      logout();
      // JWT 토큰을 제거
      localStorage.removeItem('jwtToken');
    }
  };



    return (
      <header className={props.location.pathname === '/' ? 'home-header' : ''}>
          <div className='logo'>
            {props.location.pathname === '/' ? null : <img src={Animore_logo} onClick={() => props.navigate('/')} alt="로고"></img>}
          </div>
          <div className={isPopupOpen ? 'hidden-header' : 'Navbar'}>
            <ul>
              <li
                className={props.location.pathname === '/' ? 'active' : ''}
                onClick={() => props.handleItemClick('/')}>홈</li>
              {isLoggedIn ? <li
                className={props.location.pathname.startsWith('/shop') ? 'active' : ''}
                onClick={() => props.handleItemClick('/shop')}>미용실</li>
                : <li
                  onClick={handleLoginClick}>미용실</li>}
              {isLoggedIn ? <li
                className={props.location.pathname.startsWith('/reservelist') ? 'active' : ''}
                onClick={() => props.handleItemClick('/reservelist')}>예약내역</li>
                : <li
                  onClick={handleLoginClick}>예약내역</li>}
              {isLoggedIn ? <li
                className={props.location.pathname.startsWith('/mypage') ? 'active' : ''}
                onClick={() => props.handleItemClick('/mypage')}>마이페이지</li>
                : <li
                  onClick={handleLoginClick}>마이페이지</li>}
              <li className={props.location.pathname === '/login' ? 'active' : ''}>
                {isLoggedIn ? (
                  <text onClick={handleLogoutClick}>로그아웃</text>
                ) : (
                  <text onClick={handleLoginClick}>로그인</text>
                )}
              </li>
            </ul>
          </div>

      {/* sns 로그인 팝업창 */}
      {isPopupOpen && (
        <div className="login-popup" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <div>
            <PopupContainer>
              <CloseButton onClick={handlePopupClose}>X</CloseButton>
              <TopImage src="https://cloud.adofai.gg/apps/files_sharing/publicpreview/cj4GTz3xLmExWjG?file=/10.png&fileId=7306&x=1920&y=1080&a=true" alt="animore" />
              <Text>SNS 계정으로 로그인</Text>
              <ButtonContainer>
                <KakaoLoginPage />
                <NaverLoginPage />
                <GoogleLoginPage />
                <FacebookLoginPage />
              </ButtonContainer>
              {/* jwt token을 받아왔고, 처음 로그인 했을 때 -> 추가회원가입 창이 오픈 */}
              {isLoggedIn && isFirstLogin && <SignupPopupComponent onClose={handlePopupClose} />}
            </PopupContainer>
          </div>
        </div>
      )}
      </header>
    )
  }

  export default Header;