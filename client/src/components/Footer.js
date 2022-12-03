import '../styles/Footer.css'

import handylogo from '../assets/handylogo.png'
const Footer = () => {
  return (
    <footer>
      <div className='container'>
        <div className='footerlinks'>
        <div className='navres'>
            <div className='company'>
              <div >
                <h6>Company Name:</h6>
                <h4>LHG Company</h4>
                <strong><p>MISSION:</p></strong>
                <p className='comp'>To be a model and a reputable job hunting website to every skilled workers and Employers.</p>
                <strong><p>GOAL:</p></strong>
                <p className='comp'>To be a channel of productivity to every skilled graduates in 5 years to increase the employed blue collar.</p>
              </div>
              <div className='address'>
              <p>Address:</p>
              <a href='https://www.google.com/maps/search/navy+base+baguio+city/@16.4173206,120.6089248,17z/data=!3m1!4b1' target='_blank'>Navy Base,Baguio</a>
            </div>
          </div>
            <div className='link'>
                <strong><p>Resources:</p></strong>
                <a href="https://www.flaticon.com/free-icons/filter" title="filter icons" target='_blank'>Flaticon</a>
                <a href='https://www.freepik.com/' target='_blank'>Freepik</a>
                <a href='https://www.canva.com/' target='_blank'>Canva</a>
                <a href='https://www.figma.com/' target='_blank'>Figma</a>
            </div>
            <div className='navigation'>
            <strong><p>Navigation</p></strong>
              <a href='/'>Home</a>
              <a href='/log-in'>Login</a>
              <a href='/register'>Register</a>
              <a href='/feed'>Feed</a>
              <a href='/about-us'>About Us</a>
            </div>
          </div>
          </div>
        <div className='footercontainer'>
          <img className='logoimage' src={handylogo} alt="logo" size="50px" />
          <h4 className='allrights'>&#169;All rights reserved 2022</h4>
        </div>
        <div className='linkpp'>
          <a className='landing-policy' href="/privacy-policy" target="_blank" >Privacy Policy</a>
        </div>
        </div>

    </footer>
  );
}

export default Footer;
