import React, { useState, useEffect } from "react";
// import "@popperjs/core";
// import 'bootstrap/dist/css/bootstrap.min.css';
import SelectPage from './selectPage';
import './Reservation.css';
import Radio from './radio';
import RadioGroup from './radioGroup';
import axios from "axios";
import { Link } from "react-router-dom";

function Reservation({ props }) {
    
    const [data, setData] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const [showSelectPage, setShowSelectPage] = useState(false);
    const [selectedSpecies, setSelectedSpecies] = useState('');
    const [selectedCut, setSelectedCut] = useState('');
    const [selectedBath, setSelectedBath] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({
        dogSize: '',
        cutStyle: '',
        bathStyle: ''
    });

    const handleRadioChange = (name, value) => {
        setSelectedValue((prevValues) => [...prevValues, value]);
    };

    useEffect(() => {
        console.log('선택', selectedValue); // 선택 값이 변경될 때마다 로그 출력
    }, [selectedValue]); // selectedValue가 변경될 때만 이펙트 실행

    const handleNextClick = () => {
        setShowSelectPage(true);

        const token = '';
        axios({
            method: 'POST',
            url: '/booking/create',
            headers: {
                Authorization: `Bearer ${token}`, // Bearer 토큰을 "Authorization" 헤더에 추가
                ContentType: 'application/json'
            },
            data: {
                storeId: 1,
                dogSize: selectedOptions.dogSize,
                cutStyle: selectedOptions.cutStyle,
                bathStyle: selectedOptions.bathStyle
            }


        })
            .then(response => {
                setData(response.data);
                setShowDetails(true);
                console.log('성공:', response.data);

            })
            .catch(error => {
                console.error('에러 발생:', error.response);
            });
    };

    const handleShwoDetails = () => {

        // 데이터 요청
        const token = '';
        axios({
            method: 'GET',
            url: '/userInfo',
            headers: {
                Authorization: `Bearer ${token}` // Bearer 토큰을 "Authorization" 헤더에 추가
            }
        })
            .then(response => {
                setData(response.data);
                setShowDetails(true);
                console.log('성공:', response.data);

            })
            .catch(error => {
                console.error('에러 발생:', error);
            });

    };


    return (
        <div className="main_R">

            <div className="ment">
                <p className="detail">예약상세</p>
                <a className="save" href="" onClick={handleShwoDetails}>저장내용불러오기</a>
            </div>

            <div className="table_box">
                <table className="table tablee"  >
                    <thead>
                        <tr >
                            <th scope="col" style={{ background: '#F5F5F5', width: 213}}>반려동물 이름</th>
                            <th style={{ width: 277, height: 40.4 }}>{showDetails && (<p style={{ height: 10 }}>{data.result.petName}</p>)}</th>
                            <th scope="col" style={{ background: '#F5F5F5', width: 344 }}>이름</th>
                            <th style={{ width: 277, height: 40.4 }}>{showDetails && (<p style={{ height: 10 }}>{data.result.nickname}</p>)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" style={{ background: '#F5F5F5' }}>반려동물 종류</th>
                            <td>{showDetails && (<p style={{ height: 10 }}>{data.result.petType}</p>)}</td>
                            <td style={{ background: '#F5F5F5' }}>전화번호</td>
                            <td>{showDetails && (<p style={{ height: 10 }}>{data.result.telephone}</p>)}</td>
                        </tr>
                        <tr>
                            <th scope="row" style={{ background: '#F5F5F5' }}>반려동물 성별</th>
                            <td>{showDetails && (<p style={{ height: 10 }}>{data.result.petGender}</p>)}</td>
                            <td style={{ background: '#F5F5F5' }}>주소</td>
                            <td>{showDetails && (<p style={{ height: 10 }}>{data.result.address}</p>)}</td>
                        </tr>
                        <tr>
                            <th scope="row" rowSpan="3" style={{ background: '#F5F5F5' }}>메뉴선택</th>
                            <td colSpan="3">

                                <RadioGroup onChange={handleRadioChange}>
                                    <Radio name="dogSize" value="MEDIUM">중,소형견</Radio>
                                    <Radio name="dogSize" value="LARGE" >대형견</Radio>
                                </RadioGroup>


                            </td>
                        </tr>

                        <tr>
                            <td colSpan="3">
                                <RadioGroup onChange={handleRadioChange}>
                                    <Radio name="cutStyle" value="SCISSORS_CUT" >가위컷</Radio>
                                    <Radio name="cutStyle" value="MACHINE_CUT">기계컷</Radio>
                                    <Radio name="cutStyle" value="SPOTTING_CUT">스포팅</Radio>
                                    <Radio name="cutStyle" value="CLIPPING_CUT" >클리핑</Radio>
                                    <Radio name="cutStyle" value="PARTICAL_CUT" >부분미용</Radio>
                                </RadioGroup>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="3"  style={{ borderBottom: '0.1'}}>
                                <RadioGroup onChange={handleRadioChange}>
                                    <Radio name="bathStyle" value="BATH" >목욕</Radio>
                                    <Radio name="bathStyle" value="HEALING">힐링스파</Radio>
                                    <Radio name="bathStyle" value="CARBONATED" >탄산스파</Radio>
                                </RadioGroup>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Link to="/select">
                <button className="next" onClick={handleNextClick}>다음</button>
            </Link>
        </div>

    );
}

export default Reservation;
