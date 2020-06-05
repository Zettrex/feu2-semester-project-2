import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

export default function Footer({user, openLogin}) {
    return (
        <footer className="footer row">
            <div className="footer__links col-6 col-s-12">
                <Link className="footer__link--home footer__link" to="/">Home</Link>
                <Link className="footer__link--projects footer__link" to="/establishments">Establishments</Link>
                <Link className="footer__link--about footer__link" to="/contact">Contact Us</Link>
                {(user && user.isAdmin) && (
                    <Link className="footer__link--about footer__link" to="/user">My Page</Link>
                )}
                {!user && (
                    <button className="footer__link--login footer__link" onClick={() => {
                        window.scroll({top: 0, left: 0, smooth: true})
                        openLogin();
                    }}>Login</button>
                )}
            </div>
            <div className="footer__contact col-6 col-s-12">
                <a className="footer__phone footer__elem" href="tel:+4712345678">
                    +47 12 34 56 78 <i className="fas fa-phone"/>
                </a>
                <a className="footer__email footer__elem" href="mailto:example@example.com">
                    support@holidaze.com <i className="fas fa-envelope"/>
                </a>
                <a className="footer__email footer__elem" href="https://goo.gl/maps/xNDw2LRC37zVD8bh7">
                    Nordnesbakken 4, 5005 Bergen <i className="fas fa-map-marker-alt"/>
                </a>
            </div>
        </footer>
    )
}

Footer.propTypes = {
    user: PropTypes.object,
    openLogin: PropTypes.func.isRequired
};

