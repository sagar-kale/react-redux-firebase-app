import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { getQueryName } from 'redux-firestore/es/utils/query';
import Loader from '../layout/Loader';
import { notificationsQuery } from '../../queries/queries';

const Notifications = () => {

    useFirestoreConnect(notificationsQuery);

    const error = useSelector(state => state.firestore.errors.byQuery[getQueryName(notificationsQuery())]);
    const notifications = useSelector(state => state.firestore.ordered.notifications);

    if (!isLoaded(notifications) && !error) return <Loader />

    return (
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Notifications</span>
                    <ul className="notifications">
                        {!notifications && error && <li> <blockquote> <span className="red-text">{error.code}</span>
                            <div className="grey-text note-date">You need to login in order to see the notifications</div>
                        </blockquote></li>}
                        {notifications && notifications.map(notification => {
                            return (
                                <li key={notification.id}>
                                    <span className="pink-text">{notification.user} </span>
                                    <span>{notification.content}</span>
                                    <div className="grey-text note-date">
                                        {moment(notification.time.toDate()).fromNow()}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notifications;