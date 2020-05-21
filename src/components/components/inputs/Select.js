import React from "react";

export default function (props) {
    return (
        <div className="form__select--custom">
            <label className="form__select--label" htmlFor={props.name}>{props.label}</label>
            <select className={props.className + " form__select--compact"} name={props.name} id={props.name} ref={props.Ref}>
                {props.children}
            </select>
            <span className="form__item--toggle"><i className="fas fa-sort-down"/></span>
        </div>
    )
}