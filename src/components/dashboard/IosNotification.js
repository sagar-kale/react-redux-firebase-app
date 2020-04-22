
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Skeleton from 'react-skeleton-loader';
import { markNotificationRead } from '../../store/actions/productActions';
import { getPath, isLike, isSafari, newNotifications } from '../../utils/helpers';

const IosNotification = withRouter((props) => {

    const dispatch = useDispatch();

    const notifications = useSelector(state => state.firestore.ordered.user_notifications);



    const handleClick = (e) => {
        let notificationIds = newNotifications(notifications);
        if (notificationIds?.length > 0)
            dispatch(markNotificationRead(notificationIds));
    }

    if (!isSafari())
        return <Redirect to="/" />
    const n = 10;
    if (!isLoaded(notifications)) {
        return (
            <div className="row">
                <div className="col s12 card z-depth-5 collection">
                    <table className="highlight striped">
                        <tbody>
                            {[...Array(n)].map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <a href="/loading">

                                                <small ><Skeleton borderRadius={2} /></small>
                                                <small className="pink-text"><Skeleton /> </small>
                                                <small><Skeleton /></small>
                                                <small className="grey-text note-date">
                                                    <Skeleton />
                                                </small>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )

    }

    return (
        <div className="row">
            <div className="col s12 card z-depth-5 collection">
                <table className="highlight striped">
                    <tbody>
                        {notifications && notifications.length > 0 ? notifications.map(notification => {
                            return (
                                <tr key={notification.id}>
                                    <td>
                                        <Link to={`${getPath(props.location.pathname)}/${notification.postId}`} onClick={handleClick}>

                                            <small className={`tiny material-icons left-align ${notification.read === false ? 'orange-text' : 'cyan-text'}`}>{isLike(notification.type) ? 'favorite' : 'chat'}</small>
                                            <small className="pink-text"> {notification.sender} </small>
                                            <small>{isLike(notification.type) ? 'liked' : 'commented on'} your post</small>
                                            <small className="grey-text note-date">
                                                ( {moment(notification.createdAt.toDate()).fromNow()})</small>
                                        </Link>
                                    </td>
                                </tr>)
                        }) :
                            <tr>
                                <td>
                                    No new notifications
                        </td>
                            </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
});

export default IosNotification;