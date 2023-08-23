import './Book.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Book() {
    const token = '';

    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    //0823 최근검색코드 -------------------------
    const [searchCurt, setSearchCurt] = useState([])
    const navigateToShop = (storeId) => {
        navigate(`/shop/${storeId}`);
    }
    const [searchCurt0storeDTO,setSearchCurt0storeDTO] = useState([])
    const [searchCurt1storeDTO,setSearchCurt1storeDTO] = useState([])
    const [searchCurt2storeDTO,setSearchCurt2storeDTO] = useState([])

    //0823 위치정보 전송 코드 ---------------------------
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    // 위치 정보 가져오기
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                error => {
                    console.error(error);
                }
            );
        } else {
            console.error('위치 제공 비동의');
        }
    };

    const sendLocationToServer = () => {
         if (latitude && longitude) {
            const formData = new FormData();
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);

            axios.patch(`/locations/1?latitude=${latitude}&longitude=${longitude}`
            , formData,{
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
                }
              })
                .then(response => {
                    console.log('위치전송완료:', response.data);
                })
                .catch(error => {
                    console.error('위치 전송 실패:', error);
                });
            }else{
                console.log('에러')
            }
    };

    useEffect(() => {
        axios.get('/search/recordstore', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setSearchCurt(response.data.result);
                setSearchCurt0storeDTO(response.data.result[0].storeDTO)
                setSearchCurt1storeDTO(response.data.result[1].storeDTO)
                setSearchCurt2storeDTO(response.data.result[2].storeDTO)
            })
            .catch(error => {
                // API 호출 실패 시 에러 처리
                console.error('API 호출 에러:', error);
            });
        getLocation(); 
        sendLocationToServer();
    }, []);
    //-----------------------------------------------------

    {/*엔터키 눌렀을 때 동작*/ }
    const onSubmitSearch = (e) => {
        if (e.key === "Enter") {
            navigate(`/search/${searchText}`);
        }
    }

    return (
        <div className='Book_mainBox'>
            <div className="searchBox">
                <img src='img/search_icon1.png' />
                <input id="searchBox" type="text" placeholder="포메라니안 가위컷 전문 샵"
                    onKeyDown={onSubmitSearch}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} />
            </div>
            <div className='recent'>
                <Container>
                    <div className="container1">
                        <p id="nic_text">OOO님의 최근 방문 기록</p>
                        <div className="row">
                            <div className="col">
                                <img src={searchCurt0storeDTO.storeImageUrl}
                                onClick={() => navigateToShop(searchCurt0storeDTO.storeId)}/>
                            </div>
                            <div className="col">
                                <img src={searchCurt1storeDTO.storeImageUrl}
                                onClick={() => navigateToShop(searchCurt1storeDTO.storeId)}/>
                            </div>
                            <div className="col">
                                <img src={searchCurt2storeDTO.storeImageUrl}
                                onClick={() => navigateToShop(searchCurt2storeDTO.storeId)}/>
                            </div>
                            {/* <div className="col">
                            </div>
                            <div className="col"></div>
                            <div className="col"></div> */}
                        </div>
                    </div>
                </Container>
            </div>
            <div className='many'>
                <Container>
                    <div className="container1">
                        <p id="nic_text">OOO님이 사시는 동네 예약 많은 순</p>
                        <div className="row">
                            <div className="col">
                                <img src={searchCurt0storeDTO.storeImageUrl}
                                onClick={() => navigateToShop(searchCurt0storeDTO.storeId)}/>
                            </div>
                            <div className="col">
                                <img src={searchCurt1storeDTO.storeImageUrl}
                                onClick={() => navigateToShop(searchCurt1storeDTO.storeId)}/>
                            </div>
                            <div className="col">
                                <img src={searchCurt2storeDTO.storeImageUrl}
                                onClick={() => navigateToShop(searchCurt2storeDTO.storeId)}/>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Book;