import React, { useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 220%;
  height: 400px;
  width: 100%;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 100px;
  line-height: 100px;
  cursor: pointer;
  margin: 10px;
`;

const DivGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Div = styled.div`
  width: 300px;
  height: 400px;
  margin: 28px;
  background-color: #FAE5F2;
  border: 2px solid;
  border-color: #B33E86;
  font-size: 30px;    
`;



const ReviewGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalDivs = 9; // 전체 <div> 개수
  const divsPerPage = 3; // 페이지당 표시되는 <div> 개수
  const totalPages = Math.ceil(totalDivs / divsPerPage); // 총 페이지 수

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalPages - 1 ? 0 : prevIndex + 1));
  };

  const handleDivClick = (index) => {
    switch (index) {
      case 0:
        window.location.href = 'https://www.example1.com'; // 첫 번째 div를 클릭했을 때 이동할 사이트 주소
        break;
      case 1:
        window.location.href = 'https://www.example2.com'; // 두 번째 div를 클릭했을 때 이동할 사이트 주소
        break;
      case 2:
        window.location.href = 'https://www.example3.com'; // 세 번째 div를 클릭했을 때 이동할 사이트 주소
        break;
      case 3:
        window.location.href = 'https://www.example4.com'; // 세 번째 div를 클릭했을 때 이동할 사이트 주소
        break;

      // 추가적인 div 클릭 시 이동할 사이트 주소 추가.....
      default:
        break;
    }
  };

  const renderDivs = () => {
    const startIndex = currentIndex * divsPerPage;
    const endIndex = startIndex + divsPerPage;

    return Array.from({ length: totalDivs }, (_, index) => (
      <Div
        key={index}
        style={{ display: index >= startIndex && index < endIndex ? 'block' : 'none' }}
        onClick={() => handleDivClick(index)}
      >
        <div>{`이용후기${index + 1}`}</div> {/* 각 div에 특징 추가 */}
      </Div>
    ));
  };

  return (
    <Container>
      <ArrowButton onClick={handlePrevClick}>{'<'}</ArrowButton>
      <DivGroup>{renderDivs()}</DivGroup>
      <ArrowButton onClick={handleNextClick}>{'>'}</ArrowButton>
    </Container>
  );
};

export default ReviewGallery;

