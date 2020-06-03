import React from "react";
import PropTypes from "prop-types";

export default function Checkbox({checked}) {
    if (checked) {
        return (
            <i className="far fa-check-square"/>
        )
    } else {
        return (
            <i className="far fa-square"/>
        )
    }
}

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired
}