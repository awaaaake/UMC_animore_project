import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  height: 80px; // 아이콘 위치 고정 시키기 위해 컨테이너 높이 설정
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

const SearchInput = styled.input`
  padding: 8px;
  border-radius: 60px;
  border: 3px solid;
  border-radius: 20px;
  border-color: #000000;
  color: #d0caca;
  width: 550px;
  height: 50px;
  font-size: 20px;
`;

const SearchIcon = styled.div`
  position: fixed;
  top: 31%;  // 컨테이너안에 있는거라 비율에 맞춰 크기 조정
  right: 25px;
  transform: translateY(-50%);
  font-size: 25px;
  cursor: pointer;
  color: #000000;
  text-align: center; /* 이미지와 같은 줄에 표시 되도록 설정 */
`;


const SearchBox = ({ keywords }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const keyword = search.trim();
      if (keyword) {
        window.location.href = `/api/search/${keyword}`;
      }
    }
  };

  const filteredKeywords = keywords.filter((keyword) =>
    keyword.title.includes(search)
  );

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={search}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        placeholder="  우리집 근처 댕댕이 미용실은?"
      />
      <SearchIcon className="material-icons">🔍︎</SearchIcon>
      {search && filteredKeywords.length > 0 ? (
        filteredKeywords.map((keyword) => (
          <div key={keyword.id}>{keyword.title}</div>
        ))
      ) : (
        <div></div>
      )}
    </SearchContainer>
  );
};

const SearchResult = () => {
  const keywords = [
    { id: 1, title: '울산' },
    { id: 2, title: '서울' },
    { id: 3, title: '부산' },
    { id: 4, title: '울산 북구' },
    { id: 5, title: '울산 남구' },
    { id: 6, title: '울산 동구' },
    { id: 7, title: '울주군' },
    { id: 8, title: '울산 북구 매곡동' },
    { id: 9, title: '서울시 강남' },
    { id: 10, title: '서울시 동서로' },
    { id: 11, title: '대구'},
    { id: 12, title: '대전'},
    { id: 13, title: '광주'},
    { id: 14, title: '인천'},
    { id: 15, title: '포메라니안, 가위컷 전문, 베넷 미용'},
    { id: 16, title: '픽업가능, 고양이 미용가능}
    
    // 추가적인 지역 정보들...
  ];

  return (
    <div>
      {/* 로딩 여부에 따라 적절한 컴포넌트(로더 등)를 렌더링할 수 있도록 추가적인 로직을 구현하세요 */}
      <SearchBox keywords={keywords} />
    </div>
  );
};

export default SearchResult;
