import Animore_logo from '../img/13.png';

function Header(props) {
    return (
      <header>
        <div className='logo'>
          <img src={Animore_logo} onClick={() => props.navigate('/')} alt="로고"></img>
        </div>
        <div className="Navbar">
          <ul>
            <li 
            className={props.location.pathname  === '/' ? 'active' : ''}
            onClick={() => props.handleItemClick('/')}>홈</li>
            <li 
            className={props.location.pathname  === '/beautysalon' ? 'active' : ''}
            onClick={() => props.handleItemClick('/beautysalon')}>미용실</li>
            <li 
            className={props.location.pathname  === '/reservation' ? 'active' : ''}
            onClick={() => props.handleItemClick('/reservation')}>예약내역</li>
            <li 
            className={props.location.pathname.startsWith('/mypage') ? 'active' : ''}
            onClick={() => props.handleItemClick('/mypage')}>마이페이지</li>
            <li 
            className={props.location.pathname  === '/' ? 'active' : ''}
            onClick={() => props.handleItemClick('/')}>로그아웃</li>
          </ul>
        </div>
      </header>
    )
  }

  export default Header;