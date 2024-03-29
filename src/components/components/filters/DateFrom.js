import React, {useState} from "react";
import PropTypes from "prop-types";

export default function DateFrom({className, groupCol, value="", Ref, errors}) {
    const [fromDate, setFromDate] = useState(value);
    return (
        <div className={`${className}__dateFrom form__dateFrom form__container ${groupCol && groupCol}`}>
            <div className={`form__group form__date--left`}>
                <label className={`form__label--left`} htmlFor="date1">From</label>
                <input className={`form__dateInput--left`} type="date" name="date1" value={fromDate} onChange={event => setFromDate(event.target.value)} ref={Ref}/>
            </div>
            {errors.date1 && <p className="form__error--left">{errors.date1.message}</p>}
        </div>
    )
}
DateFrom.propTypes = {
    className: PropTypes.string,
    groupCol: PropTypes.string,
    value: PropTypes.string,
    Ref: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}