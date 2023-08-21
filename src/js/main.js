import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../actions';


function Main(){

    const dispatch = useDispatch();
    const token = new URL(window.location.href).searchParams.get("code");
    dispatch(setToken(token));

    const token1 = new URL(window.location.href).searchParams.get("code");
    console.log(token1);

    return (
        <nav>
            <h1>로그인 성공</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/userToken">토큰 이동 확인하기</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Main;