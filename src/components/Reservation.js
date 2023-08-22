import React, { useState, useEffect } from "react";
import "@popperjs/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectPage from './selectPage';
import './Reservation.css';
import Radio from './radio';
import RadioGroup from './radioGroup';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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

    const handleOptionChange = (type, value) => {
        console.log(`선택한 값 : ${type} ${value}`);
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [type]: value
        }));
    };

    const navigate = useNavigate();

    const handleRadioChange = (name, value) => {
        setSelectedValue((prevValues) => [...prevValues, value]);
        console.log(value)
    };

    useEffect(() => {
        console.log('선택', selectedValue); // 선택 값이 변경될 때마다 로그 출력
    }, [selectedValue]); // selectedValue가 변경될 때만 이펙트 실행

    const handleNextClick = () => {

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
                dogSize: selectedValues.dogSize,
                cutStyle: selectedValues.cutStyle,
                bathStyle: selectedValues.bathStyle
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
                <a className="save" href="#" onClick={handleShwoDetails}>저장내용불러오기</a>
            </div>

            <div className="table_box">
                <table className="table tablee"  >
                    {/* <thead>
                        <tr>
                            <th scope="col" style={{ background: '#F5F5F5', width: 213 }}>반려동물 이름</th>
                            <th style={{ width: 277, height: 40.4 }}>{showDetails && (<p style={{ height: 10 }}>{data.result.petName}</p>)}</th>
                            <th scope="col" style={{ background: '#F5F5F5', width: 344 }}>이름</th>
                            <th style={{ width: 277, height: 40.4 }}>{showDetails && (<p style={{ height: 10 }}>{data.result.nickname}</p>)}</th>
                        </tr>
                        
                    </thead> */}
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
                                            <label htmlFor={option.value} className="radio-label" style={{width:94.84}}>
                                                <input 
                                                    id={option.value}
                                                    value={option.value}
                                                    name="dogSize"
                                                    type="radio"
                                                    checked={selectedValues.dogSize === option.value}
                                                    onChange={() => handleOptionChange('dogSize', option.value)}
                                                    style={{width:20}}
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
                                            <label htmlFor={option.value} className="radio-label" style={{width:94.84}}>
                                            <input
                                                id={option.value}
                                                value={option.value}
                                                name="cutStyle"
                                                type="radio"
                                                checked={selectedValues.cutStyle === option.value}
                                                onChange={() => handleOptionChange('cutStyle', option.value)}
                                                style={{width:20}}
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
                                            <label htmlFor={option.value} className="radio-label" style={{width:94.84}}>
                                            <input
                                                id={option.value}
                                                value={option.value}
                                                name="bathStyle"
                                                type="radio"
                                                checked={selectedValues.bathStyle === option.value}
                                                onChange={() => handleOptionChange('bathStyle', option.value)}
                                                style={{width:20}}
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

            <Link to={{
        pathname: '/select', // 이동할 경로
        state: {
          reservationId: data.reservationId || null// 전달할 데이터
        }}}>
                <button className="next" onClick={handleNextClick}>다음</button>
            </Link>
        </div>

    );
}

export default Reservation;
