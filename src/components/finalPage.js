// 예약상세 4
import React from "react";
import './finalPage.css';
import ReserveListTotal from './reserveListTotal';
import { Link } from "react-router-dom";

class FinalPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          showReserveList: false
        };
      }
    
      handleReservationClick = () => {
        this.setState({ showReserveList: true });
      };
    render(){
        const { showReserveList } = this.state;

        if (showReserveList) {
          return <ReserveListTotal />;
        }
        return(
            <div className="box"> 
                <h2>예약요청이 완료되었습니다!</h2>
                
                <div className="alert">
                    <img src="img/10.png" alt="animore" width="130px" height="32px"/>
                    <h3 className="alert_text">를 이용해주셔서 감사합니다.</h3>  
                </div>
                <div className="squar">
                    <h3>잠시만 기다려주세요</h3>
                    <h3>업체에서 확인 후 예약확정할 예정입니다.</h3>
                </div>
                <div className="complete_button">
                  <Link to='/Home'> 
                    <button className="Home_Shifting">홈 화면으로 가기</button>
                  </Link>
                  <Link to='/reservelist'>
                  <button className="Reservation_Shifting"  onClick={this.handleReservationClick}>예약내역 확인하기</button>
                  </Link>
                  
                </div>
            </div>
        )

    }
      
}
export default FinalPage;
