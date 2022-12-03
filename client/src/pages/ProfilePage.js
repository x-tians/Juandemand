// Packages
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie'
import Modal from 'react-modal';
import { BsTrashFill,BsPlusCircleFill, BsArrowLeft } from "react-icons/bs";

// Style
import '../styles/Profile.css';

// Image
import star from '../assets/star.png';
import halfstar from '../assets/halfstar.png';
import nonestar from '../assets/nonestar.png';
import handy from '../assets/handylogo.png';
import mail from '../assets/mail.png';
import profico from '../assets/user.png';
import fauget from '../assets/fauget.png';
import lightstudio from '../assets/lightstudio.png';
import sunnyside from '../assets/sunnyside.png';
import teandahan from '../assets/teandahan.png';
import buboy from '../assets/buboy.png';
import glow from '../assets/glow.png';

const customStyles = {
  content: {
    position:'absolute',
    zIndex: '5',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'500px',
    //height:'600px',
    backgroundColor: '#1a76d2',
    padding:'20px',
    borderRadius: '12px',
    border:'1px solid #007bff',
    overFlow:'auto',
  },
};


const Profile = () => {
  const userToken = new Cookie();
  const userTok=userToken.get('token');
  const navigate = useNavigate();
  const [user,setUser]=useState();
  const [msg,setMsg]=useState('');
  const [isUpdate,setUpdate]=useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenSkills, setIsOpenSkills] = useState(false);
  const [modalIsOpenExperience, setIsOpenExperience] = useState(false);
  const [modalIsOpenEducation, setIsOpenEducation] = useState(false);
  const [modalIsOpenEmail, setIsOpenEmail] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');

  const [skillRemove, setSkillRemove] = useState(false);
  const [expRemove, setExpRemove] = useState(false);
  const [educRemove, setEducRemove] = useState(false);
  
  const expInitialValue=[{
    experience:'',
    company:'',
    yearStart:'',
    yearEnd:''
  }]
  const educInitialValue=[{
    course:'',
    school:''
  }]

  useEffect( () => {
    setUpdate(false);
    loadUser();
 }, [isUpdate]);

 //get the user information
 const loadUser =async()=>{
  await axios.post('http://localhost:8080/api/v1/users/profile',{
      token:userTok
  }).then( response => {
      if(!response.data.status==='failed'){
      navigate('/');
      }else{
        setUser( response.data.result );
        if(Number(response.data.result.experience.length)<=0){
          let newValue=response.data.result;
          newValue.experience=expInitialValue;
          setUser({...newValue});
        }
        if(Number(response.data.result.education.length)<=0){
          let newValue=response.data.result;
          newValue.education=educInitialValue;
          setUser({...newValue});
        }
      }
  })
}
//upload user image
const handleFileSelect = (event) => {
  if(event.target.files[0]){
    uploadImage(event.target.files[0]);
  }
}
const uploadImage=async(file)=>{
  const formData = new FormData();
   formData.append('selectedFile', file);
   formData.append('id', user._id);
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:8080/api/v1/uploads',
      data: formData,
       headers: { 'Content-Type': 'multipart/form-data' },
    });
      let users=user;
      users.userImage=response.data.name;
      setUser({...users});
      setMsg(response.data.msg);
      setUpdate(true);
  } catch(error) {
       console.log(error)
  }
}
//close education modal
const closeEducation=()=>{
  //setIsOpen(false);
  setIsOpenEducation(false);
  setModalOpen(false);
}
//close the modal
const closeModal=()=> {
  setIsOpen(false);
  setModalOpen(false);
}
//close skills modal
const closeSkillModal=()=>{
  setIsOpenSkills(false);
  setModalOpen(false);
}
//close experience modal
const closeExperience=()=>{
  setIsOpenExperience(false);
  setModalOpen(false);
}
//close the email modal
const closeEmail=()=>{
  setIsOpenEmail(false);
  setModalOpen(false);
}
//update the value of the user state
const onChangeHandlerUser=(event)=>{
  let users=user;
  //console.log(event.target.name);
  const index=event.target.name.split('-');

  switch(event.target.name){
    case'firstName':
      users.firstName=event.target.value;
    break;
    case'lastName':
      users.lastName=event.target.value;
    break;
    case'middleName':
      users.middleName=event.target.value;
    break;
    case'sex':
      users.sex=event.target.value;
    break;
    case'birthDate':
      users.birthDate=event.target.value;
    break;
    case'address':
      users.address[0].address=event.target.value;
    break;
    case'municipality':
      users.address[0].municipality=event.target.value;
    break;
    case'province':
      users.address[0].province=event.target.value;
    break;
    case'contactNumber':
      users.contactNumber=event.target.value;
    break;
    case`skill-${index[1]}`:
      let newSkills=users.skills;
      newSkills[Number(index[1])]=event.target.value.toUpperCase();
      users.skills=[...newSkills];
    break;
    case'confirmPassword':
      setConfirmPassword(event.target.value);
    break;
    case'email':
      users.email=event.target.value;
    break;
    case'newPassword':
      setNewPassword(event.target.value);
    break;
    case'password':
      setPassword(event.target.value);
    break;
    
    

    default:
      break;
  }
  setUser({...users});
}
//Update the value of the Experience and education
const onChangeHandlerExp=(event)=>{
  let users=user;
  const index=event.target.name.split('-');
  
  switch(event.target.name){
    case`experience-${index[1]}`:
    let newExperience=users.experience;
    newExperience[Number(index[1])].experience=event.target.value;
    users.experience=[...newExperience];
  break;
  case`experienceCompany-${index[1]}`:
    let newExpCompany=users.experience;
    newExpCompany[Number(index[1])].company=event.target.value;
    users.experience=[...newExpCompany];
  break;
  case`experienceStart-${index[1]}`:
    let newExpStart=users.experience;
    newExpStart[Number(index[1])].yearStart=event.target.value;
    users.experience=[...newExpStart];
  break;
  case`experienceEnd-${index[1]}`:
    let newExpEnd=users.experience;
    newExpEnd[Number(index[1])].yearEnd=event.target.value;
    users.experience=[...newExpEnd];
  break;

  case`course-${index[1]}`:
    let newCourse=users.education;
    newCourse[Number(index[1])].course=event.target.value;
    users.education=[...newCourse];
  break;
  case`educationSchool-${index[1]}`:
    let newSchool=users.education;
    newSchool[Number(index[1])].school=event.target.value;
    users.education=[...newSchool];
  break;
    default:
      break;
  }
  setUser({...users});
}

