import React, { useState } from 'react';
import IdleTimer from 'react-idle-timer';
import firebase from '../../config/firebaseConfig';

export const UserStatus = (props) => {

    const [timeout] = useState(1000 * 5 * 60);

    const [away, setAway] = useState(false);


    let idleTimer = null;


    const userRef = firebase.database().ref(`presence/${props.user.uid}`);
    const lastSeen = firebase.database().ref(`presence/${props.user.uid}/lastOnline`);
    const connected = firebase.database().ref('.info/connected');
    connected.on('value', (snap) => {
        if (snap.val() === true) {
            //   console.log('user is online');
            // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
            userRef.set({ status: '★ online' })
            // When I disconnect, remove this device
            userRef.onDisconnect().set({ status: '☆ offline' });

            // Add this device to my connections list
            // this value could contain info about the device or a timestamp too
            // const con =userRef.push();
            //con.set('device informatkion);
            // When I disconnect, update the last time I was seen online
            lastSeen.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);

        }
    });

    if (away) {
        // console.log('setting away status in fire database');
        userRef.set({ status: '☄ away' });
    }

    const onAction = () => {
        //console.log('user did something');
        setAway(false)
    };

    const onActive = () => {
        setAway(false);
    }

    const onIdle = () => {
        // console.log('setting away in state ');
        setAway(true);
    }


    // const { user } = props;


    return (
        <div>
            <IdleTimer
                ref={ref => { idleTimer = ref }}
                element={document}
                onActive={onActive}
                onIdle={onIdle}
                onAction={onAction}
                debounce={250}
                timeout={timeout}
            />

        </div>
    )
}
