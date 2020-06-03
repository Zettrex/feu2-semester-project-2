import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import LoginUserForm from "./components/LoginUserForm";
import RegisterUserForm from "./components/RegisterUserForm";
import PropTypes from "prop-types";

export default function Navigation({userLoggedIn, updateUser}) {
    const [showMenu, setShowMenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    function handleShowLogin() {
        if (showLogin || showRegister) {
            setShowLogin(false);
            setShowRegister(false);
        } else {
            setShowLogin(true);
        }
    }
    window.onresize = () => {
        if (window.innerWidth >= 610) {
            setShowMenu(false);
        }
    }
    console.log(userLoggedIn);

    if (showMenu) {
        return (
            <nav className="nav--hamburger row">
                <div className="nav__left">
                    {/*Logo place*/}
                </div>
                <div className={`nav__right ${(showRegister || showLogin) && "nav__right--max"}`}>
                    <button className="nav__menuToggle" onClick={() => {
                        setShowMenu(false)
                        if (showLogin || showRegister) {
                            handleShowLogin();
                        }
                    }}>
                        <i className="fas fa-bars"/>
                    </button>
                    {!showLogin && !showRegister && (
                        <div className="nav__links--hamburger">
                            <NavLink activeClassName="nav__link--active" className="nav__home nav__link--hamburger" to="/" exact onClick={() => setShowMenu(false)}>HOME</NavLink>
                            <NavLink activeClassName="nav__link--active" className="nav__establishments nav__link--hamburger" to="/establishments" onClick={() => setShowMenu(false)}>ESTABLISHMENTS</NavLink>
                            <NavLink activeClassName="nav__link--active" className="nav__about nav__link--hamburger" to="/contact" onClick={() => setShowMenu(false)}>CONTACT US</NavLink>
                            {(!userLoggedIn && !showLogin) &&
                            (<button className="nav__login nav__link--hamburger" onClick={() => {
                                handleShowLogin();
                            }}>LOGIN <i className="fas fa-angle-down"/></button>)
                            }
                            {(!userLoggedIn && showLogin) && (
                                (<button className="nav__login nav__link--hamburger" onClick={() => {
                                    handleShowLogin()
                                }}>
                                    LOGIN <i className="fas fa-angle-up"/></button>)
                            )}
                            {userLoggedIn && (
                                <NavLink activeClassName="nav__link--active" className="nav__login nav__link--hamburger" to="/user" onClick={() => setShowMenu(false)}>MY PAGE</NavLink>
                            )}
                        </div>
                    )}
                    {(!userLoggedIn && showLogin) && (
                        <div>
                            <button className="nav__login nav__link--hamburger" onClick={() => handleShowLogin()}>
                                LOGIN <i className="fas fa-angle-up"/></button>
                            <LoginUserForm fullWidth={true} loginF={updateUser} nav={true}>
                                <button className="login__register btn link--white" onClick={() => {
                                    setShowRegister(true);
                                    setShowLogin(false);
                                }}>Register</button>
                            </LoginUserForm>
                        </div>

                    )}
                    {(!userLoggedIn && showRegister) && (
                        <div>
                            <button className="nav__login nav__link--hamburger" onClick={() => handleShowLogin()}>
                                LOGIN <i className="fas fa-angle-up"/></button>
                            <RegisterUserForm fullWidth={true} loginF={updateUser} nav={true}>
                                <button className="login__login btn link--white" onClick={() => {
                                    setShowRegister(false);
                                    setShowLogin(true);
                                }}>Got user?</button>
                            </RegisterUserForm>
                        </div>
                    )}
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="nav row">
                <div className="nav__left">
                    {/*Logo place*/}
                </div>
                <div className={`nav__right ${(showRegister || showLogin) && "nav__right--max"}`}>
                    <button className="nav__menuToggle" onClick={() => {
                        setShowMenu(true)
                        if (showLogin || showRegister) {
                            handleShowLogin();
                        }
                    }}>
                        <i className="fas fa-bars"/>
                    </button>
                    <div className="nav__links">
                        <NavLink activeClassName="nav__link--active" className="nav__home nav__link" to="/" exact>HOME</NavLink>
                        <NavLink activeClassName="nav__link--active" className="nav__establishments nav__link" to="/establishments">ESTABLISHMENTS</NavLink>
                        <NavLink activeClassName="nav__link--active" className="nav__about nav__link" to="/contact">CONTACT US</NavLink>
                        {(!userLoggedIn && !showLogin) &&
                        (<button className="nav__login nav__link" onClick={() => handleShowLogin()}>LOGIN <i className="fas fa-angle-down"/></button>)
                        }
                        {(!userLoggedIn && showLogin) && (
                            (<button className="nav__login nav__link" onClick={() => handleShowLogin()}>
                                LOGIN <i className="fas fa-angle-up"/></button>)
                        )}
                        {userLoggedIn && (
                            <NavLink activeClassName="nav__link--active" className="nav__login nav__link" to="/user">MY PAGE</NavLink>
                        )}
                    </div>
                    {(!userLoggedIn && showLogin) && (
                        <div>
                            <button className="nav__login nav__link--hamburger" onClick={() => handleShowLogin()}>
                                LOGIN <i className="fas fa-angle-up"/></button>
                            <LoginUserForm loginF={updateUser} nav={true}>
                                <button className="login__register login__extraBtn link--white" onClick={() => {
                                    setShowRegister(true);
                                    setShowLogin(false);
                                }}>Register</button>
                            </LoginUserForm>
                        </div>
                    )}
                    {(!userLoggedIn && showRegister) && (
                        <div>
                            <button className="nav__login nav__link--hamburger" onClick={() => handleShowLogin()}>
                                LOGIN <i className="fas fa-angle-up"/></button>
                            <RegisterUserForm loginF={updateUser} nav={true}>
                                <button className="login__login login__extraBtn link--white" onClick={() => {
                                    setShowRegister(false);
                                    setShowLogin(true);
                                }}>Got user?</button>
                            </RegisterUserForm>
                        </div>
                    )}
                </div>
            </nav>
        )
    }
}

Navigation.propTypes = {
    userLoggedIn: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired
}