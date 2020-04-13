const initialState = {
    projects: []
}
const projects = [];
const projectReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'CREATE_PROJECT':
            projects.push({ id: state.projects.length + 1, title: action.project.title, content: action.project.content });
            return { ...state, projects };
        case 'CREATE_PROJECT_ERR':
            console.log('create project error::', action.err);
            return state;

        default:
            return state
    }
}

export default projectReducer;
