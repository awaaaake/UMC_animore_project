import { useEffect, useState } from "react";
import './isWithdrawn.css';
import mark from '../img/mark.png';
import alertImg from '../img/alert.png';
import axios from "axios";

function AdminWithdrawn(props) {
    let [입력값, 입력값변경] = useState('');
    
    const accessToken = 'Bearer ';
    // access token을 인증 헤더에 설정합니다.
    axios.defaults.headers.common["Authorization"] = accessToken;

    const withdrawal = () => {
        axios.post('/api/mypage/member/remove')
            .then((response) => {
                console.log(response.data);
                // 회원 탈퇴 성공 후 페이지 이동
                props.navigate('/withdrawalConf');
            })
            .catch((error) => {
                console.error('Error removing member:', error);
                alert('회원 탈퇴 중 오류가 발생했습니다.');
            });
    }

    return (
        <div className="memberinfo">
            <h2>회원탈퇴</h2>
            <div className="content">
                <img src={mark} alt="물음표" width="50"></img>
                <form>
                    <p className="message1">정말 회원탈퇴를 하시겠습니까?</p>
                    <p className="message2">회원탈퇴 이유를 선택해주세요</p>
                    <select id="reasonForWithdrawal" name="reasonForWithdrawal" required
                        onChange={(e) => { 입력값변경(e.target.value) }}>
                        <option value="한정적인 지역으로 인한 정보 부족">한정적인 지역으로 인한 정보 부족</option>
                        <option value="서비스 경험 불만족">서비스 경험 불만족</option>
                        <option value="개인정보 보호">개인정보 보호</option>
                        {/* 다른 옵션들을 추가할 수 있습니다 */}
                    </select>
                    <div className="alert">
                        <div className="alerttitle">
                            <div><img src={alertImg} width="20" alt="alert"></img></div>
                            <p className="message3">탈퇴 안내</p>
                        </div>
                        <p className="message4">탈퇴확인 시, 15일간 휴면 계정으로 전환되며 15일 이후 완전히 삭제됩니다.</p>
                        <p className="message4">휴면 계정 상태에서 다시 로그인 시 회원탈퇴가 취소되며, 계정 삭제 시 복구할 수 없습니다.</p>
                    </div>
                    <div className="button-group">
                        <button type="button" className="cancel-button"
                            onClick={withdrawal}
                        >탈퇴확인</button>
                        <button type="submit" className="confirm-button"
                            onClick={() => {
                                props.navigate("/mypage")
                            }}
                        >탈퇴취소</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default AdminWithdrawn;
