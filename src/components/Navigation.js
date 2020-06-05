import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import LoginUserForm from "./components/LoginUserForm";
import RegisterUserForm from "./components/RegisterUserForm";
import PropTypes from "prop-types";
import logo from "../media/images/Logo.svg"

export default function Navigation({userLoggedIn, updateUser, showLogin, setShowLogin}) {
    const [showMenu, setShowMenu] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    function handleShowLogin() {
        if (showLogin || showRegister || showUserMenu) {
            setShowLogin(false);
            setShowRegister(false);
            setShowUserMenu(false);
        } else {
            setShowLogin(true);
        }
    }
    window.onresize = () => {
        if (window.innerWidth >= 610) {
            setShowMenu(false);
            setShowUserMenu(false)
        }
    }

    if (showMenu) {
        return (
            <nav className="nav--hamburger row">
                <div className="nav__left">
                    <NavLink to="/" exact>
                        <img className="nav__logo" src={logo} alt="Hollodaze logo"/>
                    </NavLink>
                </div>
                <div className={`${(showRegister || showLogin || showUserMenu) ? "nav__right--max" : "nav__right"}`}>
                    <button className="nav__menuToggle" onClick={() => {
                        setShowMenu(false)
                        if (showLogin || showRegister || showUserMenu) {
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
                            {(userLoggedIn && !showUserMenu) && <button className="nav__login nav__link--hamburger" onClick={() => {setShowUserMenu(true)}}>MY USER <i className="fas fa-angle-down"/></button>}
                            {(userLoggedIn && showUserMenu) && <button className="nav__login nav__link--hamburger" onClick={() => setShowUserMenu(false)}>MY USER <i className="fas fa-angle-up"/></button>}
                        </div>
                    )}
                    {(!userLoggedIn && showLogin) && (
                        <div className="nav__loginArea">
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
                        <div className="nav__loginArea">
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
                    {(userLoggedIn && showUserMenu) && (
                        <div className="nav__userMenu">
                            <NavLink className="nav__user nav__link" to="/user" onClick={() => {
                                handleShowLogin();
                                setShowMenu(false);
                            }}>MY PAGE</NavLink>
                            <button className="nav__logOut nav__link" onClick={() => {
                                localStorage.removeItem("user");
                                updateUser(null)
                            }}>Log Out</button>
                        </div>
                    )}
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="nav row">
                <div className="nav__left">
                    <NavLink to="/" exact>
                        <img className="nav__logo" src={logo} alt="Hollodaze logo"/>
                    </NavLink>
                </div>
                <div className={`${(showRegister || showLogin || showUserMenu) ? "nav__right--max" : "nav__right"}`}>
                    <button className="nav__menuToggle" onClick={() => {
                        setShowMenu(true)
                        if (showLogin || showRegister || showUserMenu) {
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
                        {(userLoggedIn && !showUserMenu) && <button className="nav__login nav__link" onClick={() => {setShowUserMenu(true)}}>MY USER <i className="fas fa-angle-down"/></button>}
                        {(userLoggedIn && showUserMenu) && <button className="nav__login nav__link" onClick={() => setShowUserMenu(false)}>MY USER <i className="fas fa-angle-up"/></button>}
                    </div>
                    {(!userLoggedIn && showLogin) && (
                        <div className="nav__loginArea">
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
                        <div className="nav__loginArea">
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
                    {(userLoggedIn && showUserMenu) && (
                        <div className="nav__userMenu">
                            <NavLink className="nav__user nav__link" to="/user" onClick={() => {
                                handleShowLogin();
                                setShowMenu(false);
                            }}>MY PAGE</NavLink>
                            <button className="nav__logOut nav__link" onClick={() => {
                                localStorage.removeItem("user");
                                updateUser(null)
                            }}>Log Out</button>
                        </div>
                    )}
                </div>
            </nav>
        )
    }
}

Navigation.propTypes = {
    userLoggedIn: PropTypes.object,
    updateUser: PropTypes.func.isRequired,
    showLogin: PropTypes.bool.isRequired,
    setShowLogin: PropTypes.func.isRequired
}