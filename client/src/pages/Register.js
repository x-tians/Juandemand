import "../styles/Register.css";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom"; //add
import Modal from "react-modal";
import { useState, useEffect } from "react"; //add
import { useSelector } from "react-redux"; //add
import handylogo from '../assets/handylogo.png';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    justifyItems: "center",
    backgroundColor: "#1a76d2",
    borderRadius: '8px'
  },
};
const Register = () => {
  const userType = useSelector((state) => state.userType); //add
  const navigate = useNavigate(); //add

  const [modalIsOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState("0000");

  useEffect(() => {
    //add
    if (userType.trim() === "" || userType.trim() === null) {
      //add
      navigate("/"); //add
    }
  }, [userType]); //add

  const userInfo = {
    //add
    address: [{ address: "", municipality: "", province: "" }],
    email: "",
    firstName: "",
    lastName: "",
    middleName: "",
    token: "",
    userImage: "user.jpg",
    password: "",
    conPassword: "",
    otp: "",
    userType: "user",
    sex: "male",
    birthDate: "",
    userType: userType,
    status: "registered",
    contactNumber: "",
    ratings:"0"
  };
  const [user, setUser] = useState(userInfo);

  const openModal = () => {
    setIsOpen(true);
  };
  //close the moadal
  const closeModal = () => {
    setIsOpen(false);
  };

  //update the user information from user states variables
  const onChangeHandler = (event) => {
    //add
    let users = user;

    switch (event.target.name) {
      case "email":
        users.email = event.target.value;
        break;
      case "firstName":
        users.firstName = event.target.value;
        break;
      case "lastName":
        users.lastName = event.target.value;
        break;
      case "middleName":
        users.middleName = event.target.value;
        break;
      case "address":
        users.address[0].address = event.target.value;
        break;
      case "municipality":
        users.address[0].municipality = event.target.value;
        break;
      case "province":
        users.address[0].province = event.target.value;
        break;
      case "contactNumber":
        users.contactNumber = event.target.value;
        break;
      case "conPassword":
        users.conPassword = event.target.value;
        break;
      case "password":
        users.password = event.target.value;
        break;
      case "otp":
        users.otp = event.target.value;
        break;
      case "sex":
        users.sex = event.target.value;
        break;
      case "birthdate":
        users.birthDate = event.target.value;
        break;

      default:
        break;
    }
    setUser({ ...users });
  };
  //if the email is exist on the operator entities send the code to email address
  const onSubmitHandlerRegistration = async (event) => {
    event.preventDefault();

    if (user.password.trim() === user.conPassword.trim()) {
      await axios
        .get(`http://localhost:8080/api/v1/mailer/${user.email}`, {})
        .then(function (response) {
          if (response.data) {
            alert(response.data.msg);
            if (response.data.status) {
              setOtp(response.data.otp);
              openModal(true);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("The password must be the same as the confirm password.");
    }
  };
  //save user information when the registration code is match
  const onSubmitHandlerOtp = async (event) => {
    event.preventDefault();
    //console.log(user);

    if (otp === Number(user.otp)) {
      let newUser = user;
      newUser.token = new Date();
      setUser({ ...newUser });
      await axios
        .post("http://localhost:8080/api/v1/users", {
          user,
        })
        .then(function (response) {
          if (response.data) {
            alert(response.data.msg);
            closeModal();
            window.location.href = "http://localhost:3000/log-in";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Confirmation Code Error!");
    }
  };
  //return you in loginpage
  const onClickHandlerBack = () => {
    window.location.href = "http://localhost:3000";
  };

  return (
    <div className="grid w-100 vh-100 whole-register">
      <div className='grid login-page-wrapper registration-page-wrapper'>
        <div className="registration-main center-justify">
          <div className="registration-information">
            <div className='logodisclaimer'>
                    <img src={handylogo} alt='logo' className='regformlogo'/>
                    <div className='disclaimer'>
                      <p><i>***Make sure to enter your informations correctly. <br />Any discrepancy might lead to employers not sending you an  offer.</i></p>
                    </div>
                  </div>
              <br />
              <center ><h4>Personal Information</h4></center>
            <br />
            <form
              className="w-100 registration-form"
              onSubmit={onSubmitHandlerRegistration}
            >
              <div className="profile-information">
              <div className='sectionone  flex center-justify gap'> 
                <label htmlFor="email">Email</label>
                <input
                  width="1%"
                  value={user.email}
                  type={"email"}
                  name={"email"}
                  placeholder="Email"
                  required
                  onChange={onChangeHandler}
                />
                <label htmlFor="password">Contact Number</label>
                <input
                  value={user.contactNumber}
                  type={"contactNumber"}
                  placeholder="Contact Number"
                  name={"contactNumber"}
                  required
                  onChange={onChangeHandler}
                />
              </div>
              <div className='sectiontwo  flex center-justify gap'>
                <label htmlFor="password">Password</label>
                <input
                  value={user.password}
                  type={"password"}
                  placeholder="Password"
                  name={"password"}
                  required
                  onChange={onChangeHandler}
                />
                <label htmlFor="birthdate">Birthday</label>
                <input
                  value={user.birthdate}
                  type={"date"}
                  placeholder="Birthdate"
                  name={"birthdate"}
                  required
                  onChange={onChangeHandler}
                />
              </div>
              <div className='sectionthree  flex center-justify gap'>
                <label htmlFor="conPassword">Confirm Password</label>
                <input
                  value={user.conPassword}
                  type={"password"}
                  name={"conPassword"}
                  required
                  onChange={onChangeHandler}
                />
                <label htmlFor="sex">Sex</label>
                  <select className='sexbox'
                    value={user.sex}
                    type={"text"}
                    placeholder="Sex"
                    name={"sex"}
                    required
                    onChange={onChangeHandler}
                  >
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
              </div> 

              <div className='sectionfour  flex center-justify gap'>
                <label htmlFor="firstName">Firstname</label>
                <input
                  value={user.firstName}
                  type={"text"}
                  name={"firstName"}
                  placeholder="Firstname"
                  required
                  onChange={onChangeHandler}
                />
                <br />
                <input
                  value={user.middleName}
                  type={"text"}
                  placeholder="Middle Name"
                  name={"middleName"}
                  required
                  onChange={onChangeHandler}
                />
                <br />
                <input
                  value={user.lastName}
                  type={"text"}
                  placeholder="Lastname"
                  name={"lastName"}
                  required
                  onChange={onChangeHandler}
                />
              </div>


              <div className='sectionfive  flex center-justify gap'>
                <label htmlFor="address">Address</label>
                <input
                  value={user.address[0].address}
                  type={"text"}
                  placeholder="Address"
                  name={"address"}
                  required
                  onChange={onChangeHandler}
                />
                <br />
                <input
                  value={user.address[0].municipality}
                  type={"text"}
                  placeholder="Municipality"
                  name={"municipality"}
                  onChange={onChangeHandler}
                  required
                />
                <br />
                <input
                  value={user.address[0].province}
                  type={"text"}
                  placeholder="Province"
                  name={"province"}
                  onChange={onChangeHandler}
                  required
                />
              </div>
                

                <div className="flex agreement-wrapper">
                  {/* <label ><input 
                            type={'checkbox'} 
                            name="chk-agreement"
                            value='accepted' 
                            required /> I accept the agreement</label> */}
                  <p className="agreement-wrapper">
                    By creating an account you agree to our
                    <br />
                    <a href="/privacy-policy">Terms and & Privacy Policy.</a>
                  </p>
                </div>
                <br />
                <div className='submitbtn-container'>
                  <button className='submitbtn' type="submit">Submit</button>
                </div>
              </div>
            </form>
            <div className='driver-component-back flex w-100 registration-back' >
              <div className='flex driver-component-left register-back-container' onClick={onClickHandlerBack}>
                <BsArrowLeft size={30}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal-title flex w-100 registration-modal">
          <strong>
            Check your email for the <br /> registration confirmation code.
          </strong>
        </div>
        <form
          className="flex flex-column modal-forms w-100"
          onSubmit={onSubmitHandlerOtp}
        >
          <label htmlFor="otp">Enter Confirmation Code</label>
          <input
            className='otp-input'
            type={"text"}
            name={"otp"}
            required
            value={user.otp}
            onChange={onChangeHandler}
          />
          <br />
          <div className="flex w-100 center-justify">
            <button className='otp-button' type="submit" name="save">
              Confirm
            </button>
          </div>
        </form>
        <button className='otp-button' onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
};

export default Register;