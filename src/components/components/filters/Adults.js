import React from "react";
import Select from "../inputs/Select";

export default function ({className, groupCol, value, Ref, errors}) {
    return (
        <div className={`${className}__adultsWrapper form__container ${groupCol}`}>
            <div className={`${className}__adults form__group`}>
                <Select className={`${className}__adultsInput`} label="Adults" name="adults" selected={value} Ref={Ref}>
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
            {errors.adults && <p className="form__error">{errors.adults.message}</p>}
        </div>
    )
}