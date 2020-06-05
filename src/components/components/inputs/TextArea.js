import React from "react";
import PropTypes from "prop-types";

export default function TextArea({name, label, className, value, setValue, sectionCol, groupCol, Ref, errors}) {
    return (
        <div className={`form__section ${sectionCol && sectionCol}`}>
            <div className={`${className}__textArea form__group ${groupCol && groupCol}`}>
                <div className="textArea__wrapper form__textarea">
                    <label className={`${className}__label textArea__label form__label--textarea`} htmlFor={name}>{label}</label>
                    <textarea className={`${className}__input textArea__input`} name={name} id={name} value={value} onChange={setValue} ref={Ref}/>
                </div>
                {errors && <p className="form__error">{errors.message}</p>}
            </div>
        </div>
    )
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    groupCol: PropTypes.string,
    Ref: PropTypes.func.isRequired,
    errors: PropTypes.object,
    value: PropTypes.string,
    setValue: PropTypes.func
}
