import { buildError, Errors } from "../../constant";

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

// unlike post

const unlikePost = (postId) => {

    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;

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
                    postData.screamId = doc.id;
                    return likeDocument.get();
                } else {
                    return postNotFoundDispatch(dispatch);
                }
            })
            .then((data) => {
                if (data.empty) {
                    return dispatch({ type: 'POST_ERROR', err: buildError(400, 'Post not liked') });
                } else {
                    return firestore
                        .doc(`/likes/${data.docs[0].id}`)
                        .delete()
                        .then(() => {
                            postData.likeCount--;
                            return postDocument.update({ likeCount: postData.likeCount });
                        })
                        .then(() => {
                            dispatch({ type: 'UNLIKE_POST_SUCCESS' });
                        });
                }
            })
            .catch((err) => {
                console.error(err);
                return generalErrorDispatch(dispatch, err);
            });
    }
};

// comment on post

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

// delete posted comment

const deleteCommentFromPost = (commentId) => {

    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;

        //console.log('inside delete comment action', commentId);
        const document = firestore.doc(`/comments/${commentId}`);
        document
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    return dispatch({ type: 'POST_ERROR', err: buildError(404, 'Comment not found') })
                }
                if (doc.data().userHandle !== user.handle) {
                    return dispatch({ type: 'POST_ERROR', err: Errors.UNAUTHORISED })
                } else {
                    return document.delete();
                }
            })
            .then(() => {
                dispatch({ type: 'COMMENT_DELETE' });
            })
            .catch((err) => {
                dispatch({ type: 'POST_ERROR', err });
            });
    }
}

// delete post

const deletePost = (postId) => {

    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;

        //console.log('inside delete comment action', commentId);
        const document = firestore.doc(`/projects/${postId}`);
        document
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    return dispatch({ type: 'POST_ERROR', err: buildError(404, 'Post not found') })
                }
                if (doc.data().userHandle !== user.handle) {
                    return dispatch({ type: 'POST_ERROR', err: Errors.UNAUTHORISED })
                } else {
                    return document.delete();
                }
            })
            .then(() => {
                dispatch({ type: 'POST_DELETE' });
            })
            .catch((err) => {
                dispatch({ type: 'POST_ERROR', err });
            });
    }
}

const postNotFoundDispatch = (dispatch) => {
    return dispatch({ type: 'POST_ERROR', err: buildError(404, 'Post not found') });
}

const generalErrorDispatch = (dispatch, err) => {
    return dispatch({ type: 'POST_ERROR', err });
}



export { likePost, commentOnPost, deleteCommentFromPost, unlikePost, deletePost };