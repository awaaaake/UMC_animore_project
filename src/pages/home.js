import { useEffect, useState } from "react";
import './home.css';
import profile from '../img/dog.png';
import grey from '../img/grey.png';
import axios from 'axios';

function Home(props) {
    let [Info, setInfo] = useState(null);

    useEffect(() => {
        //localStorage에서 access token을 가져옵니다.
        const accessToken = '';
        // access token을 인증 헤더에 설정합니다.
        axios.defaults.headers.common["Authorization"] = accessToken;

        axios.get('/mypage')
            .then((response) => {
                // result 객체를 petInfo 상태로 설정합니다.
                console.log(response.data);
                setInfo(response.data.result);
            }).catch((error) => {
                // 에러가 발생하면, 해당 에러 객체가 catch() 메서드의 매개변수인 error에 자동으로 전달됩니다.
                console.error('Error fetching pet information:', error);
            });
    }, []);

    // 데이터가 로딩 중일 때를 처리합니다.
    if (Info === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home">
            <div className="pet-profile">
                <div className='info2'>
                    <img src={Info.profileImgUrl} alt="반려견 사진" />
                    <div className="info">
                        <h4>{Info.nickname}님 안녕하세요!</h4>
                        <p>{Info.petType} : {Info.petName} / {Info.petAge}</p>
                    </div>
                </div>
                <button className="edit-profile-button" onClick={() => props.navigate('/mypage/profile')}>프로필 수정</button>
            </div>
            <div className="history">
                <p>최근 이용 기록</p>
                <div className="image-grid">
                    {Info.storeId_ImageUrl.map((item, i) => {
                        const storeId = Object.keys(item)[0];
                        const imageUrl = Object.values(item)[0];
                        return (
                            <div className="grid-item" key={i}>
                                <img
                                    src={imageUrl}
                                    alt={`Store ${storeId}`}
                                    onClick={() => props.navigate(`/reservation/${storeId}`)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;