import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

export default function Footer({user, openLogin}) {
    console.log(user);
    return (
        <footer className="footer row">
            <div className="footer__links col-6 col-s-12">
                <Link className="footer__link--home footer__link" to="/">Home</Link>
                <Link className="footer__link--projects footer__link" to="/establishments">Establishments</Link>
                <Link className="footer__link--about footer__link" to="/contact">Contact Us</Link>
                {user ? (
                    <Link className="footer__link--about footer__link" to="/user">My Page</Link>
                ) : (
                    <button className="footer__link--login footer__link" onClick={() => {
                        window.scroll({top: 0, left: 0, smooth: true})
                        openLogin();
                    }}>Login</button>
                )}
            </div>
            <div className="footer__contact col-6 col-s-12">
                <div className="footer__support footer__elem">
                    Support 24/7
                </div>
                <a className="footer__phone footer__elem" href="tel:+4712345678">
                    <i className="footer__phoneIcon"/> +47 12 34 56 78
                </a>
                <a className="footer__email footer__elem" href="mailto:example@example.com">
                    <i className="footer__emailIcon"/> example@example.com
                </a>
            </div>
        </footer>
    )
}

Footer.propTypes = {
    user: PropTypes.object,
    openLogin: PropTypes.func.isRequired
};

