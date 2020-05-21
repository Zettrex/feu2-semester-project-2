import React from "react";
import Select from "../inputs/Select";

export default function ({className, groupCol, Ref}) {
    return (
        <div className={`${className}__children form__group ${groupCol}`}>
            <Select className={`${className}__childrenInput`} label="Children" name="children" Ref={Ref}>
                <option className="form__option" value={null} defaultValue hidden/>
                <option className="form__option" value="1">0</option>
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
    )
}