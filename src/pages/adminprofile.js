import { useEffect, useState } from "react";
import './adminprofile.css';
import Modal from 'react-modal';
import Preview from "./profilepreview";
import storeimg from '../img/storeimg.jpg'
import axios from "axios";
import Address from "./address";
import DaumPostcode from 'react-daum-postcode';

function Adminprofile(props) {
    let [inputCount, setInputCount] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tag, setTag] = useState(['픽업가능', '고양이 미용가능', '스파가능', '피부병치료', '호텔링가능', '유치원겸용', '특수동물가능', '공휴일운영'])
    const [checked, setChecked] = useState([])
    const [defaultImageurl, setDefaultImageurl] = useState("");
    const [popup, setPopup] = useState(false);
    const [previewIsOpen, setPreviewIsOpen] = useState(false);

    const handleComplete = (data) => {
        setPopup(!popup);
    }

    // 모달 열기/닫기 및 선택된 태그 관리
    const handleModalToggle = () => {
        setModalIsOpen(!modalIsOpen);
    };

    const handleTagChange = (selectedTag) => {
        if (checked.includes(selectedTag)) {
            setChecked(checked.filter(tagItem => tagItem !== selectedTag));
    
            setInfo(prevInfo => ({
                ...prevInfo,
                storeSignificant: prevInfo.storeSignificant.filter(tagItem => tagItem !== selectedTag)
            }));
        } else {
            setChecked([...checked, selectedTag]);
    
            setInfo(prevInfo => ({
                ...prevInfo,
                storeSignificant: [...prevInfo.storeSignificant, selectedTag]
            }));
        }
    };
    

    const countCharacters = (str) => {
        const regex = /[\x00-\x7F]|[\u3131-\uD79D]|./g;
        const matches = str.match(regex);
        return matches ? matches.length : 0;
    };

    const onTextareaHandler = (e) => {
        setInfo((prevInfo) => ({
            ...prevInfo,
            storeExplain: e.target.value
        }));
        const inputValue = e.target.value;
        const characterCount = countCharacters(inputValue);
        setInputCount(characterCount);
    };

    const onImageSelectHandler = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const uploadFile = e.target.files[0]
            console.log(uploadFile)
            setSelectedImage(uploadFile);
        }
    };

    let [Info, setInfo] = useState({
        storeSignificant:[],
    });

    const handleInfoChange = (e) => {
        const { name, value } = e.target;
        if (name === "storeSignificant") { // Check if the field being updated is storeSignificant
            setInfo((prevInfo) => ({
                ...prevInfo,
                tags: value // Update Info.tags
            }));
        } else if (name === "dayoff") {
            const [dayoff1, dayoff2] = value.split(',').map(day => day.trim()); // ,로 분리 후 공백 제거
            setInfo(prevInfo => ({
                ...prevInfo,
                dayoff1: dayoff1, // Info 객체의 dayoff1 속성에 값 할당
                dayoff2: dayoff2 // Info 객체의 dayoff2 속성에 값 할당
            }));
        } else {
            setInfo((prevInfo) => ({
                ...prevInfo,
                [name]: value,
            }));
        }
    };
    /**입력 필드마다 name 속성에 해당하는 상태를 업데이트합니다. 예를 들어, <input name="nickname" ... />이라는 입력 필드가 있다면 nickname이라는 상태가 업데이트됩니다. */

    useEffect(() => {
        const accessToken = 'Bearer ';
        axios.defaults.headers.common['Authorization'] = accessToken;

        axios.get('/manage/store')
            .then((response) => {
                console.log(response.data);
                setInfo(response.data.result);
                console.log(Info);
                setDefaultImageurl(response.data.result.storeImageUrl);
                setChecked(response.data.result.storeSignificant);
            }).catch((error) => {
                console.error('Error fetching admin information:', error);
            })
    }, []);

    checked.forEach((checkedTag) => {
        if (!tag.includes(checkedTag)) {
            setTag((prevTag) => [...prevTag, checkedTag]);
        }
    });

    const updateProfile = async () => {
        console.log('Before updating profile:', Info);

        const formData = new FormData();
        formData.append('storeName', Info.storeName);
        formData.append('storeExplain', Info.storeExplain);
        formData.append('storeImageUrl',Info.defaultImageurl);
        formData.append('open', Info.open);
        formData.append('close', Info.close);
        formData.append('dayoff1', Info.dayoff1);
        formData.append('dayoff2', Info.dayoff2);
        formData.append('tags', Info.tags);
        formData.append('amount', Info.amount);
        formData.append('storeSignificant', Info.storeSignificant);
        formData.append('storeLocation',Info.storeLocation);
        formData.append('storeNumber',Info.storeNumber);
        formData.append('latitude',Info.latitude);
        formData.append('longitude',Info.longitude);

        if (selectedImage) {
            const imageBlob = new Blob([selectedImage], { type: selectedImage.type });
            formData.append('images', imageBlob);
        }


        let entries = formData.entries();
        for (const pair of entries) {
            console.log(pair[0], pair[1]);
        }

        console.log(formData);
        try {
            const response = await axios.post('/manage/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Profile updated successfully:', response.data.result);
            props.navigate('/adminpage/adminprofile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className='detail'>
            <h4>업체 정보 관리</h4>
            <div className='detail_1'>
                <div className='profile2'>
                    <div className="admin-profile-picture">
                        <img src={selectedImage ? URL.createObjectURL(selectedImage) : defaultImageurl} alt="프로필 사진" />
                    </div>
                    <form method="post" encType="multipart/form-data">
                        <div className="admin-profile-button-container">
                            <label htmlFor="choose-admin-profile" className="form-label">사진 등록</label>
                            <input
                                type="file"
                                id="choose-admin-profile"
                                name="profilePicture"
                                accept="image/*"
                                onChange={onImageSelectHandler}
                            />
                        </div>
                    </form>
                </div>
                <div className='profile_content'>
                    <div className='nickname'>
                        <label htmlFor="nickname" className="form-label">업체명</label>
                        <div className="content-box">
                            <input
                                type="text"
                                id="nickname"
                                name="storeName"
                                placeholder=""
                                value={Info.storeName}
                                required
                                onChange={handleInfoChange}
                            />
                        </div>
                    </div>
                    <div className='introduction'>
                        <label htmlFor="introduction" className="form-label">업체소개</label>
                        <div className="content-box">
                            <textarea
                                id="introduction"
                                name="storeExplain"
                                placeholder=""
                                value={Info.storeExplain}
                                onChange={onTextareaHandler}
                                maxLength="1000"
                            ></textarea>
                        </div>
                    </div>
                    <div className='p-wrapper'>
                        <p>
                            <span>{inputCount}</span>
                            <span>/1000 자</span>
                        </p>
                    </div>
                    <div className='introduction2'>
                        <label htmlFor="introduction2" className="form-label">태그</label>
                        <div className="content-box">
                            <button
                                type="button"
                                value="태그 편집"
                                id="introduction2"
                                onClick={() => { setModalIsOpen(true) }}
                            >태그 편집</button></div>
                    </div>
                    {modalIsOpen ? <Modal isOpen={true} onRequestClose={() => setModalIsOpen(false)}
                        contentLabel="태그 편집 모달"
                        className="custom-modal-content"
                        overlayClassName="custom-modal-overlay"
                    >
                        <p className="tag-checkbox">태그 편집</p>
                        <table className="tag-table">
                            <tbody>
                                {tag.map((tagItem, index) => {
                                    if (index % 3 === 0) {
                                        const isChecked1 = checked.includes(tagItem);
                                        const isChecked2 = checked.includes(tag[index + 1]);
                                        const isChecked3 = checked.includes(tag[index + 2]);

                                        return (
                                            <tr key={index}>
                                                <th className="tag-checkbox-cell">
                                                    {tagItem && (<label className="tag-label">
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked1}
                                                            onChange={() => handleTagChange(tagItem)}
                                                        />
                                                        {tagItem}
                                                    </label>)}
                                                </th>
                                                <th className="tag-checkbox-cell">
                                                    {tag[index + 1] && (<label className="tag-label">
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked2}
                                                            onChange={() => handleTagChange(tag[index + 1])}
                                                        />
                                                        {tag[index + 1]}
                                                    </label>)}
                                                </th>
                                                <th className="tag-checkbox-cell">
                                                    {tag[index + 2] && (<label className="tag-label">
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked3}
                                                            onChange={() => handleTagChange(tag[index + 2])}
                                                        />
                                                        {tag[index + 2]}
                                                    </label>)}
                                                </th>
                                            </tr>
                                        );
                                    }
                                    return null;
                                })}
                            </tbody>
                        </table>
                    </Modal> : null}
                    {console.log(checked)}

                    <div className='opening-hours'>
                        <label htmlFor="openingHours" className="form-label">오픈 시간</label>
                        <div className='opening-hours2'>
                            <input
                                type='time'
                                id='openingHours'
                                name='open'
                                value={Info.open || ""} //Info.open이 null일 경우 or 연산자 -> 빈 문자열 설정,  왼쪽 피연산자가 "falsy" 값인 경우에 오른쪽 피연산자를 반환
                                onChange={handleInfoChange}
                            />
                            <span> ~ </span>
                            <input
                                type='time'
                                id='openingHours'
                                name='close'
                                value={Info.close || ""} //Info.open이 null일 경우 or 연산자 -> 빈 문자열 설정,  왼쪽 피연산자가 "falsy" 값인 경우에 오른쪽 피연산자를 반환
                                onChange={handleInfoChange}
                            />
                        </div>
                    </div>
                    <div className='day-off'>
                        <label htmlFor="dayOff" className="form-label">휴무일</label>
                        <div className="content-box">
                            <input
                                type="text"
                                id="dayOff"
                                name="dayoff"
                                value={`${Info.dayoff1 || ''},${Info.dayoff2 || ''}`}
                                onChange={handleInfoChange}
                                placeholder="ex) 매주 월요일, 격주 월요일"
                            />

                        </div>
                    </div>
                    <div className='max-reservation-count'>
                        <label htmlFor="maxReservationCount" className="form-label">최대 예약 건수</label>
                        <div className="select-container">
                            <select
                                id="maxReservationCount"
                                name="amount"
                                onChange={handleInfoChange}
                            >
                                <option value="none">=== 선택 ===</option>
                                <option value="1" selected={Info.amount === "시간당 1건"}>시간당 1건</option>
                                <option value="2" selected={Info.amount === "시간당 2건"}>시간당 2건</option>
                                <option value="3" selected={Info.amount === "시간당 3건"}>시간당 3건</option>
                                <option value="4" selected={Info.amount === "시간당 4건"}>시간당 4건</option>
                                <option value="5" selected={Info.amount === "시간당 5건"}>시간당 5건</option>
                                <option value="6" selected={Info.amount === "시간당 6건"}>시간당 6건</option>
                                <option value="7" selected={Info.amount === "시간당 7건"}>시간당 7건</option>
                                <option value="8" selected={Info.amount === "시간당 8건"}>시간당 8건</option>
                                <option value="9" selected={Info.amount === "시간당 9건"}>시간당 9건</option>
                                <option value="10" selected={Info.amount === "시간당 10건"}>시간당 10건</option>
                            </select>
                        </div>
                    </div>
                    <div className='storeSignificant'>
                        <label
                            htmlFor="storeSignificant"
                            className="form-label"
                        >한줄소개</label>
                        <div className="content-box">
                            <input
                                type="text"
                                id="storeSignificant"
                                name="storeSignificant"
                                value={Info.tags}
                                placeholder=""
                                onChange={handleInfoChange}
                            />
                        </div>
                    </div>
                    <div className='storeNumber'>
                        <label
                            htmlFor="storeNumber"
                            className="form-label"
                        >전화번호</label>
                        <div className="content-box">
                            <input
                                type="text"
                                id="storeNumber"
                                name="storeNumber"
                                value={Info.storeNumber}
                                placeholder=""
                                onChange={handleInfoChange}
                            />
                        </div>
                    </div>
                    <div className='storeNumber'>
                        <label
                            htmlFor="storeLocation"
                            className="form-label"
                        >주소</label>
                        <div className="content-box">
                            <input
                                type="text"
                                id="storeLocation"
                                name="storeLocation"
                                value={Info.storeLocation}
                                placeholder=""
                                onChange={handleInfoChange}
                            />
                            <button className="address-button" onClick={handleComplete}>우편번호 찾기</button>
                        </div>
                    </div>
                    <div id="map"></div>
                    {popup ? <Address Info={Info} setInfo={setInfo}></Address>
                        : null}
                    <div class="edit-button-container">
                        <button
                            type="button"
                            value="미리보기"
                            className="preview-button"
                            onClick={() => { setPreviewIsOpen(true) }}
                        >미리보기</button>
                        <button className="edit-profile-button" onClick={updateProfile}>수정하기</button>
                    </div>
                    {previewIsOpen ? <Modal isOpen={true} onRequestClose={() => setPreviewIsOpen(false)}//모달 창이 표시되어야 하는지 여부를 설명하는 boolean 값
                        contentLabel="프로필 미리보기"
                        className="custom-modal-content"
                        overlayClassName="custom-modal-overlay"
                    >
                        {console.log(Info)}
                        {console.log(checked)}
                        <Preview Info={Info} checked={checked} selectedImage={selectedImage} defaultImageurl={defaultImageurl}></Preview>
                    </Modal> : null}
                    {console.log(Info)}
                </div>
            </div>
        </div>
    );
}

export default Adminprofile;
