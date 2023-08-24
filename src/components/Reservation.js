import React, { useState } from "react";
import "@popperjs/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reservation.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Reservation({ props }) {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const options = [
        { label: '중,소형견', value: 'MEDIUM', type: 'dogSize' },
        { label: '대형견', value: 'LARGE', type: 'dogSize' },
        { label: '가위컷', value: 'SISSOR_CUT', type: 'cutStyle' },
        { label: '기계컷', value: 'MACHINE_CUT', type: 'cutStyle' },
        { label: '스포팅', value: 'SPOTTING_CUT', type: 'cutStyle' },
        { label: '클리핑', value: 'CLIPING_CUT', type: 'cutStyle' },
        { label: '부분미용', value: 'PARTICAL_CUT', type: 'cutStyle' },
        { label: '목욕', value: 'BATH', type: 'bathStyle' },
        { label: '힐링스파', value: 'HEALING', type: 'bathStyle' },
        { label: '탄산스파', value: 'CARBONATED', type: 'bathStyle' },
    ];

    const [selectedValues, setSelectedValues] = useState({
        dogSize: '',
        cutStyle: '',
        bathStyle: ''
    });

    const isDataSelected = () => {
        // 라디오버튼 값 선택안되면 다음버튼 안눌러지게
        return selectedValues.dogSize && selectedValues.cutStyle && selectedValues.bathStyle;
    };
    
    
    //라디오 버튼으로 선택한 값
    const handleOptionChange = (type, value) => {
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [type]: value
        }));
    };

    //다음 버튼 누르면 post요청 -> reservationId 받아옴
    const handleNextClick = () => {
        const token = '';
        axios({
            method: 'POST',
            url: '/api/booking/create',
            headers: {
                Authorization: `Bearer ${token}`, // Bearer 토큰을 "Authorization" 헤더에 추가
                ContentType: 'application/json'
            },
            data: {
                storeId: 1,
                dogSize: selectedValues.dogSize,
                cutStyle: selectedValues.cutStyle,
                bathStyle: selectedValues.bathStyle
            }


        })
            .then(response => {
                setData(response.data);
                setShowDetails(true);
                console.log('성공:', response.data);
                const reservationId = response.data.reservationId;
                navigate('/select', {               //요청 응답 오면 다음페이지로 넘어감
                    state: {
                        reservationId: reservationId
                    }
                });
            })
            .catch(error => {
                console.error('에러 발생:', error.response);
            });

    };
    
    //저장내용 불러오기 누르면 get요청
    const handleShwoDetails = () => {
        const token = '';
        axios({
            method: 'GET',
            url: '/api/userInfo',
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

                    <tbody>
                        <tr>
                            <th scope="col" style={{ background: '#F5F5F5', width: 213 }}>반려동물 이름</th>
                            <th style={{ width: 277, height: 40.4 }}>{showDetails && (<p style={{ height: 10 }}>{data.result.petName}</p>)}</th>
                            <th scope="col" style={{ background: '#F5F5F5', width: 344 }}>이름</th>
                            <th style={{ width: 277, height: 40.4 }}>{showDetails && (<p style={{ height: 10 }}>{data.result.nickname}</p>)}</th>
                        </tr>
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

                                {options
                                    .filter((option) => option.type === 'dogSize')
                                    .map((option, i) => (
                                        <React.Fragment key={i}>
                                            <label htmlFor={option.value} className="radio-label" style={{ width: 94.84 }}>
                                                <input
                                                    id={option.value}
                                                    value={option.value}
                                                    name="dogSize"
                                                    type="radio"
                                                    checked={selectedValues.dogSize === option.value}
                                                    onChange={() => handleOptionChange('dogSize', option.value)}
                                                    style={{ width: 20 }}
                                                />
                                                {option.label}
                                            </label>
                                        </React.Fragment>
                                    ))}

                            </td>
                        </tr>

                        <tr>
                            <td colSpan="3">
                                {options
                                    .filter((option) => option.type === 'cutStyle')
                                    .map((option, i) => (
                                        <React.Fragment key={i}>
                                            <label htmlFor={option.value} className="radio-label" style={{ width: 94.84 }}>
                                                <input
                                                    id={option.value}
                                                    value={option.value}
                                                    name="cutStyle"
                                                    type="radio"
                                                    checked={selectedValues.cutStyle === option.value}
                                                    onChange={() => handleOptionChange('cutStyle', option.value)}
                                                    style={{ width: 20 }}
                                                />
                                                {option.label}
                                            </label>
                                        </React.Fragment>

                                    ))}


                            </td>
                        </tr>

                        <tr>
                            <td colSpan="3">

                                {options
                                    .filter((option) => option.type === 'bathStyle')
                                    .map((option, i) => (
                                        <React.Fragment key={i}>
                                            <label htmlFor={option.value} className="radio-label" style={{ width: 94.84 }}>
                                                <input
                                                    id={option.value}
                                                    value={option.value}
                                                    name="bathStyle"
                                                    type="radio"
                                                    checked={selectedValues.bathStyle === option.value}
                                                    onChange={() => handleOptionChange('bathStyle', option.value)}
                                                    style={{ width: 20 }}
                                                />
                                                {option.label}
                                            </label>
                                        </React.Fragment>
                                    ))}

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* selectpage로 reservationId값 전달 */}
                <button className={isDataSelected() ? 'next' : 'inactive'} onClick={handleNextClick}  disabled={!isDataSelected()} >다음</button>
        </div>

    );
}

export default Reservation;