import {useState} from 'react';
import { useNavigate } from 'react-router';
import { useDispatch} from 'react-redux';//add

import Footer from '../components/Footer';

// Image
import landingpage from '../assets/landingpage.jpg';

// Style
import '../styles/HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();//add

  const navigate = useNavigate();
  const [typeBtn, setTypeBtn] = useState(false);
  const [typeBtn2, setTypeBtn2] = useState(true);

  const onTypeBtnClickHandler = () => {
    if(typeBtn) {
      setTypeBtn(false);
    }
    else {
      setTypeBtn2(true);
    }
    dispatch({type:'REGISTER_USERTYPE',payload:{userType:'638325309b72d5aa285a7a13'}})//add
  }

  const onTypeBtn2ClickHandler = () => {
    

    if(typeBtn2) {
      setTypeBtn(true);
    }
    else {
      setTypeBtn2(false);
    }

    dispatch({type:'REGISTER_USERTYPE',payload:{userType:'638325389b72d5aa285a7a15'}})//add
  }

  const onClickLoginHandler = event => {
    event.preventDefault();

    navigate('log-in');
  }

  const onClickRegisterHandler = event => {
    event.preventDefault();

    navigate('register');
  }

  return (
    <>
      <div className='firstpage'>
        <div>
          <img className='landing' src={landingpage} alt='landingpage'/>
          <div>
            {(!typeBtn) ? 
            <div>
            <h2 className='landing-heading-1'>
              Monetize
            </h2>
            <h3 className='landing-heading-2'>
              your skills.
            </h3>
          </div>
            :
            <div>
              <h2 className='landing-heading-1'>
                Uncover
              </h2>
              <h3 className='landing-heading-2'>
                your assets.
              </h3>
            </div>}
            <button className={(!typeBtn) ? 'landing-btn-1' :'landing-btn-1-active'}
            onClick={onTypeBtnClickHandler}>
              <h3 className='landing-btn-txt'>
                Job Hunter
              </h3>
            </button>
            <button className={(!typeBtn) ? 'landing-btn-2' :'landing-btn-2-active'}
            onClick={onTypeBtn2ClickHandler}>
              <h3 className='landing-btn-txt'>
                Employer
              </h3>
            </button>
          </div>
          <div className='landing-container'>
              <input className='landing-input' type='text' />
          </div>

          <div className='login-register'>
            <button className={(!typeBtn) ? 'landing-login' :'landing-login-active'}
            onClick={onClickLoginHandler}>
              <span className='log-log'>Login</span>
            </button>
            <button className={(!typeBtn) ? 'landing-register' :'landing-register-active'} 
            onClick={onClickRegisterHandler}>
              <span className='log-log'>Register</span>
            </button>
          </div>
        </div>
        <div className={(!typeBtn) ? 'how-to' :'how-to-active'} >
          <div className='how-to-container'>
            <h2 className='how-to-txt'>
              How to create an account?
            </h2>
            <div className='how-to-container-2'>
              <div className='how-to-1'>
                <p className='how-to-p'> Step 1:<br/>Click Job Hunter/<br/>Employer</p>
              </div>
              <div className='how-to-line'></div>
              <div className='how-to-2'>
                <p className='how-to-p'>Step 2:<br/>Click Register<br/>and Fill up the Form</p>
              </div>
              <div className='how-to-line'></div>
              <div className='how-to-3'>
                {(!typeBtn) ? 
                <p className='how-to-p'>Step: 3<br/>Accept offers</p>
                :
                <p className='how-to-p'>Step: 3<br/>Send offers</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default HomePage;