import React, { useState,useEffect } from "react";
import "@popperjs/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reservation.css';
import Radio from './radio';
import RadioGroup from './radioGroup';
import './table.css';
import axios from "axios";
// 상세보기

function Table ({ reservationId }){
    const [data, setData] = useState({});
  useEffect(() => {
    const token = ''; // 토큰 추가

    axios({
      method: 'GET',
      url: `/api/booking/details/${reservationId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setData(response.data.result);
        console.log('성공:', response.data);
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
     } ,[reservationId]);


        // const className = this.props.page === 1 ? 'page-one' : 'page-two';
        //페이지1=고객 페이지2=업체 즉
        return(
                <div className="table_box my-component ${className}">
                    <table className="table tablee" >
                            <thead>
                                {/* <tr>
                                    <th scope="col"  style={{ background: '#F5F5F5', width: 180 ,paddingTop:5}}>반려동물 이름</th>
                                    <th scope="col"style={{ width: 180  ,paddingTop:5}}>{data.petName}</th>
                                    <th  scope="col"  style={{ background: '#F5F5F5', width: 180  ,paddingTop:5}}>이름</th>
                                    <th scope="col">{data.username}</th>
                                </tr> */}
                            </thead>
                            <tbody>
                            <tr>
                                    <th scope="col"  style={{ background: '#F5F5F5', width: 180 ,paddingTop:5}}>반려동물 이름</th>
                                    <th scope="col"style={{ width: 180  ,paddingTop:5}}>{data.petName}</th>
                                    <th  scope="col"  style={{ background: '#F5F5F5', width: 180  ,paddingTop:5}}>이름</th>
                                    <th scope="col">{data.username}</th>
                                </tr>
                                <tr>
                                    <th  scope="col" style={{background:'#F5F5F5' ,paddingTop:5}}>반려동물 종류</th>
                                    <td>{data.petType}</td>
                                    <td  style={{background:'#F5F5F5' ,paddingTop:5}}>전화번호</td>
                                    <td>{data.phone}</td>
                                </tr>
                                <tr>
                                    <th  scope="col" style={{background:'#F5F5F5'}}>반려동물 성별</th>
                                    <td>{data.petGender}</td>
                                    <td  className="table-header"  style={{background:'#F5F5F5' }}>주소</td>
                                    <td>{data.address}</td>
                                </tr>
                                <tr>
                                    <th  scope="col" rowSpan="3" style={{background:'#F5F5F5'}}>메뉴선택</th>
                                    <td colSpan="3">                                    
                                        <tr className="radio_row">    
                                            <RadioGroup>
                                            <Radio name="species" value="small" checked={data.dogSize === 'MEDIUM'} readOnly={true} >중,소형견</Radio>
                                            <Radio name="species" value="big" checked={data.dogSize === 'LARGE'} readOnly={true}>대형견</Radio>
                                            </RadioGroup>
                                        </tr>
                                            
                                    </td>    
                                </tr>

                                <tr>
                                    <td colSpan="3">
                                    <RadioGroup>
                                        <Radio name="cut" value="SCISSORS_CUT"checked={data.cutStyle === 'SCISSORS_CUT'} readOnly={true}  >가위컷</Radio>
                                        <Radio name="cut" value="MACHINE_CUT"checked={data.cutStyle === 'MACHINE_CUT'} readOnly={true} >기계컷</Radio>
                                        <Radio name="cut" value="SPOTTING_CUT"checked={data.cutStyle === 'SPOTTING_CUT'} readOnly={true} >스포팅</Radio>
                                        <Radio name="cut" value="CLIPPING_CUT"checked={data.cutStyle === 'CLIPPING_CUT'} readOnly={true}  >클리핑</Radio>
                                        <Radio name="cut" value="PARTICAL_CUT"checked={data.cutStyle === 'PARTICAL_CUT'} readOnly={true} >부분미용</Radio>
                                    </RadioGroup>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan="3">
                                    <RadioGroup>
                                        <Radio name="bathStyle" value="bagic"checked={data.bathStyle === 'BATH'}  readOnly={true}>목욕</Radio>
                                        <Radio name="bathStyle" value="HEALING"checked={data.bathStyle === 'HEALING'} readOnly={true}>힐링스파</Radio>
                                        <Radio name="bathStyle" value="CARBONATED"checked={data.bathStyle === 'CARBONATED'} readOnly={true}>탄산스파</Radio>
                                    </RadioGroup>
                                    </td>                                    
                                </tr>
                            </tbody>
                    </table>  
                </div>

        )
    
        
}


export default Table;