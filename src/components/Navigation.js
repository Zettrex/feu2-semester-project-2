import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import LoginUserForm from "./components/LoginUserForm";
import RegisterUserForm from "./components/RegisterUserForm";

export default function ({userLoggedIn, updateUser}) {
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
            <nav className="nav--mobile row">
                <div className="nav__left">
                    {/*Logo place*/}
                </div>
                <div className="nav__right">
                    <button className="nav__menuToggle" onClick={() => setShowMenu(false)}>
                        <i className="fas fa-bars"/>
                    </button>
                    <div className="nav__links--mobile">
                        <NavLink activeClassName="nav__link--active" className="nav__home nav__link--mobile" to="/" exact onClick={() => setShowMenu(false)}>HOME</NavLink>
                        <NavLink activeClassName="nav__link--active" className="nav__establishments nav__link--mobile" to="/establishments" onClick={() => setShowMenu(false)}>ESTABLISHMENTS</NavLink>
                        <NavLink activeClassName="nav__link--active" className="nav__about nav__link--mobile" to="/contact" onClick={() => setShowMenu(false)}>CONTACT US</NavLink>
                        {(!userLoggedIn && !showLogin) &&
                            (<button className="nav__login nav__link--mobile" onClick={() => handleShowLogin()}>LOGIN <i className="fas fa-angle-down"/></button>)
                        }
                        {(!userLoggedIn && showLogin) && (
                            (<button className="nav__login nav__link--mobile" onClick={() => setShowLogin(!showLogin)}>
                                LOGIN <i className="fas fa-angle-up"/></button>)
                        )}
                        {(!userLoggedIn && showLogin) && (
                            <LoginUserForm loginF={updateUser} nav={true}>
                                <button className="login__register link--white" onClick={() => {
                                    setShowRegister(true);
                                    setShowLogin(false);
                                }}>Register</button>
                            </LoginUserForm>
                        )}
                        {(!userLoggedIn && showRegister) && (
                            <RegisterUserForm loginF={updateUser} nav={true}>
                                <button className="login__login link--white" onClick={() => {
                                    setShowRegister(false);
                                    setShowLogin(true);
                                }}>Got user?</button>
                            </RegisterUserForm>
                        )}
                        {userLoggedIn && (
                            <button className="nav__login nav__link--mobile" onClick={() => setShowLogin(!showLogin)}>
                                USER <i className="fas fa-angle-up"/></button>
                        )}
                    </div>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="nav row">
                <div className="nav__left">
                    {/*Logo place*/}
                </div>
                <div className="nav__right">
                    <button className="nav__menuToggle" onClick={() => setShowMenu(true)}>
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
                            (<button className="nav__login nav__link" onClick={() => setShowLogin(!showLogin)}>
                                LOGIN <i className="fas fa-angle-up"/></button>)
                        )}
                        {(!userLoggedIn && showLogin) && (
                            <LoginUserForm loginF={updateUser} nav={true}>
                                <button className="login__register link--white" onClick={() => {
                                    setShowRegister(true);
                                    setShowLogin(false);
                                }}>Register</button>
                            </LoginUserForm>
                        )}
                        {(!userLoggedIn && showRegister) && (
                            <RegisterUserForm loginF={updateUser} nav={true}>
                                <button className="login__login link--white" onClick={() => {
                                    setShowRegister(false);
                                    setShowLogin(true);
                                }}>Got user?</button>
                            </RegisterUserForm>
                        )}
                        {userLoggedIn && (
                            <NavLink activeClassName="nav__link--active" className="nav__login nav__link" to="/user">MY PAGE</NavLink>
                        )}
                    </div>
                </div>
            </nav>
        )
    }

}