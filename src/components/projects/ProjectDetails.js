import moment from 'moment';
import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { firestoreConnect, useFirestoreConnect } from 'react-redux-firebase';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { allUsersQuery, commentsQuery } from '../../queries/queries';
import { commentOnPost, deleteCommentFromPost } from '../../store/actions/productActions';
import PageHeader from '../decoration/PageHeader';

const ProjectDetails = (props) => {

    const dispatch = useDispatch();
    const postId = props.match.params.id;

    const [comment, setComment] = useState('');

    useFirestoreConnect([commentsQuery(postId), allUsersQuery()]);

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const handleEnter = (e) => {
        //  setComment(e.target.value);
        if (e.key === 'Enter' || e.type === 'click') {
            if (postId) {
                if (!comment) {
                    return toast('comment must not be empty');
                }
                setComment('');
                dispatch(commentOnPost(comment.trim(), postId.trim()));

            }
        }
    }

    const deleteComment = (commentId) => {
        if (commentId) {
            dispatch(deleteCommentFromPost(commentId.trim()));
        }
    }


    const users = useSelector(state => state.firestore.ordered.users);
    const comments = useSelector(state => state.firestore.ordered.comments);
    const currentUserHandle = useSelector(state => state.firebase.profile.handle);

    const { project } = props;
    if (project) {
        return (
            <div className="container section project-details">
                <PageHeader pageName='Post Details' />
                <div className="card z-depth-5">
                    <div className="card-content">
                        <span className="card-title">{project.title}</span>
                        <p>{project.content}</p>
                    </div>
                    <div className="card-action gray lighten-4 gray-text">
                        <i className="material-icons cyan-text">favorite</i> {project.likeCount}
                        <i className="material-icons cyan-text" style={{marginLeft:'14px'}}>comment</i> {project.commentCount}

                        <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                        <div>{moment(project.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
                <div className="row card z-depth-0 ">

                    <div className="card-content">
                        <span className="card-title">Comments</span>
                        <ul className="collection">
                            {comments && comments.map(c => {
                                return (

                                    <li className="collection-item avatar" key={c.id}>
                                        <img src={getUserProperty(c.userHandle, 'photoURL', users)} alt="" className="circle" />
                                        <small className="cyan-text">&#64;{c.userHandle}</small>
                                        <p>
                                            <small className="date-text grey-text">{moment(c.createdAt.toDate()).format('LLL')}</small>
                                        </p>
                                        <p>
                                            {c.body}
                                        </p>
                                        {currentUserHandle === c.userHandle &&
                                            <a href="#/" className="secondary-content" onClick={() => deleteComment(c.id)}><i className="tiny material-icons red-text">delete</i></a>}

                                    </li>
                                );
                            })}
                        </ul>

                        <div className="input-field col s12">
                            <i onClick={handleEnter} className="material-icons prefix">send</i>
                            <input id="comment" type="text" className="validate" onChange={handleChange} onKeyUp={handleEnter} value={comment} />

                            <label htmlFor="comment">Post Comment</label>
                        </div>
                    </div>
                </div>

            </div >)
    } else {
        return (
            <div className="container center">
                <p>Loading Project...</p>
            </div>
        )
    }
}

const getUserProperty = (handle, propertyName, users) => {
    let propertyValue = null;
    if (users) {
        propertyValue = users.filter(u => u.handle === handle).map(u => u.photoURL)[0];
    }
    return propertyValue;
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    return {
        project
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails);
