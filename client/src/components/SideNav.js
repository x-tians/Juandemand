import {Link} from 'react-router-dom';

const SideNav = () => {
  return (
    <nav>
        <ul>
            <li>
                <Link className='link' to='/log-in'>Login</Link>
            </li>
            <li>
                <Link className='link' to='/register'>Register</Link>
            </li>
            <li>
                <Link className='link' to='/'>Home</Link>
            </li>
            <li>
                <Link className='link' to='/about-us'>About Us</Link>
            </li>
            <li>
                <Link className='link' to='/profile'>Profile</Link>
            </li>
            <li>
                <Link className='link' to='/feed'>Feed</Link>
            </li>
        </ul>
    </nav>
  )
}
export default SideNav;