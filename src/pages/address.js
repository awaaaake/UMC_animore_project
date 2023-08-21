import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import './address.css';

function Address(props) {
    const [Address, setAddress]=useState(props.Info.storeLocation);
    const complete = (data) => {
        let fullAddress = data.address;
        setAddress(data.address);
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
            storeLocation:fullAddress
        }));
    }

    useEffect(() => {
        axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${Address}`, {
            headers: { Authorization: ''},
        })
            .then(res => {
                const location =res.data.documents[0];
                console.log(location);
                props.setInfo(prevInfo => ({
                    ...prevInfo,
                    longitude: parseFloat(location.road_address.x),
                    latitude: parseFloat(location.road_address.y)
                }));
                console.log(props.Info);
        })
    }, [Address]);

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