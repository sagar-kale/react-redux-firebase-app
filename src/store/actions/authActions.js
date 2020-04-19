import { actionTypes } from 'redux-firestore/es/constants';
import firebase from '../../config/firebaseConfig';
import { buildError } from '../../constant';
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
        const handle = user.handle?.trim();
        const store = getFirestore();
        store.collection(`users`)
            .get()
            .then(query => {

                if (query.docs.length > 0) {
                    const exists = query.docs.filter(doc => doc.data().handle === handle);
                    if (exists.length !== 0)
                        return dispatch({ type: 'SIGNUP_ERROR', err: buildError(403, 'Username already exists ! Try diffrent') });
                }

                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                    .then((cred) => {

                        const photoURL = 'https://via.placeholder.com/150';
                        const displayName = `${user.firstName} ${user.lastName}`;

                        store.collection('users').doc(cred.user.uid).set({
                            initials: user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase(),
                            email: cred.user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            handle,
                            photoURL,
                            displayName

                        });


                        store.collection('notifications').add({
                            time: new Date(),
                            content: 'Joined a party !!',
                            user: user.firstName + ' ' + user.lastName
                        });
                        firebase.auth().currentUser.updateProfile({
                            displayName,
                            photoURL
                        });

                        return updateUserData(cred.user, store);


                    }).then(() => {
                        dispatch({ type: 'SIGNUP_SUCCESS' });
                    }).catch(err => {
                        dispatch({ type: 'SIGNUP_ERROR', err });
                    });

            }).catch(err => dispatch({ type: 'SIGNUP_ERROR', err }))

    }
}


export const logOut = () => {
    return async (dispatch, getState) => {

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
    emailVerified,
    metadata
}, store) => {
    //console.log(metadata);
    const userRef = store.doc(`users/${uid}`);
    metadata = { ...metadata };

    const data = {
        uid,
        email,
        emailVerified,
        createdAt: metadata.creationTime,
        lastLoginAt: metadata.lastSignInTime
    };
    //  console.log('data from new obj::', data);
    return userRef.set(data, { merge: true });

}