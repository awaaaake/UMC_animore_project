import React, { useRef } from 'react';
import { styled } from 'styled-components';

import AdBanner from './adbanner'; 
import SaleGallery from './salegallery';
import MostGallery from './mostgallery';

  const Background = styled.div`
    background-size: contain;
    height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `;
 
  const FirstTextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 101%;
    left: 50%;
    transform: translateX(-50%);
  `;

  const SecondTextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 160%;
    left: 50%;
    transform: translateX(-50%);
    width: 450px;
  `;


    const Text = styled.div`  
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



const SecondPage = () => {
  return (
    <Background> 

      <FirstTextContainer>
        <Text>
          지금 애니모어에서만 할인!
        </Text>
      </FirstTextContainer>

      {/* 할인 목록 */}
      <SaleGallery/>

      {/* 광고 배너 */}
      <AdBanner />
      
      <SecondTextContainer>
        <Text>
          요즘 부산광역시 핫한 샵
        </Text>
      </SecondTextContainer>

      {/* 인기 순위 */}
      <MostGallery/>


    </Background>
  );
};

export default SecondPage;