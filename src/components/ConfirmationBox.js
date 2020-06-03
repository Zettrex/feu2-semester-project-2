import React from "react";
import PropTypes from "prop-types";

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
                        <button className="confirmation__ok btn--primary" onClick={() => props.updateConfirmed(false)}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
ConfirmationBox.propTypes = {
    updateConfirmed: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired
}