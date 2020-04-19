import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { firestoreConnect, useFirestoreConnect } from 'react-redux-firebase';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import PageHeader from '../decoration/PageHeader';
import { commentOnPost } from '../../store/actions/productActions';
import { commentsQuery, allUsersQuery } from '../../queries/queries';

const ProjectDetails = (props) => {

    const dispatch = useDispatch();
    const postId = props.match.params.id;

    useFirestoreConnect([commentsQuery(postId), allUsersQuery()]);

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            const comment = e.target.value;
            if (postId) {
                if (!comment) {
                    return toast('comment must not be empty');
                }
                dispatch(commentOnPost(comment.trim(), postId.trim()));

            }
        }
    }
    const users = useSelector(state => state.firestore.ordered.users);
    const comments = useSelector(state => state.firestore.ordered.comments);

    getUserProperty = (handle, propertyName) => {
        const propertyValue = null;
        console.log(users.map(u => u.handle === handle));
    }

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
                        <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                        <div>{moment(project.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
                <div className="row card z-depth-0 ">

                    <div className="card-content">
                        <span className="card-title">Comments</span>
                        <div className="input-field col s12">
                            <label htmlFor="comment">Comment on Post</label>
                            <input id="comment" type="text" className="validate" onKeyDown={handleEnter} />
                        </div>
                        <ul className="collection">
                            {comments && comments.map(c => {
                                return (
                                    <li className="collection-item avatar">
                                        <img src={} alt="" class="circle" />
                                        <span class="title">@{c.userHande}</span>
                                    </li>

                                );
                            })}
                        </ul>
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
