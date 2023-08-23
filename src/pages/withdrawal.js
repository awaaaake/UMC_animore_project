import { useEffect, useState } from "react";
import './withdrawal.css';
import key from '../img/key.png';
import axios from "axios";

function Withdrawal(props) {
    let [password, setPassword] = useState('');

    const token = useSelector(state => state.token);
    const accessToken = "Bearer "+ {token};
    // access token을 인증 헤더에 설정합니다.
    axios.defaults.headers.common["Authorization"] = accessToken;

    const handlePasswordCheck = (e) => {
        e.preventDefault(); // 폼 제출 방지
        /**
         *  폼이 제출되지 않고, onSubmit 이벤트가 발생할 때 handlePasswordCheck 함수가 실행
         * 이렇게 함으로써 Enter 키를 눌렀을 때도 폼이 제출되지 않고, 
         * handlePasswordCheck 함수가 실행되어 비밀번호 확인이 가능
         */
        axios.get('/api/mypage/member/user/password', {
            params: { password: password },
        })
            .then((response) => {
                console.log(response.data)
                if (response.data.isSuccess) {
                    props.navigate('/mypage/iswithdrawn');
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
            <h2>회원탈퇴</h2>
            <div className="content">
                <img src={key} alt="열쇠" width="50"></img>
                <form onSubmit={handlePasswordCheck}>
                    <p className="message1">비밀번호 재확인</p>
                    <p className="message2">안전한 탈퇴 진행을 위해 비밀번호를 한 번 더 입력해주세요.</p>
                    <input type="password" id="password_aw" name="password" required placeholder=" 비밀번호 입력"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <div>
                        <button type="submit" className="confirm-button2">
                            확인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Withdrawal;