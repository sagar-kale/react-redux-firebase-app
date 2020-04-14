const initialState = {
    projects: [],
    isLoading: false
}
const projectReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'CREATE_PROJECT_REQ':
            return { ...state, isLoading: true };

        case 'CREATE_PROJECT':
            //   projects.push({ id: state.projects.length + 1, title: action.project.title, content: action.project.content });
            return { ...state, isLoading: false }

        case 'CREATE_PROJECT_ERR':
            console.log('create project error::', action.err);
            return { ...state, isLoading: false };

        default:
            return state
    }
}

export default projectReducer;
