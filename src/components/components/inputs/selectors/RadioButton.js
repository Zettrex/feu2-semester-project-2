import React from "react";
import PropTypes from "prop-types";

export default function RadioButton({checked}) {
    if (checked) {
        return (
            <i className="far fa-dot-circle"/>
        )
    } else {
        return (
            <i className="far fa-circle"/>
        )
    }
}
RadioButton.propTypes = {
    checked: PropTypes.bool.isRequired
}