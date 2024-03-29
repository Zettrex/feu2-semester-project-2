import React from "react";
import Select from "../inputs/Select";
import PropTypes from "prop-types";

export default function Children({className, groupCol, value, Ref, errors}) {
    return (
        <div className={`${className}__childrenWrapper form__container ${groupCol && groupCol}`}>
            <div className={`${className}__children form__group`}>
                <Select className={`${className}__childrenInput form__children`} label="Children" name="children" selected={value} Ref={Ref}>
                    <option className="form__option" value="0">0</option>
                    <option className="form__option" value="1">1</option>
                    <option className="form__option" value="2">2</option>
                    <option className="form__option" value="3">3</option>
                    <option className="form__option" value="4">4</option>
                    <option className="form__option" value="5">5</option>
                    <option className="form__option" value="6">6</option>
                    <option className="form__option" value="7">7</option>
                    <option className="form__option" value="8">8</option>
                    <option className="form__option" value="9">9</option>
                    <option className="form__option" value="10">10</option>
                </Select>
            </div>
            {errors.children && <p className="form__error">{errors.children.message}</p>}
        </div>

    )
}
Children.propTypes = {
    className: PropTypes.string,
    groupCol: PropTypes.string,
    value: PropTypes.string,
    Ref: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}