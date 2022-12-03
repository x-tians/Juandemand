import {BsArrowLeft} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';

import teampic from '../assets/teampic.jpg';
import christian from '../assets/christian.jpg';
import mean from '../assets/mean.jpg';
import benson from '../assets/benson.jpg';

import '../styles/AboutUs.css';


const AboutUs = () => {  

  const navigate = useNavigate();

  const onAboutBackClickHandler = () => {
    navigate('/');
  }
  return (
    <div className='aboutuscontainer'>
      <button className='about-back-container'
                    onClick={onAboutBackClickHandler}>
                        <BsArrowLeft className='about-back' size={20} />
                    </button>
      <center><div className='teampic'><img src={teampic} alt='team'/></div></center>
      
      <center><h1>WHO WE ARE</h1></center>
      <br />
      <p>The demand of skilled workers recently increased, the build build build project of the previous administration paved the way to boost the demand of skilled workers specially in the Philippine Construction Industry.</p>
      <br />
      <p>So we the LHG management decided to build this application to ease and help skilled workers find job easily and in the comfort of wherever they are as long as internet is present.</p>
      <br />
      <p>As a team of Web Developers, we decided to cater to Vocational and short course graduates because we want to have an app where only these kind of job hunters are able to look for employers and vice versa, a more concentrated app.</p>
      <br />
      <p>We set up this app to lessen the time for skilled workers finding jobs with too much leg work. As of August 2022 the month we launch the website and app, we were able to let around 900+ skilled workers to be hired by registered employers in this website. There was an approximately increase of 5% - 9% every month after that.</p>
      <br />
      <h4>MISSION:</h4>
      <br />
      <p>To be a model and a reputable job hunting website to every skilled workers and Employers.</p>
      <br />
      <h4>GOAL:</h4>
      <br />
      <p>To be a channel of productivity to every skilled graduates in 5 years to increase the employed blue collar. </p>
      <br />
      <center><h4>OUR TEAM</h4></center>
      <br />
      <div className='imgcontainer'>
        <div className='teammember' id='one'>
          <img className='teammember-img' src={benson} alt='team member'/>
          <p>Mark Benson Hernando</p>
          <p>Founder</p>
        </div>
        <div className='teammember' id='one'>
          <img className='teammember-img' src={mean} alt='team member'/>
          <p>Mary Ann Gabino</p>
          <p>Founder</p>
        </div>
        <div className='teammember' id='one'>
          <img className='teammember-img' src={christian} alt='team member'/>
          <p>Christian Langawan</p>
          <p>Founder</p>
        </div>
      </div>
      <br /> 
  </div>
  )
}

export default AboutUs;