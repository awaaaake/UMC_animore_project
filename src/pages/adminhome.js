import { useEffect, useState } from "react";
import './adminhome.css';
import axios from "axios";

function Adminhome(props) {
    let [admin_name, setAdmin_name] = useState(['봉봉살롱', '도그뷰티', '까끌래보끌래']);
    let [currentDate, setCurrentDate] = useState(new Date());
    let [reservations, setReservations] = useState([]);
    const [expandedReservations, setExpandedReservations] = useState({});

    const handleExpandClick = (date) => {
        setExpandedReservations(prevState => ({
            ...prevState,
            [date]: !prevState[date]
        }));
    };
    useEffect(() => {
        const accessToken = 'Bearer ';
        axios.defaults.headers.common["Authorization"] = accessToken;
        axios.get('/manage/bookings', {
            params: { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1 }
        })
            .then((response) => {
                // result 객체를 petInfo 상태로 설정합니다.
                console.log(response.data.result);
                setReservations(response.data.result);
            }).catch((error) => {
                // 에러가 발생하면, 해당 에러 객체가 catch() 메서드의 매개변수인 error에 자동으로 전달됩니다.
                console.error('Error fetching pet information:', error);
            });
        // 임시로 예약 정보를 생성하여 상태를 업데이트합니다.
    }, [currentDate]);

    const generateCalendar = () => {
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const startDate = firstDay.getDay();
        const calendar = [];

        for (let i = 0; i < startDate; i++) {
            calendar.push(<div className="date empty" key={`empty-${i}`}></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const isSelected = date.toDateString() === currentDate.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();
            const isHoliday = (i === 15 && currentDate.getMonth() === 7); // Example: 1st of the month and August 15th

            const classNames = ["date"];
            if (isSelected) classNames.push("selected");
            if (isToday) classNames.push("today");
            if (isHoliday) classNames.push("holiday");
            if (date.getDay() === 6) classNames.push("saturday"); // Add "saturday" class for Saturdays
            if (date.getDay() === 0) classNames.push("sunday"); // Add "sunday" class for Sundays

            // 예약 정보를 가져옵니다.
            const reservationsForDate = getReservationsByDate(date);
            const isExpanded = expandedReservations[date];

            calendar.push(
                <div className={classNames.join(" ")} key={i} onClick={() => handleDateClick(date)} date={date}>
                    <div className={isHoliday ? "holiday-date" : "date-text"}>
                        {i}
                    </div>

                    {/* 예약 정보 표시 */}
                    <div className="reservation-info">
                        {reservationsForDate.slice(0, isExpanded ? reservationsForDate.length : 3).map((reservation, index) => (
                            <div key={index}>
                                {reservation.confirmed === false && (
                                    <div className="status-box2 request">
                                        <span>{reservation.time.substring(6)} {reservation.petName}</span> {/* Extract HH:mm from "MM-DD HH:mm" */}
                                    </div>
                                )}
                                {reservation.confirmed === true && (
                                    <div className="status-box2 confirmed">
                                        <span>{reservation.time.substring(6)} {reservation.petName}</span> {/* Extract HH:mm from "MM-DD HH:mm" */}
                                    </div>
                                )}
                            </div>
                        ))}
                        {reservationsForDate.length > 3 && (
                            <div className="see-more-button" onClick={() => handleExpandClick(date)}>
                                {isExpanded ? "접기" : "더 보기"}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return calendar;
    };

    const handlePrevMonth = () => {
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        setCurrentDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        setCurrentDate(nextMonth);
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const handleDateClick = (date) => {
        setCurrentDate(date);
    };

    const getFormattedMonth = () => {
        const options = { year: 'numeric', month: 'long' };
        return currentDate.toLocaleDateString(undefined, options);
    };

    const getReservationsByDate = (date) => {
        if (!date) {
            return [];
        }

        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayString = nextDay.toISOString().split('T')[0];

        const reservationsForDate = reservations.filter((reservation) => {
            const reservationDate = reservation.time.substring(0, 5); // Extract MM-DD from "MM-DD HH:mm"
            return reservationDate === nextDayString.substring(5); // Compare MM-DD
        });

        // Sort reservations by time
        const sortedReservations = reservationsForDate.sort((a, b) => {
            return a.time.localeCompare(b.time);
        });

        return sortedReservations;
    };


    return (
        <div className="adminhome">
            <h4>{admin_name[0]}님 반갑습니다!</h4>
            <div className="calendar">
                <div className="nav1">
                    <div className="nav">
                        <button className="nav-btn go-prev" onClick={handlePrevMonth}>&lt;</button>
                        <button className="nav-btn go-today" onClick={handleToday}>{getFormattedMonth()}</button>
                        <button className="nav-btn go-next" onClick={handleNextMonth}>&gt;</button>
                    </div>
                    <div className="reservation-status">
                        <div className="status">
                            <div className="status-box request"></div>
                            <span>예약요청</span>
                        </div>
                        <div className="status">
                            <div className="status-box confirmed"></div>
                            <span>예약확정</span>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="day sunday">일</div> {/* Add "sunday" class */}
                    <div className="day">월</div>
                    <div className="day">화</div>
                    <div className="day">수</div>
                    <div className="day">목</div>
                    <div className="day">금</div>
                    <div className="day saturday">토</div> {/* Add "saturday" class */}
                </div>
                <div className="dates">
                    {generateCalendar()}
                </div>
            </div>
        </div>
    );
}

export default Adminhome;