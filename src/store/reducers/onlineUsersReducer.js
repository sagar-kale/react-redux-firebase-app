const initialState = {
    onlineUsers: [],
    isLoading: false
}
const onlineUsersReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'USERS_FETCH_SUCCESS':
            //   projects.push({ id: state.projects.length + 1, title: action.project.title, content: action.project.content });
            return { ...state, isLoading: false, onlineUsers: action.onlineUsers }

        case 'USERS_FETCH_ERR':
            console.error('create project error::', action.err);
            return { ...state, isLoading: false };

        default:
            return state
    }
}

export default onlineUsersReducer;
