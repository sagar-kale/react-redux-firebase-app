import moment from 'moment';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { markNotificationRead } from '../../store/actions/productActions';
import { getPath, isLike, newNotifications } from '../../utils/helpers';

const UserNotification = withRouter((props) => {

    const { notifications } = props;
    const dispatch = useDispatch();

    const handleClick = (e) => {
        let notificationIds = newNotifications(notifications);
        if (notificationIds?.length > 0)
            dispatch(markNotificationRead(notificationIds));
    }

    return (
        <Fragment>
            {notifications && notifications.length > 0 ? notifications.map(notification => {
                return (
                    <li key={notification.id}>

                        <Link to={`${getPath(props.location.pathname)}/${notification.postId}`} onClick={handleClick}>

                            <small className={`tiny material-icons left-align ${notification.read === false ? 'orange-text' : 'cyan-text'}`}>{isLike(notification.type) ? 'favorite' : 'chat'}</small>
                            <small className="pink-text"> {notification.sender} </small>
                            <small>{isLike(notification.type) ? 'liked' : 'commented on'} your post</small>
                            <small className="grey-text note-date">
                                ( {moment(notification.createdAt.toDate()).fromNow()})</small>
                        </Link>
                    </li>

                )
            }) :
                <li>
                    <Fragment >
                        <Fragment><span className="card-content pink-text mt4">No new notifications</span></Fragment>
                    </Fragment>
                </li>
            }
        </Fragment >
    )
});

export default UserNotification;