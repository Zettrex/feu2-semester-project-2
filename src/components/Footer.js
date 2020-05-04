import React from "react";
import {Link} from "react-router-dom";

export default function (props) {
    return (
        <footer className="footer row">
            <div className="footer__links col-12 col-d-4">
                <Link className="footer__link--home footer__link" to="/">Home</Link>
                <Link className="footer__link--projects footer__link" to="/establishments">Establishments</Link>
                <Link className="footer__link--about footer__link" to="/contact">Contact Us</Link>
                <Link className="footer__link--login footer__link" to="/login">Login</Link>
            </div>
            <div className="footer__contact col-12 col-d-4">
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
            <div className="footer__display col-12 col-d-4">

            </div>
        </footer>
    )
}