import { useEffect, useState } from "react";
import './isadmin.css';
import animore from '../img/animore.png';
import { useCookies } from "react-cookie";
import axios from "axios";
import {useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { AccordionCollapse } from "react-bootstrap";

function Isadmin(props) {
    let [passwordInput, setPasswordInput] = useState('');
    let [idInput, setIdInput] = useState('');
    //쿠키
    const formRef = useRef();
    const [cookies, setCookie] = useCookies(['id']);
    
    //Login 컴포넌트에서 로그인을 하면 토큰을 받아 쿠키에 저장
    const login = (e) => {
        e.preventDefault();
        axios.post('/api/login', {// 로그인 요청
            username:formRef.current.id.value,
            password:formRef.current.password.value
        }).then((res) => {
            setCookie('id',res.headers.get('Authorization'));// 쿠키에 토큰 저장
            props.navigate("/adminpage");
        }).catch((error) => {
            console.error("Login error:", error);
            alert('이메일 아이디 또는 비밀번호가 틀렸습니다');
        });
    }

    return (
        <div className="admininfo">
            <div>
                <img src={animore} alt="animore" width="300"></img>
            </div>
            <div className="admin-content">
                <form ref={formRef} onSubmit={login}>
                    <input
                        type="text"
                        id="admin-id"
                        name="id"
                        required
                        placeholder="아이디를 입력해주세요"
                        value={idInput}
                        onChange={(e) => setIdInput(e.target.value)}
                    />
                    <input
                        type="password"
                        id="admin-password"
                        name="password"
                        required
                        placeholder="비밀번호를 입력해주세요"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <div>
                        <button
                            type="submit"
                            className="confirm-button9"
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Isadmin;
