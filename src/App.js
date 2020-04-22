import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import Loader from './components/layout/Loader';
import OnlineUsers from './components/layout/OnlineUsers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import IosNotification from './components/dashboard/IosNotification';

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <Loader />;
  return children
}


function PrivateRoute({ children, ...rest }) {
  const auth = useSelector(state => state.firebase.auth)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (children) :
          (
            <Redirect to={{
              pathname: "/signin",
              state: { from: location }
            }}
            />
          )
      }
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthIsLoaded>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />

            <PrivateRoute>
              <Route path='/post/:id' component={ProjectDetails} />
              <Route path='/create' component={CreateProject} />
              <Route path='/chat' component={OnlineUsers} />
              <Route path='/inote' component={IosNotification} />
            </PrivateRoute>
          </Switch>
        </div>
      </AuthIsLoaded>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
