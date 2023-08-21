import React ,{useState}from "react";
import './ReservationList.css';
import "@popperjs/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reservation.css';
import Table from './table';
import axios from "axios";

function ReservationList(props) {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState({});

  const handleDetailsClick = () => {
    setShowDetails(prevState => !prevState);
  };

  const className = props.page === 1 ? 'page-one' : 'page-two';

  return (
    <div className={`my-component ${className}`}>
      <div className="one">
        <p className="infromation">{props.date}</p>
        <p className="infromation">{props.shop}</p>
        <p className="infromation">{props.address}</p>
        <p className="infromation">{props.telephone}</p>
        <p className="infromation">
          <button className="inform_btn" onClick={handleDetailsClick}>
            {showDetails ? '닫기' : '상세보기'}
          </button>
        </p>
      </div>
      {showDetails && <Table page={1} showDetails={showDetails} reservationId={props.reservationId} />}
    </div>
  );
}

export default ReservationList;
