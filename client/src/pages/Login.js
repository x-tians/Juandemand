//Packages
import { BsExclamationTriangleFill, BsArrowLeft} from 'react-icons/bs';
import axios from 'axios';
import Cookie from 'universal-cookie'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

// Style
import '../styles/Login.css'

// Image
import loginGif from '../assets/login.gif';
import handy from '../assets/handylogo.png';

const Login = () => {

    //initialization of variables
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError]=useState('');
    const [isLogin,setLogin]=useState(false);
    const cookie = new Cookie();

    //update the value of email and password-2 way binding for input
    const onItemNameChangeHandler = ( event ) => {
        (event.target.name ==='password') ? setPassword(event.target.value) : setEmail( event.target.value );
        setError( '' );
    }
    //check the email and password if correct.
    const onSubmitEvent = async (event) => {
        event.preventDefault();
        
        //navigate('/feed'); 
         await axios.post('http://localhost:8080/api/v1/auths', {
             email,
             pwd:password
         })
         .then(function (response) {
             if(response.data.decrypt){
                  cookie.set('token',response.data.token , { path: '/' })
                  if(cookie.get('token')){
                        navigate('/feed');
                 }else{
                     setLogin(false);
                     navigate('/');
                 }
             }else{
                 setError('Invalid email or Password!');
             }
         })
         .catch(function (error) {
             console.log(error);
         });
    }

    //if the captcha is correct update the value of isLogin variable to true
    const onChangeRecaptcha = (value) => {
        setLogin(true);
    };

    const onLoginBackClickHandler = () => {
        navigate('/');
    }

    return(
        <div className='full-login'>
            <div className='login-horizontal-line'>
                <div className='login-logo-container'>
                    <button className='login-back-container'
                    onClick={onLoginBackClickHandler}>
                        <BsArrowLeft className='login-back' size={20} />
                    </button>
                    <h3 className='text-login'>Your journey begins.</h3>
                    <img className='login-gif' src={loginGif} alt='login-gif' />
                </div>
                <div className='login'>
                    <div className='login-container'>
                        <div className='person-logo'>
                            <img className='login-logo' src={handy} alt='logo'/>
                        </div>
                        <h4 className='login-heading'>JuanDemand</h4>
                        <form 
                        className='login-form'
                        onSubmit={onSubmitEvent}>
                            {
                                error && 
                                <div negative 
                                style={{position: 'absolute', zIndex: '1', top: '72vh', marginLeft: '30px' }}>
                                    <BsExclamationTriangleFill style={{color: 'red'}}/>
                                    {error}
                                </div>
                            }
                            <h6 className='login-txt'>Email</h6>
                            <input 
                            className='login-input'
                            icon ='user' 
                            iconPosition ='left' 
                            type ='email'
                            name ='email' 
                            value = {email} 
                            onChange = {onItemNameChangeHandler} />
                            <div className='password-container'>
                                <h6 className='login-txt'>Password</h6>
                                <Link to='#' className='login-link'>Forgot password?</Link>
                            </div>
                            <input 
                            className='login-input'
                            icon='key'
                            iconPosition='left' 
                            type='password' 
                            name='password' 
                            value={password} 
                            onChange={onItemNameChangeHandler}/>
                            <ReCAPTCHA
                                className='captcha'
                                onChange={onChangeRecaptcha}
                                sitekey='6LeGPRIjAAAAAB93xvFXDVbxs8d3jx8C_BLYfg7q' />
                            {
                                (isLogin) ? <button className='login-btn' type='submit'>Login</button> : <h6>Login</h6>
                            }
                            <br/>
                        </form>
                        <div className='login-create'>
                            <p className='login-new'>New to JuanDemand? </p>
                            <div className='create-account'>
                            <Link to='/register' 
                            className='login-link login-link2 '>
                                Create an account.
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;