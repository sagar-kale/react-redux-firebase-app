import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { likePost, unlikePost } from '../../store/actions/productActions';

const ProjectSummary = withRouter((props) => {

    const { project } = props;

    const dispatch = useDispatch();
    const user = useSelector(state => state.firebase.profile);
    const error = useSelector(state => state.project?.postError);
    useEffect(() => {
        if (error) {
            toast(error.message);
            dispatch({ type: 'CLEAR_ERROR' });
        }
    }, [error, dispatch]);


    const handleClick = () => {
        if (user.isEmpty) {
            return props.history.push('/signin');
        }

        if (isLiked(likes, user, project.id))
            dispatch(unlikePost(project.id.trim()));
        else dispatch(likePost(project.likeCount + 1, project.id));
    }
    useFirestoreConnect(fetchLikes(user.handle || ''));

    const likes = useSelector(state => state.firestore.ordered.likes);

    //console.log('my given likes ', likes);




    return (

        <div className="card z-depth-0 project-summary">
            <div className="card-panel hoverable">
                <div className="card-content gray-text text-darken-3">

                    <span className="card-title">
                        <Link to={`/post/${project.id}`}> {project.title}</Link>
                    </span>
                    <p>{project.authorFirstName + ' ' + project.authorLastName}</p>
                    <p className="gray-text">{moment(project.createdAt.toDate()).calendar()}</p>
                </div>
                <div className="card-action">
                    <a href='#!' onClick={handleClick}><i className="material-icons">{isLiked(likes, user, project.id) ? 'favorite' : 'favorite_border'}</i> {project.likeCount}</a>
                    <Link to='/'><i className="material-icons">comment</i> {project.commentCount}</Link>
                </div>
            </div>
        </div >
    )
});

const isLiked = (likes, user, id) => {
    if (likes && user && id) {
        return !!likes.filter(like => like.userHandle === user.handle && id === like.postId).length;
    }
    return false;
}


const fetchLikes = (handle) => {
    const likeQuery = () => ({
        collection: 'likes',
        where: ['userHandle', '==', handle]
    });
    return likeQuery;
}


export default ProjectSummary;