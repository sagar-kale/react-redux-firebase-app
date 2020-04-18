import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import firebase from '../../config/firebaseConfig';

const OnlineUsers = () => {

    const allUsersQuery = () => ({
        collection: 'users',
        orderBy: ['createdAt', 'desc']
    });
    useFirestoreConnect(allUsersQuery);

    const user = useSelector(state => state.firebase.profile);
    const allUsers = useSelector(state => state.firestore.ordered.users);

    const dispatch = useDispatch();
    const onlineUsers = useSelector(state => state.presence.onlineUsers);
  
   // const allUserAccessErrors = useSelector(state => state.firestore.errors.byQuery[allUsersQuery()]);


    useEffect(() => {
        if (isLoaded(user)) {
            const userRef = firebase.database().ref(`presence`);
            userRef.on('value', (snap) => {
                const usersObject = snap.val()
                if (usersObject) {
                    const userList = Object.keys(usersObject).map(key => ({
                        ...usersObject[key],
                        uid: key
                    }));
                    dispatch({ type: 'USERS_FETCH_SUCCESS', onlineUsers: userList });
                }

            });
        }

    }, [user, dispatch])

    const getClassByStatus = (status) => {
        if (status === "★ online") {
            return "green-text";
        } else if (status === "☄ away") {
            return "orange-text";
        } else {
            return "gray-text";
        }
    }

    const getPropertyValue = (uid, propertyName) => {
        if (!allUsers)
            return;
        const u = allUsers.filter(u => u.uid === uid);
        if (u.length !== 1)
            return;
        switch (propertyName) {
            case 'FULLNAME':
                return `${u[0].firstName}  ${u[0].lastName}`;
            default:
                return;
        }
    }
    //setUsers(usrs);

    //console.log('user status', onlineUsers);

    return (
        <div className="container dashboard">
            <div className="row">
                <div className="col s12 l4">

                    <div className="section">
                        <div className="card z-depth-0">
                            <div className="card-content">
                                <span className="card-title">List of users</span>
                                <ul>
                                    {onlineUsers && onlineUsers.map(ou => {
                                        return (
                                            <li key={ou.uid}>
                                                <div className="row">
                                                    <div className="col s3">
                                                        <img className="circle" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg" alt="avatar" />

                                                    </div>
                                                    <div className="col s9">
                                                        <span className="pink-text">{ou && getPropertyValue(ou.uid, 'FULLNAME')}</span>
                                                    </div>
                                                    <span className={`note-date ${ou && getClassByStatus(ou.status)}`}>
                                                        {ou.status}</span>
                                                    <div>
                                                        <small className="note-date gray-text">
                                                            {ou.lastOnline && moment(new Date(ou.lastOnline)).fromNow()}</small></div>
                                                </div>


                                            </li>
                                        );
                                    })}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col s12 m12 l7 offset-l1">

                    <div className="section">
                        <div className="card z-depth-0">
                            <div className="card-content">
                                <span className="card-title">Users Info</span>
                                <ul>
                                    <a href="/#" className="btn-floating pulse"><i className="person">{onlineUsers && onlineUsers.filter(user => user.status === "★ online").length}</i></a>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default OnlineUsers;
