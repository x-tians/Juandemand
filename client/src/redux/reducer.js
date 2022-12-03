const initialState = {
    allUsers: [],
    userType:'638325309b72d5aa285a7a13'//add
};

const reducer = (state = initialState, action) => {
    switch( action.type ){
        case 'LOGIN':
            let newUsers = {
                email: action.payload.email,
                password: action.payload.password,
                firstName: action.payload.firstName,
                middleName: action.payload.middleName,
                lastName: action.payload.lastName,
                sex: action.payload.sex,
                birthDay: action.payload.birthDay,
                address: action.payload.address,
                contactNumber: action.payload.contactNumber,
                token: action.payload.token,
                image: action.payload.image,
                skills: action.payload.skills,
                OTP: action.payload.OTP,
                userType: action.payload.userType
            };
            return {...state, allUsers : [...state.allUsers, newUsers]}

            case 'REGISTER_USERTYPE'://add
                const newUserType=state;
                newUserType.userType=action.payload.userType;
                return {...newUserType};


        default:
            return state;
    }
};

export default reducer;