//add skills
const onChangeHandlerSkill=()=>{
  let users=user;
      user.skills.push('');
  setUser({...users});
}
//remove skill
const onClickHandlerRemoveSkill=(index)=>{
  if(!skillRemove)
  {
    let users=user;
    user.skills.splice(Number(index),1);
    setUser({...users});
    setSkillRemove(false)
  }
  
  /*
  const n=event.target.id;
  console.log(n)
  const index=event.target.className;
  let users=user;
    user.skills.splice(Number(index),1);
  setUser({...users});*/
}
//add Experience
const onChangeHandlerExperience=()=>{
  let users=user;
      user.experience.push(expInitialValue[0]);
  setUser({...users});
}
//remove Experience
const onChangeHandlerRemoveExperience=(index)=>{
  //const index=event.target.className;
  if(!expRemove)
  {
    let users=user;
      user.experience.splice(Number(index),1);
    setUser({...users});
    setExpRemove(false);
  }
}

//add education
const onChangeHandlerEducation=()=>{
  let users=user;
      user.education.push(educInitialValue[0]);
  setUser({...users});
}
//remove education
const onChangeHandlerRemoveEducation=(index)=>{
  if(educRemove){
    let users=user;
      user.education.splice(Number(index),1);
    setUser({...users});
    setEducRemove(false);
  }
}



//update the user function 
const updateUserProfile=async()=>{
  await axios.put('http://localhost:8080/api/v1/users', {
       token:userTok,
        user
     })
    .then(function (response) {
      if(response.data){
           //setMsg(response.data.msg);
           alert(response.data.msg);
           setUpdate(true);
       }
    })
    .catch(function (error) {
       console.log(error);
  });
}

