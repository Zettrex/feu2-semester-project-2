import React, {useState} from "react";
import PropTypes from "prop-types";

export default function DateTo({className, groupCol, value="", Ref, errors}) {
    const [toDate, setToDate] = useState(value);
    return (
        <div className={`${className}__dateTo form__dateTo form__container ${groupCol}`}>
            <div className={`form__group form__date--right`}>
                <label className={`form__label--right`} htmlFor="date2">To</label>
                <input className={`form__dateInput--right`} type="date" name="date2" value={toDate && (toDate)} ref={Ref} onChange={event => setToDate(event.target.value)}/>
            </div>
            {errors.date2 && <p className="form__error--right">{errors.date2.message}</p>}
        </div>
    )
}

DateTo.propTypes = {
    className: PropTypes.string,
    groupCol: PropTypes.string,
    value: PropTypes.string,
    Ref: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}