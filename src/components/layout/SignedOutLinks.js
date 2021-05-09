import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import officeImg from '../../img/office.jpg';
import picLogo from '../../img/yuna.jpg';

const SignedOutLinks = () => {

    useEffect(() => {
        const M = window.M;
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    }, [])

    return (
        <div>
            <ul className="right hide-on-med-and-down">
                <li activeclassname="active"><NavLink className="waves-effect" to='/signin'>Login</NavLink></li>
                <li activeclassname="active"><NavLink className="waves-effect" to='/signup'>Sign Up</NavLink></li>

            </ul>
            <ul id="slide-out" className="sidenav">
                <li><div className="user-view">
                    <div className="background">
                        <img src={officeImg} alt="office" />
                    </div>
                    <img className="circle" src={picLogo} alt="yuna" />
                    <span className="white-text name">Welcome Guest</span>
                </div></li>
                <li><NavLink className="waves-effect sidenav-close" to='/'>Home</NavLink></li>
                <li><NavLink className="waves-effect sidenav-close" to='/signin'>Login</NavLink></li>
                <li><NavLink className="waves-effect sidenav-close" to='/signup'>Sign Up</NavLink></li>

                <li><div className="divider"></div></li>
                <li><a href="!#" className="subheader">Extra</a></li>
                <li><a className="waves-effect" href="#!">About Us</a></li>
            </ul>
        </div>
    )
}

export default SignedOutLinks;