//update the basic information of the users
const onSubmitHandlerUser=async(event)=>{
  event.preventDefault();
  updateUserProfile();
}
const onSubmitHandlerEmails=async(event)=>{
  event.preventDefault();
  if(newpassword.trim()===confirmPassword.trim())
  {
    await axios.patch('http://localhost:8080/api/v1/users', {
        userTok:userTok,
        newPwd:newpassword,
        email:user.email,
        oldPwd:password
      })
    .then(function (response) {
      if(response.data){
            //setMsg(response.data.msg);
            alert(response.data.msg);
            setUpdate(true);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }else{
    alert('The password must be the same as the confirm password.');
  }
}


if(!user){
  return (
    <div className='flex vh-100 w-100 center-justify'>
      <strong>Please wait...</strong>
    </div>
  )
}

const onInboxClickHandler = () => {
  navigate('/messages');
}

const onProfileBackClickHandler =  () => {
  navigate('/feed')
}

  return (
  <>
    <div className='profile-content-wrapper'>
    <button className='profile-back-container'
                    onClick={onProfileBackClickHandler}>
                        <BsArrowLeft className='profile-back' size={20} />
                    </button>
      <div className='profile-left'>
        <div className='profile-left-inner'>
          <p className='profile-quote'>
            “You are not your resume,
          </p>
          <p className='profile-quote'>
            you are your work.”
          </p>
          <p className='profile-quote'>
          -Seth Godin
          </p>
          <p className='rating rating-main'>Rating</p>
          <div className='profile-left-1'>
            <div className='five-star'>
              <img className='stars' src={star} alt='star'/>
              <img className='stars' src={star} alt='star'/>
              <img className='stars' src={star} alt='star'/>
              <img className='stars' src={halfstar} alt='halfstar'/>
              <img className='stars' src={nonestar} alt='nonestar'/>
            </div>
            <p className='rating score'>3.5/5.0</p>
            <p className='rating'>
              out of <span className='span-rating'>15</span> reviews
            </p>
            <div className='profile-brand-box'>
              <img className='profile-brand' src={handy} alt='logo'/>
            </div>
            <button className='profile-msg'
            onClick={onInboxClickHandler}>
              <img className='profile-mail' src={mail} alt='inbox'/>
              <span>Inbox</span>
            </button>
          </div>
        </div>
        <div className='profile-view'>
          <p>Suggested Company</p>
          <div className='view-one'>
            <img className='profile-ico' src={teandahan} alt='teandahan' />
            <div className='view-two'>
              <span className='view'>Teandahan</span>
              <span className='view'>MilkTea Shop</span>
            </div>
          </div>
          <div className='view-one'>
            <img className='profile-ico' src={buboy} alt='buboy' />
            <div className='view-two'>
              <span className='view'>Buboy Santos</span>
              <span className='view'>Multimedia Artist</span>
            </div>
          </div>
          <div className='view-one'>
            <img className='profile-ico' src={fauget} alt='fauget' />
            <div className='view-two'>
              <span className='view'>Fauget</span>
              <span className='view'>Restaurant</span>
            </div>
          </div>
          <div className='view-one'>
            <img className='profile-ico' src={sunnyside} alt='sunnyside' />
            <div className='view-two'>
              <span className='view'>Gerald Santos</span>
              <span className='view'>Bakery</span>
            </div>
          </div>
          <div className='view-one'>
            <img className='profile-ico' src={lightstudio} alt='lightstudio' />
            <div className='view-two'>
              <span className='view'>Light Studio</span>
              <span className='view'>Photography</span>
            </div>
          </div>
          <div className='view-one'>
            <img className='profile-ico' src={glow} alt='glow' />
            <div className='view-two'>
              <span className='view'>The Glow Glows</span>
              <span className='view'>Salon</span>
            </div>
          </div>
          <button className='profile-msg show-all'>
            <span>Show All</span>
          </button>
        </div>
      </div>
      <div className='profile-container'>
        <div className='profile-head'>
          <section className='profile-header-section flex w-100'>
            <div className={(!modalOpen) ? 'profile-header-edit-img flex center-justify profile-header-edit-img-inactive':'profile-header-edit-img flex center-justify profile-header-edit-img-active' }>
              <input type='file' className='custom-file-input' onChange={handleFileSelect} />
            </div>
            <img className={(!modalOpen) ? 'img img-inactive':'img img-active'} src={`http://localhost:8080/users/${user.userImage}`} alt='user'/>
            <div className= 'profile-header-edit'>
              <button className='edit-button'
               onClick={()=>{ 
                setIsOpen(true)
                setModalOpen(true);
                }}>
                Edit
              </button>
            </div>  
          </section>
          <div className='profile-about'>
            <h3>{`${user.firstName} ${user.middleName} ${user.lastName}`}</h3>
            <strong>{user.userType.userType}</strong>
            <br/>
            <h4>{user.sex}</h4>
            <h4>{user.birthDate}</h4>
            <h4>{`${user.address[0].address}, ${user.address[0].municipality}, ${user.address[0].province} `}</h4>
            <h4>{user.contactNumber}</h4>
            <h4>{user.email} <button className='edit-button' onClick={()=>{setIsOpenEmail(true);setModalOpen(true); }}>Edit</button></h4> 
          </div>

          <section className='profile-skills-section flex column profile-skills'>
            <div className='profile-section-title w-100 center'>
              <h3>Skills</h3>
              <div className='flex'>
                <button className='edit-button' onClick={()=>{
                  setIsOpenSkills(true); 
                  setModalOpen(true); }}>
                  Edit
                </button>
              </div>
            </div>
            <ul>
              {
                (user.skills.length>0) ?  user.skills.map((skill,index)=>{return <li key={`skills-${index}`} style={{listStyle:'none'}} >{skill}</li>}) : <li key={`skills-001`} style={{listStyle:'none'}}>No skills yet.</li>
              
              }
            </ul>
          </section>

          <section className='profile-skills-section flex column'>
            <div className='profile-section-title w-100 center'><h3>Experience</h3><div className='flex'><button className='edit-button' onClick={()=>{setIsOpenExperience(true); setModalOpen(true);}}>Edit</button></div></div>
            <ul>
                  {
                    user.experience.map(exp=>{
                      return <><li style={{listStyle:'none'}} ><p><strong>{exp.experience}</strong> <br/>{exp.company} <br/>{exp.yearStart} -  {exp.yearEnd}</p></li></>
                    })
                  }
            </ul>
          </section>

          <section className='profile-skills-section flex column'>
            <div className='profile-section-title w-100 center'><h3>Education</h3><div className='flex'><button className='edit-button' onClick={()=>{setIsOpenEducation(true); setModalOpen(true);}}>Edit</button></div></div>
            <ul>
                {
                  user.education.map(educ=>{
                    return <><li style={{listStyle:'none'}} ><p><strong>{educ.course}</strong> <br/>{educ.school}</p></li></>
                  })
                }
            </ul>
          </section>

        </div>
      </div>

  {/*modal for information update*/}
      <Modal isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}>

          <div className='modal-title'>
            <h3>Edit Profile</h3>
          </div>           
          <form className='flex column modal-body' onSubmit={onSubmitHandlerUser}>
            <label htmlFor='firstName'>Firstname</label>
            <input className='input-modal' type={'text'} name={'firstName'} value={user.firstName} onChange={onChangeHandlerUser} required/>
            <label htmlFor='middleName'>Middlename</label>
            <input className='input-modal' type={'text'} name={'middleName'} value={user.middleName}  onChange={onChangeHandlerUser} required/>
            <label htmlFor='lastName'>Lastname</label>
            <input className='input-modal' type={'text'} name={'lastName'} value={user.lastName}  onChange={onChangeHandlerUser} required/>
            
            <label htmlFor='address'>Address</label>
            <input className='input-modal' type={'text'} name={'address'} value={user.address[0].address}  onChange={onChangeHandlerUser} required/>
              
            <label htmlFor='municipality'>Municipality</label>
            <input className='input-modal' type={'text'} name={'municipality'}value={user.address[0].municipality} onChange={onChangeHandlerUser} required/>
              
            <label htmlFor='province'>Province</label>
            <input className='input-modal' type={'text'} name={'province'} value={user.address[0].province}  onChange={onChangeHandlerUser} required/>

            <label htmlFor='sex'>Sex</label>
            <select className='input-modal' name={'sex'} value={user.sex}  onChange={onChangeHandlerUser} required>
                <option value={'male'}>Male</option>
                <option value={'female'}>Female</option>
              </select>
            <label htmlFor='birthDate'>Birthdate</label>
            <input className='input-modal' style={{padding:'18px'}} type={'date'} name={'birthDate'} value={user.birthDate} onChange={onChangeHandlerUser} required/> 
            <label htmlFor='contactNumber'>Contact Number</label>
            <input className='input-modal' type={'text'} name={'contactNumber'} value={user.contactNumber} onChange={onChangeHandlerUser} required/>  
            <br/>
            <button className='input-modal' type='submit'  name='save'>Update</button> 
          </form>
          <button className='input-modal input-button' onClick={closeModal}>close</button>
      </Modal>
    {/* modal for skills*/}
    <Modal isOpen={modalIsOpenSkills}
        onRequestClose={closeSkillModal}
        style={customStyles} className=' modal-skill'>

          <div className='modal-title'>
            <h3 className='edit-skills'>Edit Skills</h3>
          </div>
          
           <div className='trash' onClick={onChangeHandlerSkill}><BsPlusCircleFill  color={'#fb8500'}/> Add</div>      
          <form className='flex column modal-body skill-body' onSubmit={onSubmitHandlerUser}>
              {
                user.skills.map((skill,index)=>{
                  
                  return <> <div className='trash'>< BsTrashFill id={index} onClick={()=>{ setSkillRemove(true); onClickHandlerRemoveSkill(index)}} color={'#cf7107'} size={20}/></div>  
                  <input className='input-modal' type={'text'} placeholder={'Skill'} name={`skill-${index}`} value={user.skills[index]} required onChange={onChangeHandlerUser} /></>
                })
              }  
            <br/>
            {
              <button className='input-modal' type='submit'  name='save'>Update Skills</button> 
            }
            
          </form>
          <button className='input-modal input-button' onClick={closeSkillModal}>close</button>
      </Modal>
      {/* Experience modal */}

      <Modal isOpen={modalIsOpenExperience}
        onRequestClose={closeExperience}
        style={customStyles} className=' modal-skill modal-experience' >

          <div className='modal-title'>
            <h3>Edit Experience</h3>
          </div>
  
          <div className='trash' onClick={onChangeHandlerExperience}><BsPlusCircleFill  color={'#fb8500'}/> Add</div>  
                  
          <form className='flex column modal-body experience-body' onSubmit={onSubmitHandlerUser}>
              {(user.experience.length>0) &&
                user.experience.map((experience,index)=>{
                  //console.log(experience)
                  return <>
                    <div className='trash'>< BsTrashFill className={index} onClick={()=>{setExpRemove(true); onChangeHandlerRemoveExperience(index)}} color={'#cf7107'} size={20}/></div>
                    <input placeholder='Position' className='input-modal' type={'text'} name={`experience-${index}`} value={user.experience[index].experience} required onChange={onChangeHandlerExp} />
                     
                    <input style={{marginTop:'12px'}} className='input-modal' type={'text'} placeholder={'Company'} name={`experienceCompany-${index}`} value={user.experience[index].company} required onChange={onChangeHandlerExp} />
                    <div className='flex center-justify' style={{paddingTop:'12px'}}> 
                      
                      <input placeholder='Year Started' className='input-modal' style={{width:'200px'}} type={'text'} name={`experienceStart-${index}`} value={user.experience[index].yearStart} required onChange={onChangeHandlerExp} />
                      
                      <input className='input-modal' placeholder='Year Ended' style={{width:'200px', marginLeft:'12px'}} type={'text'} name={`experienceEnd-${index}`} value={user.experience[index].yearEnd} required onChange={onChangeHandlerExp} />
                    </div>
                  </>
                })
              }  
            <br/>
            {
              (user.experience.length>0) && <button className='input-modal' type='submit'  name='save'>Update Experience</button> 
            }
            
          </form>
          <button className='input-modal input-button' onClick={closeExperience}>close</button>
      </Modal>

      <Modal isOpen={modalIsOpenEducation}
        onRequestClose={closeEducation}
        style={customStyles} className=' modal-skill modal-experience' >

          <div className='modal-title'>
            <h3>Edit Education</h3>
          </div>
          <div className='trash' onClick={onChangeHandlerEducation}><BsPlusCircleFill  color={'#fb8500'}/> Add</div>            
          <form className='flex column modal-body experience-body' onSubmit={onSubmitHandlerUser}>
              {(user.education.length>0) &&
                user.education.map((educ,index)=>{
                  return <>
                    <div className='trash'>< BsTrashFill className={index} onClick={()=>{setEducRemove(true);onChangeHandlerRemoveEducation(index)}} color={'#cf7107'} size={20}/></div>
                    <input Placeholder='Course' className='input-modal' type={'text'} name={`course-${index}`} value={user.education[index].course} required onChange={onChangeHandlerExp} />
                    <input style={{marginTop:'12px'}}Placeholder='School' className='input-modal' type={'text'} name={`educationSchool-${index}`} value={user.education[index].school} required onChange={onChangeHandlerExp} />
                  </>
                })
              }  
            <br/>
            {
              (user.experience.length>0) && <button className='input-modal' type='submit'  name='save'>Update Education</button> 
            }
            
          </form>
          <button className='input-modal input-button' onClick={closeEducation}>close</button>
      </Modal>

      <Modal isOpen={modalIsOpenEmail}
        onRequestClose={closeEmail}
        style={customStyles} className=' modal-skill modal-experience' >
          <div className='modal-title'>
            <h3>Edit Username/Password</h3>
          </div>        
          <form className='flex column modal-body experience-body' onSubmit={onSubmitHandlerEmails}>
            <label htmlFor={'email'}>Email</label> 
            <input className='input-modal' type={'email'} name={`email`} value={user.email} required onChange={onChangeHandlerUser} />

            <label htmlFor={'password'}>Enter Old Password</label> 
            <input className='input-modal' type={'password'} name={`password`} value={password} required onChange={onChangeHandlerUser} />

            <label htmlFor={'newPassword'}>New Password</label> 
            <input className='input-modal' type={'password'} name={`newPassword`} value={newpassword} required onChange={onChangeHandlerUser} />
            <label htmlFor={'confirmPassword'}>Confirm Password</label> 
            <input className='input-modal' type={'password'} name={`confirmPassword`} value={confirmPassword} required onChange={onChangeHandlerUser} />
            <br/>
            {
              (user.experience.length>0) && <button className='input-modal' type='submit'  name='save'>UPDATE</button> 
            }
            
          </form>
          <button className='input-modal input-button' onClick={closeEmail}>close</button>
      </Modal>
      <div className='profile-right'>
        <div className='outer-profile-view'>
        <div className='profile-view'>
            <p>People also viewed</p>
            <div className='view-one'>
              <img className='profile-ico' src={profico} alt='progico' />
              <div className='view-two'>
                <span className='view'>Ricardo Dalisay</span>
                <span className='view'>Carpenter</span>
              </div>
            </div>
            <div className='view-one'>
              <img className='profile-ico' src={profico} alt='progico' />
              <div className='view-two'>
                <span className='view'>Juan Dela Cruz</span>
                <span className='view'>Computer Technician</span>
              </div>
            </div>
            <div className='view-one'>
              <img className='profile-ico' src={profico} alt='progico' />
              <div className='view-two'>
                <span className='view'>Jolina Alonzo</span>
                <span className='view'>Beautician</span>
              </div>
            </div>
            <div className='view-one'>
              <img className='profile-ico' src={profico} alt='progico' />
              <div className='view-two'>
                <span className='view'>Jinx Lastimosa</span>
                <span className='view'>Bartender</span>
              </div>
            </div>
            <div className='view-one'>
              <img className='profile-ico' src={profico} alt='progico' />
              <div className='view-two'>
                <span className='view'>Hakan Dimauyaw</span>
                <span className='view'>Car Technician</span>
              </div>
            </div>
            <button className='profile-msg show-all'>
              <span>Show All</span>
            </button>
          </div>
        </div>
        <div className='profile-view'>
          <p>People you may know</p>
          <div className='view-one'>
            <img className='profile-ico' src={profico} alt='progico' />
            <div className='view-two'>
              <span className='view'>Carlito Bukarkar</span>
              <span className='view'>Service Crew</span>
            </div>
          </div>
          <div className='view-one'>
            <img className='profile-ico' src={profico} alt='progico' />
            <div className='view-two'>
              <span className='view'>Alexander Buhaw</span>
              <span className='view'>Electrician</span>
            </div>
          </div>
          <div className='view-one'>
            <img className='profile-ico' src={profico} alt='progico' />
            <div className='view-two'>
              <span className='view'>Jopay Atsumak</span>
              <span className='view'>Waitress</span>
            </div>
          </div>
          <div className='view-one'>
            <img className='profile-ico' src={profico} alt='progico' />
            <div className='view-two'>
              <span className='view'>Gerald Santos</span>
              <span className='view'>Aircon Technician</span>
            </div>
          </div>
          <div className='view-one'>
            <img className='profile-ico' src={profico} alt='progico' />
            <div className='view-two'>
              <span className='view'>Georgia Nauyaw</span>
              <span className='view'>Hair Dresser</span>
            </div>
          </div>
          <button className='profile-msg show-all show-all-last'>
            <span>Show All</span>
          </button>
        </div>

      </div>
      <div className='whole-profile'></div>
    </div>
  </>
  )
}

export default Profile;