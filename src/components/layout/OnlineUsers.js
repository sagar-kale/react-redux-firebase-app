import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import firebase from '../../config/firebaseConfig';
import './onlineuser.scss';

const OnlineUsers = () => {

    const allUsersQuery = () => ({
        collection: 'users'
    });
    useFirestoreConnect(allUsersQuery);

    const user = useSelector(state => state.firebase.profile);
    const [changed, setChanged] = useState(false);

    const dispatch = useDispatch();
    const onlineUsers = useSelector(state => state.presence.onlineUsers);
    const allUsers = useSelector(state => state.firestore.ordered.users);

    const getUser = (uid) => {
        const u = allUsers.filter(u => u.uid === uid);
        return `${u[0].firstName}  ${u[0].lastName}`;
    }

    useEffect(() => {
        if (isLoaded(user)) {
            const userRef = firebase.database().ref(`presence`);
            let usrs = [];
            userRef.on('value', (snap) => {
                //    var totalRecord = snap.numChildren();

                //    console.log("Total Record : " + totalRecord);

                snap.forEach(function (user) {
                    const uid = user.key;
                    const status = user.val().status;
                    // ...
                    if (usrs.length === 0) usrs.push({ uid, status });
                    const usr = usrs.find(user => user.uid === uid);

                    if (usrs.indexOf(usr) === -1) {
                        usrs.push({ uid, status });
                        if (changed === true)
                            setChanged(false);
                        setChanged(true);
                    }
                    else {
                        usr.status = status;
                        const indexOfUsr = usrs.indexOf(usr)
                        if (indexOfUsr !== -1) {
                            usrs[indexOfUsr] = usr;
                            if (changed === true)
                                setChanged(false);
                            setChanged(true);
                        }

                    }

                    //({ uid, status });
                });
                dispatch({ type: 'USERS_FETCH_SUCCESS', onlineUsers: usrs });
            });
        }

    }, [user, dispatch, changed])

    const getClassByStatus = (status) => {
        if (status === "★ online") {
            return "green-text";
        } else if (status === "☄ away") {
            return "orange-text";
        } else {
            return "gray-text";
        }
    }

    //setUsers(usrs);

    //  console.log('user status', onlineUsers);

    return (
        <div className="container dashboard">
            <div className="row">
                <div className="col s12 m4">

                    <div className="section">
                        <div className="card z-depth-0">
                            <div className="card-content">
                                <span className="card-title">List of users</span>
                                <ul className="notifications">
                                    {onlineUsers && onlineUsers.map(ou => {
                                        return (
                                            <li key={ou.uid}>
                                                <div className="row">
                                                    <div className="col s3">
                                                        <img className="circle" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg" alt="avatar" />

                                                    </div>
                                                    <div className="col s9">
                                                        <span className="pink-text">{getUser(ou.uid)}</span>
                                                    </div>
                                                    <span className={`note-date ${getClassByStatus(ou.status)}`}>
                                                        {ou.status}</span>
                                                </div>


                                            </li>
                                        );
                                    })}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col s12 m7 offset-m1">

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
