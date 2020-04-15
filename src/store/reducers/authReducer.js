
const initialState = {
    authError: null,
    user: null,
    isLoading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN_REQUEST':
            return { ...state, isLoading: true };

        case 'SIGNUP_REQUEST':
            return { ...state, isLoading: true };

        case 'LOGIN_SUCESS':
            //      console.log('succ', action.user)
            return { ...state, ...action.user, authError: null, isLoading: false };
        case 'LOGIN_ERROR':
            console.log('login err', action.err);
            return { ...state, authError: action.err, isLoading: false };
        case 'SINGOUT_SUCESS':
            //    console.log('success');
            return { ...initialState, authError: null, user: null, isLoading: false };
        case 'CURRENT_USER':
            return { ...state, user: action.user };
        case 'SIGNUP_SUCCESS':
            //   console.log('signup_sucess');
            return { ...state, authError: null, isLoading: false };
        case 'SIGNUP_ERROR':
            console.log('err', action.err);
            return { ...state, authError: action.err, isLoading: false };

        default:
            return state
    }
}

export default authReducer;
