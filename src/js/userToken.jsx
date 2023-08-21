import React from "react";
import { useSelector } from 'react-redux';


function UserToken(){

    const token = useSelector(state => state.token);

    return(
        <div>{token && <p>Logged in with token: {token}</p>}</div>
    );
}

export default UserToken;