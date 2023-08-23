import React, { useEffect } from 'react';
import './profilepreview.css';
import './Upload.css';
import axios from 'axios';
import petstore from '../img/petstore.jpg';
import 픽업 from '../img/tags/Frame 61.png';
import 고양이 from '../img/tags/Frame 62.png';
import 스파 from '../img/tags/Frame 63.png';
import 피부병 from '../img/tags/Frame 64.png';
import 호텔링 from '../img/tags/Frame 65.png';
import 유치원 from '../img/tags/Frame 66.png';
import 특수동물 from '../img/tags/Frame 67.png';
import 공휴일 from '../img/tags/Frame 68.png';
import { useState } from 'react';

function Preview(props) {
    const tagsimg = {
        '픽업가능': 픽업,
        '고양이 미용가능': 고양이,
        '스파가능': 스파,
        '피부병치료': 피부병,
        '호텔링가능': 호텔링,
        '유치원겸용': 유치원,
        '특수동물가능': 특수동물,
        '공휴일운영': 공휴일
    };
    const [storeRecent, setStoreRecent]=useState(0);
    const storeId = 1;
    useEffect(() => {
        const token = useSelector(state => state.token);
        const accessToken = "Bearer "+ {token};
        axios.defaults.headers.common["Authorization"] = accessToken;

        axios.get(`/api/reviews/researvationinfo/${storeId}`)
            .then((response) => {
                console.log(response.data);
                setStoreRecent(response.data.result.storeDTO.storeRecent);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, []);

    return (
        <div className='container'>
            <div className='comp_r_image'>
                <img id='comp_img' src={props.selectedImage ? URL.createObjectURL(props.selectedImage) : props.defaultImageurl} alt="업체 사진"></img>
            </div>
            <div className='info_text'>
                <p id='title'>
                    {props.Info.storeName}
                    {props.Info.tags && props.Info.tags.map(tagItem => (
                        <span key={tagItem} id='tag'> #{tagItem}</span>
                    ))}
                </p>

                <p id='explain'>{props.Info.storeExplain} </p>
                <p id='locat'>위치: {props.Info.storeLocation} </p>
                <p id='ph_num'>전화번호: {props.Info.storeNumber} </p>
                <p id='ph_num'>영업시간: {props.Info.open} ~ {props.Info.close} </p>
                <p id='rec_book'>최근 예약건수: {storeRecent}</p>
                <div className="rounded-box">
                    {props.Info.storeSignificant && props.Info.storeSignificant.map((tag, index) => (
                        <div key={index} className='tag-box'>
                            {tagsimg[tag] && <img src={tagsimg[tag]} alt={tag}></img>}
                        </div>
                        // <div key={index} className="tag-box">
                        //     <p className="pink-background">
                        //         #{tag}
                        //     </p>
                        // </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Preview;
