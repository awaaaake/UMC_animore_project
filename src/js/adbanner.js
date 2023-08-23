import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BannerContainer= styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: #f1f1f1;
  height: 120px;
  width: 70%;
  top: 143%;
`;

const BannerImg= styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;


// AdBanner 컴포넌트 선언
const AdBanner = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0); // 현재 광고 인덱스 상태 변수
  const ads = ['ad1.jpeg', 'ad2.jpeg', 'ad3.jpeg']; // 다른 광고 이미지 파일 이름들

  // useEffect 훅을 사용하여 광고 변경 인터벌 설정
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length); // 광고 인덱스 업데이트
    }, 5000); // 5초마다 광고 변경

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => {
      clearInterval(interval);
    };
  }, []);

  // JSX를 반환하여 광고 배너 표시
  return (
    <BannerContainer>
      {/* ads변수를 이용해 다른 광고(이미지) 표시 */}
      {/* <BannerImg src={`/public/img/ad/${ads[currentAdIndex]}`} alt="Ad" /> */}
      <BannerImg src="https://postfiles.pstatic.net/MjAyMzA4MjNfMiAg/MDAxNjkyNzgwMDgxNTA3.3q4fr_xbFTPyKX-jXRRx3TMR9ITFTBIqtSvX-VhJ9QYg.TG1mj7ma5YoWsDbkSsIfYnPuFOYHTilyzZSKuRcvOzYg.PNG.ty4ove/%EC%A0%9C%EB%AA%A9%EC%9D%84-%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001_(6)_1.png?type=w966"/>
    </BannerContainer>
  );
};

export default AdBanner;
