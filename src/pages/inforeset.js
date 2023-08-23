import { useEffect, useState } from "react";
import './inforeset.css';
import axios from "axios";
import { useSelector } from 'react-redux';

function Inforeset(props) {
    let [showPetInfo, setShowPetInfo] = useState(false); // 반려동물 정보 수정 페이지 표시 여부 상태
    let [selectedButton, setSelectedButton] = useState('user');

    let handlePetInfoClick = () => {
        setShowPetInfo(true); // 반려동물 정보 수정 페이지를 표시
        setSelectedButton('pet');
    };

    let handleUserInfoClick = () => {
        setShowPetInfo(false);
        setSelectedButton('user');
    };

    let [userInfo, setUserInfo] = useState({});
    let [petInfo, setPetInfo] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPetInfo(prevPetInfo => ({
            ...prevPetInfo,
            [name]: value,
        }));
    };

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };

    const updateUserInfo = () => {
        axios.put('/api/mypage/member/user', userInfo)
            .then((response) => {
                console.log('사용자 정보 업데이트 성공:', response.data.result);
            }).catch((error) => {
                console.error('사용자 정보 업데이트 실패:', error);
            });
    }

    const updatePetInfo = () => {
        axios.put('/api/mypage/member/pet', petInfo)
            .then((response) => {
                console.log('수정정보', petInfo);
                console.log('반려동물 정보 업데이트 성공:', response.data.result[0]);
            }).catch((error) => {
                console.log('수정정보', petInfo);
                console.error('반려동물 정보 업데이트 실패:', error);
            });
    }

    const token = useSelector(state => state.token);
    const accessToken = "Bearer " + { token };
    axios.defaults.headers.common['Authorization'] = accessToken;

    useEffect(() => {
        axios.get('/api/mypage/member/user')
            .then((response) => {
                // result 객체를 petInfo 상태로 설정
                //"result" 필드에 해당하는 값이며, 이 값의 자료형은 객체(Object)
                console.log(response.data.result);
                setUserInfo(response.data.result);
            })
            .catch((error) => {//에러가 발생하면, 해당 에러 객체가 catch() 메서드의 매개변수인 error에 자동으로 전달
                console.error('Error fetching pet information:', error);
            });
        axios.get('/api/mypage/member/pet')
            .then((response) => {
                // result 객체를 petInfo 상태로 설정
                console.log(response.data);
                setPetInfo(response.data.result[0]);
            })
            .catch((error) => {//에러가 발생하면, 해당 에러 객체가 catch() 메서드의 매개변수인 error에 자동으로 전달
                console.error('Error fetching pet information:', error);
            });
    }, []);

    return (
        <div className="resetinfo">
            <div className="button-group3">
                <button
                    type="button"
                    className={selectedButton === 'user' ? 'selected-button' : 'unselected-button'}
                    onClick={handleUserInfoClick}>회원 기본정보 수정</button>
                <button
                    type="button"
                    className={selectedButton === 'pet' ? 'selected-button' : 'unselected-button'}
                    onClick={handlePetInfoClick}>반려동물 수정</button>
            </div>
            {
                showPetInfo ? (
                    <form>
                        <table>
                            <tbody>
                                {/**코드에서 반려동물 정보 수정 페이지의 입력 필드에 
                                 * 초기값이 없이 빈 값으로 설정되어 있습니다. 
                                 * 이에 따라 회원 정보 수정 페이지에서 입력한 값이 
                                 * 반려동물 정보 수정 페이지에서 동일한 위치에 같은 값이 나타나게 됩니다. */}
                                <tr>
                                    <td>반려동물 이름</td>
                                    <td><input type="text" name="petName" value={petInfo.petName} required
                                        onChange={handleInputChange}
                                    /></td>
                                </tr>
                                <tr>
                                    <td>반려동물 종류</td>
                                    <td>
                                        <select name="petType" value={petInfo.petType} required onChange={handleInputChange}>
                                            <option value="">선택</option>
                                            <option value="강아지">강아지</option>
                                            <option value="고양이">고양이</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>성별</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            name="petGender"
                                            value="수컷"
                                            checked={petInfo.petGender === '수컷'}
                                            onChange={handleInputChange}
                                        /> 수컷

                                        <input
                                            type="checkbox"
                                            name="petGender"
                                            value="암컷"
                                            checked={petInfo.petGender === '암컷'}
                                            onChange={handleInputChange}
                                        /> 암컷

                                        <input
                                            type="checkbox"
                                            name="petGender"
                                            value="중성화"
                                            checked={petInfo.petGender === '중성화'}
                                            onChange={handleInputChange}
                                        /> 중성화
                                    </td>
                                </tr>
                                <tr>
                                    <td>반려동물 무게</td>
                                    <td><input type="text" name="petWeight" value={petInfo.petWeight} required
                                        onChange={handleInputChange}
                                    /></td>
                                </tr>
                                <tr>
                                    <td>특이사항</td>
                                    <td><textarea name="petSpecials" value={petInfo.petSpecials}
                                        onChange={handleInputChange}
                                    ></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="resetinfo-button" onClick={() => {
                            updatePetInfo(); //onClick시 두개의 함수를 실행하고싶다면, 그냥{ }안에 ;로 끝나는 두 함수 작성
                            props.navigate('/mypage/userinfo-reset');
                        }}>반려동물정보 수정</button>
                    </form>
                ) : (
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td>이메일</td>
                                    <td><input type="email" name="email" value={userInfo.email} required
                                    /></td>
                                </tr>
                                {/* <tr>
                                    <td>비밀번호</td>
                                    <td><input type="password" name="password" value={userInfo.password} required
                                        onChange={handleUserInfoChange}
                                    /></td>
                                </tr> */}
                                <tr>
                                    <td>이름</td>
                                    <td><input type="text" name="nickname" value={userInfo.nickname} required
                                        onChange={handleUserInfoChange}
                                    /></td>
                                </tr> {/*서버에서 전달받은 데이터를 value로 미리 띄울수있음, 즉 해당필드의 초기값을 지정할 수 있음
                                -> 사용자가 필드를 수정하면 'value'값도 없데이트됨
                                required속성으로 필수입력 필드임을 나타냄*/ }
                                <tr>
                                    <td>생년월일</td>
                                    <td><input type="text" name="birthday" value={userInfo.birthday} required
                                        onChange={handleUserInfoChange} /></td>
                                </tr>
                                <tr>
                                    <td>전화번호</td>
                                    <td><input type="tel" name="phone" value={userInfo.phone} required
                                        onChange={handleUserInfoChange}
                                    /></td>
                                </tr>
                                <tr>
                                    <td>성별</td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="남성"
                                            checked={userInfo.gender === '남성'}
                                            onChange={handleUserInfoChange}

                                        /> 남성
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="여성"
                                            checked={userInfo.gender === '여성'}
                                            onChange={handleUserInfoChange}
                                        /> 여성
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <button className="resetinfo-button" onClick={() => {
                            updateUserInfo();
                            props.navigate('/mypage/userinfo-reset');
                        }}>회원정보 수정</button>
                    </form>
                )
            }
        </div>


    );
}


export default Inforeset;