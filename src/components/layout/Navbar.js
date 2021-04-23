import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';


const Navbar = () => {

    const isLoading = useSelector(state => state.auth.isLoading);
    const user = useSelector(state => state.firebase.profile);

    return (
        <div>
            <nav className="nav-wrapper grey darken-3" >

                <div className="container" >

                    <a href="/#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <Link to='/' className="brand-logo" > ChittyChat </Link>
                    {user.isEmpty ? <SignedOutLinks /> : <SignedInLinks user={user} />}
                </div>
            </nav>
            {isLoading ? < Loader /> : ''}
        </div>
    )
}

// const mapStateToProps = (state) => {
//     // console.log('nav', state);
//     return {
//         user: state.firebase.profile,
//         isLoading: state.auth.isLoading
//     };
// }  // using hook

export default Navbar;