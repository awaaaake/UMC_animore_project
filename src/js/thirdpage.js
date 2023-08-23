import React, { useRef } from 'react';
import { styled } from 'styled-components';
import ReviewGallery from './reviewgallery';
import Footer from './footer';

const Background = styled.div`
  background-size: contain;
  height: 85vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 204%;
  left: 50%;
  transform: translateX(-50%);
`;

const Text =  styled.div`  
  font-family: NanumBarunGothic;
  font-size: 25px;
  font-weight: bold;
  line-height: 92px;
  letter-spacing: 0em;
  text-align: center; /* 이미지와 같은 줄에 표시 되도록 설정 */
  white-space: nowrap; /* 텍스트가 한 줄에 표시되도록 설정 */
  display: flex;
  align-items: center;
  letter-spacing: 1px; /* 글자 간격을 좁게 설정 */
  color: #B33E86;
`;


const ThirdBody = () => {
  return (
    <Background>

      <TextContainer>
        <Text>
          8월의 애니모어 이용후기
        </Text>
      </TextContainer>

      {/* 이용 후기 */}
      <ReviewGallery/>

    </Background>
  );
};

export default ThirdBody;