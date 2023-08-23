import './Search.css'
import { useState, useEffect } from 'react';
import Pagination from '../Pagination/pagination.js';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Search() {
  const token = useSelector(state => state.token);

  //정렬 상태관리
  const [popularColor, setPopularColor] = useState(true);
  const [reviewColor, setReviewColor] = useState(false);
  const [distanceColor, setDistanceColor] = useState(false);

  const handlePopularClick = () => {
    setPopularColor(true);
    setReviewColor(false);
    setDistanceColor(false);
  };

  const handleReviewClick = () => {
    setPopularColor(false);
    setReviewColor(true);
    setDistanceColor(false);
  };

  const handleDistanceClick = () => {
    setPopularColor(false);
    setReviewColor(false);
    setDistanceColor(true);
  };

  //페이지이동 
  const navigate = useNavigate()
  const navigateToCompany = (storeId) => {
    navigate(`/shop/${storeId}`);
  }

  //검색어 전달받는 친구
  const { searchText } = useParams();

  //샵 정보 담는 배열
  const [ShopInfoList, setShopInfoList] = useState([]);

  //--------------------------API연결--------------------------------
  const query1 = encodeURIComponent('해시태그:' + searchText);
  const query2 = encodeURIComponent(searchText);
  //서버 요청 주소
  const shopApiUrl = `/api/search/distance?query1=${query1}&query2=${query2}`;
  useEffect(() => {
    axios.get(shopApiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // API 호출 성공 시 데이터를 상태에 저장
        setShopInfoList(response.data.result);
      })
      .catch(error => {
        // API 호출 실패 시 에러 처리
        console.error('API 호출 에러:', error);
      });
  }, []); 
  
  {/*페이지네이션을 위한 state들 */ }
  const [limit] = useState(4);
  const [page, setPage] = useState(1);
  //const offset = (page - 1) * limit;

  const [currentShopInfo, setCurrentShopInfo] = useState([]);


  // ShopInfoList가 변경되면 currentShopInfo 업데이트
  useEffect(() => {
    if (ShopInfoList.length > 0) { // ShopInfoList가 업데이트된 경우에만 실행
      const offset = (page - 1) * limit;
      const currentShopInfo = ShopInfoList.slice(offset, offset + limit);
      setCurrentShopInfo(currentShopInfo);
    }
    else {
    }
  }, [page, ShopInfoList]);

  const mapShopInfo = () => {
    return currentShopInfo.map((shop) => (
      <div key={shop.storeId} className='co1'>
        <img id='com_img' 
        src={shop.storeImageUrl ? shop.storeImageUrl : '/img/rectangle76.png'}
        alt='shopImage' />
        <p id='com_name'>{shop.storeName}</p>
        <div id='com_info'>
          <p>{shop.storeLocation}</p>
          <div>
            {shop.tags.map((tag, index) => (
              <span key={index}>
                {index > 0 ? " " : ""}
                #{tag}
              </span>
            ))}
          </div>
          <div id='num_but'>
            <p>전화번호: {shop.storeNumber}</p>
            <button id='b_but' 
            onClick={() => navigateToCompany(shop.storeId)}>
              지금바로 예약하기</button>
          </div>
        </div>
      </div>
    ));
  };

  //0818 수정사항 -------------------------------------
  const makeSearchResult = () => {
    if (ShopInfoList.length > 0) {
      return (mapShopInfo());
    }
    else {
      return (<p id='not_search'><span id='not_search_text'>{searchText}</span> 에 대한 검색 결과가 없습니다.</p>);
    }
  }
  //---------------------------------------------------

  return (
    <div>
      <div className="search_result">
        <p><span id="search_text">{searchText}</span> 의 검색결과입니다.</p>
      </div>
      <div id='line'></div>
      {/* <div className='how_range'>
        <p id='popular_ran' onClick={handlePopularClick}
          style={{ color: popularColor ? '#A0136A' : 'black' }}
        >인기순</p>
        <p id='review_ran' onClick={handleReviewClick}
          style={{ color: reviewColor ? '#A0136A' : 'black' }}>후기많은순</p>
        <p id='distance_ran' onClick={handleDistanceClick}
          style={{ color: distanceColor ? '#A0136A' : 'black' }}>거리순</p>
      </div>
      <div id='line'></div> */}

      <div className="company_box">
        <div className="company_info">
          {makeSearchResult()}
        </div>
      </div>

      {/*페이지네이션 버튼 */}
      <footer className="Pagina">
        {ShopInfoList.length > 0 && (
          <Pagination
            total={ShopInfoList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        )}
      </footer>
      <div id='line'></div>
    </div>
  );
}

export default Search;