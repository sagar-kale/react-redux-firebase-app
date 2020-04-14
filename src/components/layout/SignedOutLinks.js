import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {

    useEffect(() => {
        const M = window.M;
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    }, [])

    return (
        <div>
            <ul className="right hide-on-med-and-down">
                <li><NavLink className="waves-effect" to='/signin'>Login</NavLink></li>
                <li><NavLink className="waves-effect" to='/signup'>Sign Up</NavLink></li>

            </ul>
            <ul id="slide-out" className="sidenav">
                <li><div className="user-view">
                    <div className="background">
                        <img src="img/office.jpg" alt="office" />
                    </div>
                    <img className="circle" src="img/yuna.jpg" alt="yuna" />
                    <span className="white-text name">Welcome Guest</span>
                </div></li>
                <li><NavLink className="waves-effect" to='/'>Home</NavLink></li>
                <li><NavLink className="waves-effect" to='/signin'>Login</NavLink></li>
                <li><NavLink className="waves-effect" to='/signup'>Sign Up</NavLink></li>

                <li><div className="divider"></div></li>
                <li><a href="!#" className="subheader">Extra</a></li>
                <li><a className="waves-effect" href="#!">About Us</a></li>
            </ul>
        </div>
    )
}

export default SignedOutLinks;