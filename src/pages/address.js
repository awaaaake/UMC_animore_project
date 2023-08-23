import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import './address.css';

function Address(props) {
    const [addressValue, setAddressValue] = useState(props.Info.storeLocation);
    const KAKAOMAP_API = process.env.REACT_APP_KAKAOMAP_API;
    const complete = (data) => {
        let fullAddress = data.address;
        setAddressValue(data.address);
        let extraAddress='';
        console.log(fullAddress);
        if(data.addressType==='R'){
            if(data.bname !=='') {
                extraAddress+=data.bname;
            }
            if(data.buildingName !== ''){
                extraAddress += (extraAddress !==''?`,${data.buildingName}` : data.buildinName);
            }
            fullAddress += (extraAddress !==''?`(${extraAddress})` : '');
        }

        console.log(data);
        console.log(fullAddress);
        console.log(data.zonecode);

        props.setInfo(prevInfo => ({
            ...prevInfo,
            storeLocation: fullAddress
        }));
    }
    
    useEffect(() => {
        if (addressValue) {
            axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${addressValue}`, {
                headers: { Authorization: `KakaoAK ${KAKAOMAP_API}`},
            })
            .then(res => {
                const location = res.data.documents[0];
                if (location && location.road_address) {
                    props.setInfo(prevInfo => ({
                        ...prevInfo,
                        longitude: parseFloat(location.road_address.x || 0),
                        latitude: parseFloat(location.road_address.y || 0)
                    }));
                } else {
                    console.error("Invalid location data:", location); //�������� �ʴ� �ּҿ� ���ؼ� else������ ����ó���� �ؾ� ����â�� �ȶ�
                }
            })
            .catch(error => {
                console.error("Error fetching address:", error);
            });
        }
    }, [addressValue]);
    

    return (
        <div >
            <DaumPostcode
                className="postmodal"
                autoClose
                onComplete={complete} />
        </div>
    );
}

export default Address;