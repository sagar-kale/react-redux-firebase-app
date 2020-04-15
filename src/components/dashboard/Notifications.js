import React from 'react';
import moment from 'moment';
import { isEmpty, useFirebaseConnect, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import Loader from '../layout/Loader';
import { useSelector } from 'react-redux';
import { getQueryName } from 'redux-firestore/es/utils/query';

const Notifications = () => {

    const notificationsQuery = () => ({
        collection: 'notifications',
        limit: 5,
        orderBy: ['time', 'desc']
    });
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