import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import styled  from 'styled-components';

import Search from './search';
import HeaderResult from './header';



//backgraound 이미지 설정
  const Background = styled.div`
  background-image: url('https://cloud.adofai.gg/apps/files_sharing/publicpreview/cj4GTz3xLmExWjG?file=/Group%207.png&fileId=7563&x=1920&y=1080&a=true');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//Animore 위에 글자
const FirstTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 33%;
  left: 50%;
  transform: translateX(-50%);
`;


const FirstText = styled.div`
  font-family: NanumBarunGothic;
  font-size: 27px;
  font-weight: 600;
  line-height: 92px;
  letter-spacing: 0em;
  text-align: center; /* 이미지와 같은 줄에 표시 되도록 설정 */
  white-space: nowrap; /* 텍스트가 한 줄에 표시되도록 설정 */
  display: flex;
  align-items: center;
  letter-spacing: -2px; /* 글자 간격을 좁게 설정 */
  color: #B33E86;
`;

const FirstextImg = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 5px;
`;

// 중앙 Animore 글자 
const Maintext = styled.div`
  font-family: NanumBarunGothic;
  font-size: 82px;
  font-weight: 600;
  line-height: 259px;
  letter-spacing: 0em;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  letter-spacing: -2px; /* 글자 간격을 좁게 설정 */
`;




const FirstPage = () => {

  return (
    <Background >
      {/* header 추가 */}
      {/* <HeaderResult/> */}

      {/* 우리집 막내를 위한 더 나은 선택 */}
      <FirstTextContainer>
        <FirstText>우리집 막내<FirstextImg src="https://cloud.adofai.gg/apps/files_sharing/publicpreview/cj4GTz3xLmExWjG?file=/image-removebg-preview%20(11)%201.png&fileId=7614&x=1920&y=1080&a=true" alt="이미지" />를 위한 더 나은 선택</FirstText>
      </FirstTextContainer>
      
      {/* Animore */}
      <Maintext>Animore</Maintext>

      {/* 검색 바 추가 */}
      <Search/> 
    </Background>
  );
};

export default FirstPage;
