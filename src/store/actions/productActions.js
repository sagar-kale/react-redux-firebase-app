export const createProject = (project) => {
    return (dispatch, getState, { getFirestore }) => {
        const user = getState().firebase.profile;
        const firestore = getFirestore();
        firestore.collection('projects').add({
            ...project,
            authorFirstName: user.firstName,
            authorLastName: user.lastName,
            authorId: user.uid,
            createdAt: new Date()
        }).then(() => {
            firestore.collection('notifications').add({
                time: new Date(),
                content: 'Added a new project',
                user: user.firstName + ' ' + user.lastName
            })
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', project });
        }).catch(err => {
            dispatch({ type: 'CREATE_PROJECT_ERR', err });
        });

    }
}
