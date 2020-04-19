import { buildError } from "../../constant";

export const createProject = (project) => {

    return (dispatch, getState, { getFirestore }) => {

        dispatch({ type: 'CREATE_PROJECT_REQ' })

        const user = getState().firebase.profile;
        const firestore = getFirestore();
        firestore.collection('projects').add({
            ...project,
            authorFirstName: user.firstName,
            authorLastName: user.lastName,
            authorId: user.uid,
            userHandle: user.handle,
            likeCount: 0,
            commentCount: 0,
            createdAt: new Date()
        }).then((doc) => {
            return firestore.collection('notifications').add({
                time: new Date(),
                content: 'Added a new project',
                user: user.firstName + ' ' + user.lastName
            });
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', project });
        }).catch(err => {
            dispatch({ type: 'POST_ERROR', err });
        });

    }
}

const likePost = (likeCount, postId) => {

    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        // const
//        console.log('under action', likeCount, user.handle, postId);

        const likeDocument = firestore
            .collection('likes')
            .where('userHandle', '==', user.handle)
            .where('postId', '==', postId)
            .limit(1);

        const postDocument = firestore.doc(`/projects/${postId}`);

        let postData;

        postDocument
            .get()
            .then((doc) => {
                if (doc.exists) {
                    postData = doc.data();
                    postData.postId = doc.id;
                    return likeDocument.get();
                }
                return dispatch({ type: 'POST_ERROR', err: buildError(404, 'Post not found') })
            }).then((data) => {
                if (data.empty) {
                    return firestore
                        .collection('likes')
                        .add({
                            postId: postId,
                            userHandle: user.handle
                        })
                        .then(() => {
                            postData.likeCount++;
                            return postDocument.update({ likeCount: postData.likeCount });
                        })
                        .then(() => {
                            dispatch({ type: 'LIKE_POST_SUCCESS' });
                        });
                } else {
                    return dispatch({ type: 'POST_ERROR', err: buildError(400, 'Post already liked') });
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch({ type: 'POST_ERROR', err });
            });

    }
}


const commentOnPost = (comment, postId) => {

    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        // const
       // console.log('under action comment', comment, user.handle, postId);

        const newComment = {
            body: comment.trim(),
            createdAt: new Date(),
            postId: postId.trim(),
            userHandle: user.handle,
            userImage: user.photoURL
        };
       // console.log(newComment);

        firestore.doc(`/projects/${postId.trim()}`)
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    return dispatch({ type: 'POST_ERROR', err: buildError(404, 'Post not found') })
                }
                return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
            })
            .then(() => {
                return firestore.collection('comments').add(newComment);
            })
            .then(() => {
                dispatch({ type: 'COMMENT_POST_SUCCESS' });
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: 'POST_ERROR', err });
            });

    }
}

export { likePost, commentOnPost }