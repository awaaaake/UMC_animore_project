import { useEffect, useState } from "react";
import './memberInfo.css';
import key from '../img/key.png';
import axios from 'axios';

function Memberinfo(props) {
    let [password, setPassword] = useState('');

    const accessToken = 'Bearer ';
    // access token을 인증 헤더에 설정합니다.
    axios.defaults.headers.common["Authorization"] = accessToken;

    const handlePasswordCheck = (e) => {
        e.preventDefault(); // 폼 제출 방지
        /**
         *  폼이 제출되지 않고, onSubmit 이벤트가 발생할 때 handlePasswordCheck 함수가 실행
         * 이렇게 함으로써 Enter 키를 눌렀을 때도 폼이 제출되지 않고, 
         * handlePasswordCheck 함수가 실행되어 비밀번호 확인이 가능
         */
        axios.get('/mypage/member/user/password', {/*파라미터의 키(key) 이름은 원하는 대로 정의할 수 O 하지만 주의할 점은, 사용하는 API의 문서나 요구사항에 따라 정해진 키 이름을 사용해야 할 수도 O API가 특정 키 이름을 요구하지 않는 경우에는 자유롭게 원하는 키 이름을 사용할 수 O*/
            params: { password: password },
        })
            .then((response) => {
                console.log(password);
                console.log(response.data);
                if (response.data.isSuccess) {
                    props.navigate('/mypage/userinfo-reset');
                } else {
                    alert('비밀번호가 틀렸습니다.');
                }
            })
            .catch((error) => {
                console.error('Error checking password:', error);
                alert('비밀번호 확인 중 오류가 발생했습니다.');
            });
    };

    return (
        <div className="memberinfo">
            <h2>회원정보 수정</h2>
            <div className="content">
                <form onSubmit={handlePasswordCheck}>
                    <img src={key} alt="열쇠" width="50"></img>
                    <p className="message1">비밀번호 재확인</p>
                    <p className="message2">회원정보수정을 원하시는 경우 비밀번호를 입력해주세요.</p>

                    <input
                        type="password"
                        id="password_aw"
                        name="password"
                        required placeholder=" 비밀번호 입력"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <div>
                        <button type="submit" className="confirm-button4">
                            확인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Memberinfo;
