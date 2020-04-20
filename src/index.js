import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { applyMiddleware, compose, createStore } from 'redux';
import { createFirestoreInstance, getFirestore, reduxFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import App from './App';
import firebase from './config/firebaseConfig';
import './index.css';
import * as serviceWorker from './serviceWorker';
import reducers from './store/reducers/reducers';

const initialState = {} // set initial state here

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose  // comment on production bbuild

const store = createStore(reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirestore })),
    reduxFirestore(firebase)
  ));



const rrfConfig = {
  userProfile: 'users',
  presence: 'presence', // where list of online users is stored in database
  //sessions: 'sessions', // where list of user sessions is stored in database (presence must be enabled)
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  /* onAuthStateChanged: (authData, firebase, dispatch) => { //After signout clering store and preserving projects collection data
     if (!authData) {
       dispatch({ type: actionTypes.CLEAR_DATA, preserve: { ordered: ['projects'] } })
     }
   } */ // defined clear_data on signout action authActionos.js rather than here

}
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  initializeAuth: true
}

ReactDOM.render(

  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
