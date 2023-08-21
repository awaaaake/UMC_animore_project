import { useEffect, useState } from "react";
import './withdrawalConf.css';
import animore from '../img/animore.png';

function WithdrawalConf(props) {
    return (
        <div className="withdrawalConf">
            <div className="confmessage-a">
                <span className="message7">회원탈퇴가 완료되었습니다.</span>
                <div className="confmessage">
                    <div className="animore">
                        <img src={animore} alt="animore" width="170"></img>
                    </div>
                    <span className="message8">를 이용해주셔서 감사합니다.</span>
                </div>
            </div>
            <button type="submit" className="confirm-button3"
                onClick={() => { props.navigate("/") }}
            >홈으로 돌아가기</button>
        </div>
    )
}

export default WithdrawalConf;