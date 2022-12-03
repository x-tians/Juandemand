import React from "react";
import teammember from "../assets/teammember.jpg";
import "../styles/feed.css";
import axios from "axios";
import Cookie from "universal-cookie";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsPerson, BsBellFill,BsDoorOpenFill } from "react-icons/bs";

const Feed = () => {
  const cookie = new Cookie();
  const userTok = cookie.get("token");
  const navigate = useNavigate();
  const [endpoints, setEndpoints] = useState([
    { url: `/api/v1/users/user?page=1&limit=50` },
  ]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [arrayMunicipality,setMunicipality] = useState([]);
  const [municipality,setMunicipalityValue]=useState('');
  const [work,setWork]=useState('');
  const [message,setMessage] = useState([]);
  const [notifyOpen, setIsOpen] = useState(false);
  const [notification,setNotification]=useState(false);
  const [login,setLogout]=useState(false);

  useEffect(() => {
    loadUsers(0);
    setIsOpen(false)
  }, [notifyOpen]);

  const loadUsers = async (index) => {
    await axios
      .post(`http://localhost:8080${endpoints[index].url}`,{token:userTok})
      .then(function (response) {
        if (response.data) {
          if (response.data.status === "failed") {
            navigate("/");
          } else {
            loadAddress();
            setEndpoints(response.data.pages);
            setUsers(response.data.data);
            getUser();
            loadMessages();
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getUser = async () => {
    await axios
      .post("http://localhost:8080/api/v1/users/profile", {
        token: userTok,
      })
      .then((response) => {
        if (!response.data.status === "failed") {
          navigate("/");
        } else {
          setUser(response.data.result);
        }
      });
  };

  const loadMessages=async()=>{
    await axios
      .post(`http://localhost:8080/api/v1/offers/read`,{token:userTok})
      .then((response) => {
  
        if(response.data.status==='success'){
          setMessage(response.data.msg)
        }else{
          setNotification(false);setMessage([])
        }
      });
  }

  const onSumitHandlerFilter=(event)=>{
    event.preventDefault();
    filter();

  }
  const filter = async () => {
    await axios
      .post("http://localhost:8080/api/v1/users/filter",{
        work,municipality,token:userTok
      })
      .then((response) => {

        if(response.data.status==='success'){
          setUsers(response.data.data);
        }else{
          alert(response.data.msg)
        }
        
      });
  };

  const loadAddress = async () => {
    await axios
      .get("http://localhost:8080/api/v1/users/address")
      .then((response) => {

        if (response.data.status === "success") {
          let arryMunicipality=[];
          response.data.msg.map((item, index) => {
           
            if ( !arryMunicipality.find( (mun) => mun === item.address[0].municipality )) {
              arryMunicipality.push(item.address[0].municipality);
            }
          });
          setMunicipality(arryMunicipality);
          setMunicipalityValue(arryMunicipality[0]);
        }
      });
  };
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    switch(name){
      case'work':
        setWork(event.target.value.toUpperCase());
        break;
      default:
          setMunicipalityValue(event.target.value);
        break;
    }
  }
  const onClickHandlerSendOffer=(event)=>{
    const id=event.target.id;
    const name=event.target.name;
    let stat='apply';
    if(name==='offer'){
      stat='offers';
    }
    sedOffer(id,stat);
  }
  const sedOffer = async (id,stat) => {
    await axios
      .post("http://localhost:8080/api/v1/offers",{
        token:userTok,to:id,status:stat
      }).then((response) => {
        
        if (response.data.status === "success") {
          alert(response.data.msg);
        }else{
          alert(response.data.msg);
        }
      });
  };
  const onClickEventOffers=async(event)=>{
    const name=event.target.name;
    const id=event.target.id;
    if(id==='delete'){
      await axios
        .delete(`http://localhost:8080/api/v1/offers/${name}`).then((response) => {
        if (response.data.status === "success") {
          alert(response.data.msg);
          setIsOpen(true);
        }else{
          alert(response.data.msg);
        }
      });
    }else{
      await axios
        .patch("http://localhost:8080/api/v1/offers",{
          id:name,stat:id+'-to'
        }).then((response) => {
        if (response.data.status === "success") {
          alert(response.data.msg);
          setIsOpen(true)
        }else{
          alert(response.data.msg);
        }
      });
    }

  }
  const onClickHandlerNotify=()=>{
      (notification) ? setNotification(false) : setNotification(true)
  }
  const onClickLogout=()=>{
    (login) ? setLogout(false) : setLogout(true)
  }
  const onClickHandlerLogout=async()=>{
    await axios.patch('http://localhost:8080/api/v1/auths', {
            token:userTok
          })
          .then(function (response) {
                cookie.remove('token', { path: '/' });
                navigate('/');
          })
          .catch(function (error) {
            console.log(error);
        });
  }
  const onClickHandlerProfile=()=>{
    navigate('/profile');
  }

  if (!user) {
    return (
      <div className="flex vh-100 w-100 center-justify">
        <strong>Please wait...</strong>
      </div>
    );
  }

  return (
    <div className="maincontainer">
      <div className="feed-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "medium",
            fontWeight: "100",
          }}
        >{`Hi! ${user.firstName}`}</div>
        <div></div>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <div style={{ width: "50px", display: "flex", alignItems: "center" }}>
          { (message.length) ? <>
              <div className='feed-notification' onClick={onClickHandlerNotify}><BsBellFill color={'#1a76d2'} /></div>
              <p style={{ paddingRight: "3px",fontWeight: "100",fontSize: "small",color: "red",}}>
                {message.length}
              </p></>
              :<BsBellFill color={"#1a76d2"} />
          }
            <div className= {(notification) ? 'feed-notification-container' : 'feed-notification-container-close'}>
              <div className='feed-notification-container-header'>
                <h3>Notifications</h3>
              </div>
              <div>
                {
                  //(user.userType._id=='638325389b72d5aa285a7a15') && 
                  (message.length>0) && message.map((mensahe,index)=>{
                    
                    return <>
                      {(mensahe.status==='offers') && <div className='feed-mensahe' key={index}> {`${mensahe.employer_ID.firstName} ${mensahe.employer_ID.lastName} ${mensahe.status} you a Job` }<button id='accept' name={mensahe._id} onClick={onClickEventOffers}>Accept</button><button name={mensahe._id} id='cancel' onClick={onClickEventOffers}>Decline</button></div>}
                      {(mensahe.status==='accept-to') && <div className='feed-mensahe' key={index} style={{backgroundColor:'rgb(3 245 42 / 39%)'}}> {`You acccepted the job offer from ${mensahe.employer_ID.firstName} ${mensahe.employer_ID.lastName}` } <button name={mensahe._id} id='delete' onClick={onClickEventOffers}>Delete</button> </div>}
                      {(mensahe.status==='cancel-to') && <div className='feed-mensahe' key={index} style={{backgroundColor:'#ff00004d'}}> {`You cancelled the job offer from ${mensahe.employer_ID.firstName} ${mensahe.employer_ID.lastName}` } <button name={mensahe._id} id='delete' onClick={onClickEventOffers}>Delete</button> </div>}
                      
                      {(mensahe.status==='apply') && <div className='feed-mensahe' key={index}> {`${mensahe.employer_ID.firstName} ${mensahe.employer_ID.lastName} applied to your post.` }<button id='accept-apply' name={mensahe._id} onClick={onClickEventOffers}>Accept</button><button name={mensahe._id} id='cancel-apply' onClick={onClickEventOffers}>Decline</button></div>}
                      {(mensahe.status==='accept-apply-to') && <div className='feed-mensahe' key={index} style={{backgroundColor:'rgb(3 245 42 / 39%)'}}> {`You acccepted the work application from ${mensahe.employer_ID.firstName} ${mensahe.employer_ID.lastName}` } <button name={mensahe._id} id='delete' onClick={onClickEventOffers}>Delete</button> </div>}
                      {(mensahe.status==='cancel-apply-to') && <div className='feed-mensahe' key={index} style={{backgroundColor:'#ff00004d'}}> {`You cancelled the work application from ${mensahe.employer_ID.firstName} ${mensahe.employer_ID.lastName}` } <button name={mensahe._id} id='delete' onClick={onClickEventOffers}>Delete</button> </div>}
                    </>
                  })
                }
              </div>
            </div>
          </div>

          
          <div className="user-log" onClick={onClickLogout}>
            <BsPerson size={20} color={'#1a76d2'}/>
          </div>
          <div className={(login) ? 'logout' : 'logout-none'}>
          <div style={{fontSize:'medium'}} onClick={onClickHandlerProfile}>Profile</div>
              <div style={{fontSize:'medium'}}>Settings</div>
              <button onClick={onClickHandlerLogout}><BsDoorOpenFill size={15}/> Logout</button>
          </div>
        </div>
          
      </div>

      <div className="feed-main-container">
        <div className="feed-left-navigation">
          <section className="feed-nav-header">
            <img onClick={onClickHandlerProfile}
              className="feed-profile-img"
              src={`http://localhost:8080/users/${user.userImage}`}
              alt="user"
            />
            <p
              style={{
                textAlign: "center",
                paddingTop: "13px",
                fontWeight: "100",
                fontSize: "medium",
                margin: "0",
              }}
            >{`${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}</p>
            <p
              style={{
                textAlign: "center",
                padding: "0",
                fontWeight: "100",
                fontSize: "small",
              }}
            >{`${user.userType.userType}`}</p>
          </section>
          <section className="filter-section">
              <h2 style={{ fontSize: "15pt",marginTop:'33px' }}>Find</h2>
            <div className="feed-filter">
             
                <form className="feed-filter" onSubmit={onSumitHandlerFilter}>
                  { (user.userType._id=='638325389b72d5aa285a7a15') && <label>Work</label>}
                  { (user.userType._id=='638325389b72d5aa285a7a15') && <input name='work' value={work} onChange={onChangeHandler}/> }
                  <label>Location</label>

                  <select value={municipality} name='municipality' onChange={onChangeHandler} >
                    {
                      arrayMunicipality.map((mun,index)=>{
                        return <option key={index} value={mun}>{mun.toUpperCase()}</option>
                      })
                    }
                  </select>
                  
                  <button>Find</button>
                </form>
              
            </div>
          </section>
        </div>
        <div className="cardcontainers">

          {
            users.map((userValue,index)=>{
              return <div className="card"key={index}>
                  <div className="statuscontainer">
                    <p className="name">{`${userValue.firstName} ${userValue.middleName[0].toUpperCase()}. ${userValue.lastName}`}</p>
                  </div>
                  <img src={`http://localhost:8080/users/${userValue.userImage}`} id="smallprofile" alt="profile" />
                  <div className="feedimage-container">
                    <img src={`http://localhost:8080/users/${userValue.userImage}`} alt="profile" id="feedimage" />
                  </div>
                    <p>{userValue.email}</p>
                    <p>{userValue.contactNumber}</p>
                    <p>{userValue.address[0].municipality}</p>
                    {
                      (userValue.skills.length>0) && <h3 style={{fontSize:'larger'}}></h3>
                    }
                  <div style={{height:'250px',overflow:'auto',padding:'7px',borderTop:'1px solid gray'}}>
                    
                    
                    { (user.userType._id=='638325389b72d5aa285a7a15') ?
                    <ul style={{width:'200px'}}>
                      {(userValue.skills.length>0) &&
                        userValue.skills.map((skill,index)=>{
                          //return <li key={`${skill.email}-${index}`} style={{listStyle:'none',fontSize:'small'}}>{skill}</li>
                          return <div style={{fontSize:'10pt'}}>{skill}</div>
                        })
                      }
                    </ul>
                    :
                    <ul style={{width:'200px'}}>
                      <div style={{fontSize:'medium'}}>I am looking for welder please apply</div>
                    </ul>
                    }
                    
                  </div>
                 
                  { (user.userType._id=='638325389b72d5aa285a7a15') ? <button onClick={onClickHandlerSendOffer} id={userValue._id} className='sendofferbutton' name="offer">Send offer</button> : <button onClick={onClickHandlerSendOffer} id={userValue._id} name="apply" className="sendofferbutton">Apply</button>}
                </div>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Feed;
