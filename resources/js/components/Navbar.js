import React from 'react';
import {NavLink} from 'react-router-dom';
import {publicUrl} from './Service';

const Navbar = (props) => {
    const remlogin = () =>{
        localStorage.removeItem("logindata");
        window.location.href =  publicUrl+'/signin';
        //alert('ok');
    }
    return(
        <>
        <div className="container-fluid nav_bg bg-dark">
            <div className="row">
                <div className="col-10 mx-auto">
                    <nav className="navbar navbar-expand-lg navbar-light ">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand" to={`${publicUrl}`}>RAST api</NavLink>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink exact className="nav-link" activeClassName="menu_active" aria-current="page" to={`${publicUrl}`}>Home</NavLink>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink exact className="nav-link" activeClassName="menu_active" aria-current="page" to="/service">Service</NavLink>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink exact className="nav-link" activeClassName="menu_active" aria-current="page" to={`${publicUrl}/about`}>About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact className="nav-link" activeClassName="menu_active" aria-current="page" to={`${publicUrl}/project`}>Project</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact className="nav-link" activeClassName="menu_active" aria-current="page" to={`${publicUrl}/contact`}>Contact</NavLink>
                                </li>
                                
                            </ul>
                            {
                                props.auth === true && (
                                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <NavLink exact className="nav-link" aria-current="page" to={`${publicUrl}/signin`}>Welcome, {props.user.user.name}</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink exact className="nav-link" aria-current="page" onClick={remlogin} to={`${publicUrl}/signup`}>Logout</NavLink>
                                        </li>
                                    </ul>
                                )
                            }
                            {
                                props.auth === false && (
                                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <NavLink exact className="nav-link" activeClassName="menu_active" aria-current="page" to={`${publicUrl}/signin`}>Sign In</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink exact className="nav-link" activeClassName="menu_active" aria-current="page" to={`${publicUrl}/signup`}>Sign Up</NavLink>
                                        </li>
                                    </ul>
                                )
                            }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
       </>
    );
}
export default Navbar;