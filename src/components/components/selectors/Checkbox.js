import React from "react";

export default function ({checked}) {
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