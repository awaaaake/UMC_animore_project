//업체측-예약요청
import React from "react";
import Adminpagemenu from './adminPageMenu';
import WaitingList from './waitingList';
import FixedList from './fixecList';


class ManageSys extends React.Component {
    state = {
      waitingListVisible: true,
      fixedListVisible: false,
    };
  
    handleItemClick = (url) => {
      // URL에 따른 작업 수행
      if (url === '/adminpage/reservation/request') {
        this.setState({
          waitingListVisible: true,
          fixedListVisible: false,
        });
      } else if (url === '/adminpage/reservation/complete') {
        this.setState({
          waitingListVisible: false,
          fixedListVisible: true,
        });
      }
    };
  
    render() {
      const { waitingListVisible, fixedListVisible } = this.state;
      return (
        <div className="Manager" style={{ display: "flex" }}>
          <Adminpagemenu handleItemClick={this.handleItemClick} />
          {waitingListVisible && <WaitingList />}
          {fixedListVisible && <FixedList />}
        </div>
      );
    }
  }
  
  export default ManageSys;
