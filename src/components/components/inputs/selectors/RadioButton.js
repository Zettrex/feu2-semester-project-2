import React from "react";

export default function ({checked}) {
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