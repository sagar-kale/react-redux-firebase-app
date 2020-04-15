import firebase from '../../config/firebaseConfig';
import { actionTypes } from 'redux-firestore/es/constants';

export const signInAction = (credential) => {
    return (dispatch) => {
        dispatch({ type: 'LOGIN_REQUEST' });
        firebase
            .auth()
            .signInWithEmailAndPassword(credential.email, credential.password)
            .then(cred => {
                dispatch({ type: 'LOGIN_SUCESS', user: cred });
            })
            .catch(err => {
                dispatch({ type: 'LOGIN_ERROR', err });
            });
    }
}

export const register = (user) => {
    return (dispatch, getState, { getFirestore }) => {

        dispatch({ type: 'SIGNUP_REQUEST' });

        const store = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((cred) => {
                store.doc(`users/${cred.user.uid}`).set({
                    initials: user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase(),
                    firstName: user.firstName,
                    lastName: user.lastName,

                }, { merge: true });
                updateUserData(cred.user, store)
                store.collection('notifications').add({
                    time: new Date(),
                    content: 'Joined a party !!',
                    user: user.firstName + ' ' + user.lastName
                })
                firebase.auth().currentUser.updateProfile({
                    displayName: `${user.firstName} ${user.lastName}`
                });


            }).then(() => {
                dispatch({ type: 'SIGNUP_SUCCESS' });
            }).catch(err => {
                dispatch({ type: 'SIGNUP_ERROR', err });
            });
    }
}


export const logOut = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch({ type: actionTypes.CLEAR_DATA, preserve: { ordered: ['projects'] } })
    }
}

export const fetchCurrentUser = () => {
    return (dispatch) => {
        const currentUser = firebase.auth().currentUser;
        dispatch({ type: 'CURRENT_USER', user: currentUser });
    }
}

const updateUserData = ({
    uid,
    email,
    photoURL,
    emailVerified
}, store) => {

    const userRef = store.doc(`users/${uid}`);

    const data = {
        uid,
        email,
        photoURL,
        emailVerified
    };
    //  console.log('data from new obj::', data);
    userRef.set(data, { merge: true });

}