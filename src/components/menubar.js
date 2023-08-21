import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './menubar.css';

class Menubar extends React.Component{
    render(){
        return(
            <div>
                <nav bg="light" className="navbar navbar-expand-lg menubar">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img src="img/13.png" alt="logo" width="200px" height="70px"/>
                        </a>
                        <form className="d-flex" role="search">
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/" style={{paddingRight:"1px"}}>홈 |</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/shop" style={{paddingRight:"1px"}}>미용실 |</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/reservelist"style={{paddingRight:"1px"}}>예약내역 |</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/mypage"style={{paddingRight:"1px"}}>마이페이지 |</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/"style={{paddingRight:"3px"}}>로그아웃</a>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </nav>
            </div>            
        )
    
    }
        
}
export default Menubar;