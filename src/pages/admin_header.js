import './admin_header.css';
import Animore_logo from '../img/13.png';
import { useCookies } from "react-cookie";

function Admin_Header(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    
    const logOut = () => {
          removeCookie('id'); // 쿠키를 삭제
          props.navigate('/'); // 메인 페이지로 이동
      };
  
    return (
      <header>
        <div className='logo'>
          <img src={Animore_logo} onClick={() => props.navigate('/')} alt="로고"></img>
        </div>
        <div className="Navbar">
          <ul>
            <li 
            className={props.location.pathname === '/' ? 'active' : ''}
            onClick={() => props.handleItemClick('/')}>홈</li>
            <li 
            className={props.location.pathname === '/shop' ? 'active' : ''}
            onClick={() => props.handleItemClick('/shop')}>미용실</li>
            <li 
            className={props.location.pathname === '/reservelist' ? 'active' : ''}
            onClick={() => props.handleItemClick('/reservelist')}>예약내역</li>
            <li 
            className={props.location.pathname.startsWith('/adminpage') ? 'active' : ''}
            onClick={() => props.handleItemClick('/adminpage')}>관리자 페이지</li>
            <li 
            className={props.location.pathname === '/' ? 'active' : ''}
            onClick={logOut}>로그아웃</li>
          </ul>
        </div>
      </header>
    )
  }

  export default Admin_Header;