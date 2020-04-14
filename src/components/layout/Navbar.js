import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';


const Navbar = (props) => {

    const { user } = props;

    return (
        <div>
            <nav className="nav-wrapper grey darken-3" >
                <div className="container" >
                    <a href="/#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <Link to='/' className="brand-logo" > Firebase App </Link>
                    {user.isEmpty ? <SignedOutLinks /> : <SignedInLinks user={user} />}
                </div>
            </nav>

        </div>
    )
}

const mapStateToProps = (state) => {
    //   console.log('nav', state);
    return { user: state.firebase.profile };
}

export default connect(mapStateToProps)(Navbar);