import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export default function ConfirmationBox(props) {
    return (
        <div className="confirmation__prompt">
            <div className="confirmation__Wrapper">
                <div className="confirmation__topbar">
                    <button className="confirmation__close" onClick={() => props.updateConfirmed(false)}>X</button>
                </div>
                <div className="confirmation__content">
                    {props.children}
                    <div className="section confirmation__action">
                        {props.toHome ? (
                            <Link className="confirmation__ok btn--primary" to="/" exact>Ok</Link>
                        ) : (
                            <button className="confirmation__ok btn--primary" onClick={() => props.updateConfirmed(false)}>Ok</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
ConfirmationBox.propTypes = {
    updateConfirmed: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired,
    toHome: PropTypes.bool
}