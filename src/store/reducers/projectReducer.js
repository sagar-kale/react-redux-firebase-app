
const initialState = {
    projects: [],
    postError: null,
    isLoading: false
}
const projectReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'CREATE_PROJECT_REQ':
            return { ...state, isLoading: true, postError: null };

        case 'CREATE_PROJECT':
            //   projects.push({ id: state.projects.length + 1, title: action.project.title, content: action.project.content });
            return { ...state, isLoading: false };

        case 'LIKE_POST_SUCCESS':
            return { ...state, isLoading: false };

        case 'UNLIKE_POST_SUCCESS':
            return { ...state, isLoading: false };

        case 'COMMENT_POST_SUCCESS':
            return { ...state, isLoading: false };

        case 'COMMENT_DELETE':
            return { ...state, isLoading: false };

        case 'POST_DELETE':
            return { ...state, isLoading: false };

        case 'LIKE_DELETE':
            return { ...state, isLoading: false };

        case 'NO_NOTIFICATION':
            return { ...state, isLoading: false };

        case 'NOTIFICATION_MARK_SUCCESS':
            return { ...state, isLoading: false };

        case 'POST_ERROR':
            console.error('post collection  error::', action.err);
            return { ...state, isLoading: false, postError: action.err };

        case 'CLEAR_ERROR':
            return { ...state, isLoading: false, postError: null };

        default:
            return state
    }
}

export default projectReducer;
