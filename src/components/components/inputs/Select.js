import React, {useState} from "react";
import PropTypes from "prop-types";

export default function Select(props) {
    const [selected, setSelected] = useState(props.selected);
    return (
        <div className="form__select--custom">
            <label className="form__select--label" htmlFor={props.name}>{props.label}</label>
            <select className={props.className + " form__select--compact"} name={props.name} id={props.name} value={selected && selected} onChange={event => setSelected(event.target.value)} ref={props.Ref}>
                <option className="form__option" value="" hidden/>
                {props.children}
            </select>
            <span className="form__item--toggle"><i className="fas fa-sort-down"/></span>
        </div>
    )
}
Select.propTypes = {
    selected: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired || PropTypes.element.isRequired
}
