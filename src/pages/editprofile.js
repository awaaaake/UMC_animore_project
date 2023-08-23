import { useEffect, useState } from "react";
import './editprofile.css';
// import defaultProfileImage from "../img/profile.png";
import axios from "axios";
import { useSelector } from 'react-redux';

function Editprofile(props) {
    let [inputCount, setInputCount] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [useDefaultImage, setUseDefaultImage] = useState(true);
    const [defaultImageurl, setDefaultImageurl] = useState('../img/profile.png');
    const countCharacters = (str) => {
        const regex = /[\x00-\x7F]|[\u3131-\uD79D]|./g; // ASCII 문자, 한글 문자, 그 외의 모든 문자
        const matches = str.match(regex);
        return matches ? matches.length : 0;
    };

    const onTextareaHandler = (e) => {
        setInfo((prevInfo) => ({
            ...prevInfo,
            aboutMe: e.target.value
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
            setUseDefaultImage(false);
        }
    };

    let [Info, setInfo] = useState({});

    const token = useSelector(state => state.token);
    const accessToken = "Bearer " + { token };
    axios.defaults.headers.common['Authorization'] = accessToken;

    useEffect(() => {
        //localStorage에서 access token을 가져옵니다

        axios.get('/api/mypage/profile')
            .then((response) => {
                // result 객체를 petInfo 상태로 설정합니다.
                console.log(response.data.result);
                setInfo(response.data.result);
                console.log(Info);
                setDefaultImageurl(response.data.result.imageUrls);
            }).catch((error) => {
                // 에러가 발생하면, 해당 에러 객체가 catch() 메서드의 매개변수인 error에 자동으로 전달됩니다.
                console.error('Error fetching pet information:', error);
            });
    }, []); //useEffect에서 setInfo를 통해 defaultImageurl을 갱신하는 로직은 비동기적으로 처리되므로, 컴포넌트가 처음 렌더링될 때 defaultImageurl이 기본 값인 상태로 나타날 수 있다.

    const updateProfile = async () => {
        console.log('Before updating profile:', Info);

        const formData = new FormData();
        formData.append('nickname', Info.nickname);
        formData.append('aboutMe', Info.aboutMe);

        if (!useDefaultImage) {
            // Create a Blob from the selected image file
            const imageBlob = new Blob([selectedImage], { type: selectedImage.type });
            // Append the Blob to the FormData with the desired field name ('multipartFile')
            formData.append('multipartFile', imageBlob);//selectedImage.name
        }

        let entries = formData.entries();
        for (const pair of entries) {
            console.log(pair[0], pair[1]);
        }

        try {
            const response = await axios.put('/api/mypage/profile', formData);
            console.log('Profile updated successfully:', response.data.result);
            props.navigate('/mypage/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    return (
        <div className='detail-profile'>
            <h4>프로필 수정</h4>
            <div className='detail_1'>
                <div className='profile'>
                    <div className="profile-picture">
                        <img src={useDefaultImage || !selectedImage ? defaultImageurl : URL.createObjectURL(selectedImage)} alt="프로필 사진" />
                    </div>
                    <div className="button-container">
                        <label htmlFor="choose-profile">사진 수정</label>
                        <input
                            type="file"
                            id="choose-profile"
                            name="profilePicture"
                            accept="image/*"
                            onChange={onImageSelectHandler}
                            style={{ display: "none" }}
                        />
                        <button className="profile-edit-button2" onClick={() => setUseDefaultImage(true)}>
                            기본 이미지
                        </button>
                    </div>
                </div>
                <div className='profile_content'>
                    <div className='nickname'>
                        <label for="nickname">닉네임</label>
                        <input type="text" id="nickname" name="nickname" value={Info.nickname} placeholder="닉네임을 입력하세요"
                            onChange={(e) => setInfo((prevInfo) => ({ ...prevInfo, nickname: e.target.value }))}
                        />
                    </div>
                    <div className='introduction'>
                        <label for="introduction">자기소개</label>
                        <textarea id="introduction" name="introduction" value={Info.aboutMe} placeholder="자기소개를 입력하세요"
                            onChange={onTextareaHandler} maxLength="1000"
                        ></textarea>
                    </div>
                    <div className='p-wrapper'>
                        <p>
                            <span>{inputCount}</span>
                            <span>/1000 자</span>
                        </p>
                    </div>
                    <div class="edit-button-container">
                        <button className="edit-profile-button" onClick={updateProfile}>수정하기</button>
                    </div>
                    {console.log(Info)}
                </div>
            </div>
        </div>
    )
}

export default Editprofile;