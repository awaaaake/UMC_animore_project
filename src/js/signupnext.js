import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 


const Background = styled.div`
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
`;

const Message = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  width: 33%;
  top: 20%;
  height: 70px;
  background-color: #FAE5F2;
  color: #A0136A;
  font-size: 28px;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  margin: 2px;
  font-family: NanumBarunGothic;
  font-weight: bold;
  letter-spacing: -2px; /* 글자 간격을 좁게 설정 */
`;



// 애니 모어와 함께 부분
const FirstTextContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 36%;
  left: 50%;
  transform: translateX(-50%);
`;

const ColorText = styled.div`
  font-family: NanumBarunGothic;
  font-size: 33px;
  line-height: 48px;
  display: flex;
  align-items: flex-end;
  letter-spacing: -2px;
  /* font-weight: bold; */
  color: #A0136A;
`;

const Padding1 = styled.div`
  padding-left: 10px; 
`;

const SecondTextContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translateX(-50%);
`;

const Text = styled.div`
  font-family: NanumBarunGothic;
  font-size: 33px;
  line-height: 48px;
  display: flex;
  align-items: flex-end;
  letter-spacing: -2px;
  /* font-weight: bold; */
`;

const TextImg = styled.img`
  width: 240px;
  height: 60px;
`;



const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  position: absolute;
  top: 65%;
`;

const HomeButton = styled.button`
  width: 50%;
  height: 50px;
  background-color: #A0136A;
  color: #FFFFFF;
  font-size: 22px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 2px;
  font-family: NanumBarunGothic;
  /* font-weight: bold; */
  letter-spacing: -2px; /* 글자 간격을 좁게 설정 */
`;

const ProfileButton = styled.button`
  width: 50%;
  height: 50px;
  background-color: #FFFFFF;
  color: #B33E86;
  font-size: 22px;
  border: 2px solid #B33E86;
  border-radius: 10px;
  cursor: pointer;
  margin: 2px;
  font-family: NanumBarunGothic;
  font-weight: bold;
  letter-spacing: -2px; /* 글자 간격을 좁게 설정 */
`;




const SignUpNext = () => {

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/api/');
  };
  const handleProfileClick = () => {
    navigate('/api/mypage/profile');
  };

  return (
    <Background>
      <Message>가입해주셔서 감사합니다!</Message>
      <FirstTextContainer>
        <Text>스마트한</Text>
        <Padding1></Padding1>
        <ColorText>반려인</ColorText>
        <Text>을 위한 반려동물 미용플랫폼</Text>
      </FirstTextContainer>

      <SecondTextContainer>
        <TextImg src="https://cloud.adofai.gg/apps/files_sharing/publicpreview/cj4GTz3xLmExWjG?file=/10.png&fileId=7306&x=1920&y=1080&a=true" alt="이미지" />
        <Text>와 함께하세요!</Text>
      </SecondTextContainer>

      <ButtonContainer>
        <HomeButton onClick={handleHomeClick}>홈화면으로 가기</HomeButton>
        <ProfileButton onClick={handleProfileClick}>프로필 설정하러가기</ProfileButton>
      </ButtonContainer>
    </Background>

  );
};

export default SignUpNext;