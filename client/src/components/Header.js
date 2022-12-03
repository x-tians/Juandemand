// style
import '../styles/Header.css';

// Image
import handy from '../assets/handyheader.png';

const Header = () => {
  return (
    <>
    <header>
      <img src={handy} className='handy' alt='handyjuan-logo' />
      <button className='logout'>Log out</button>
    </header>
    </>
  )
}

export default Header;