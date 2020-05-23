import React, {useState} from "react";
import {NavLink} from "react-router-dom";

export default function () {
    const [showMenu, setShowMenu] = useState(false);
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
                        <NavLink activeClassName="nav__link--active" className="nav__home nav__link--mobile" to="/" exact>Home</NavLink>
                        <NavLink activeClassName="nav__link--active" className="nav__establishments nav__link--mobile" to="/establishments">Establishments</NavLink>
                        <NavLink activeClassName="nav__link--active" className="nav__about nav__link--mobile" to="/contact">Contact Us</NavLink>
                        <NavLink activeClassName="nav__link--active" className="nav__login nav__link--mobile" to="/user">Login</NavLink>
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
                        <NavLink activeClassName="nav__link--active" className="nav__home nav__link" to="/" exact>Home</NavLink>
                        <NavLink activeClassName="nav__link--active" className="nav__establishments nav__link" to="/establishments">Establishments</NavLink>
                        <NavLink activeClassName="nav__link--active" className="nav__about nav__link" to="/contact">Contact Us</NavLink>
                        <NavLink activeClassName="nav__link--active" className="nav__login nav__link" to="/user">Login</NavLink>
                    </div>
                </div>
            </nav>
        )
    }

}