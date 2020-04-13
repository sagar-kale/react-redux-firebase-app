
const initialState = {
    authError: null,
    user: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN_SUCESS':
            console.log('succ', action.user)
            return { ...state, ...action.user, authError: null };
        case 'LOGIN_ERROR':
            console.log('login err', action.err);
            return { ...state, authError: action.err };
        case 'SINGOUT_SUCESS':
            console.log('success');
            return { ...state, authError: null, user: null };
        case 'CURRENT_USER':
            return { ...state, user: action.user };
        case 'SIGNUP_SUCCESS':
            //   console.log('signup_sucess');
            return { ...state, authError: null };
        case 'SIGNUP_ERROR':
            console.log('err', action.err);
            return { ...state, authError: action.err };

        default:
            return state
    }
}

export default authReducer;
