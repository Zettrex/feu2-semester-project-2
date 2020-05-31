import React, {useState} from "react";

export default function ({className, groupCol, value, Ref, errors}) {
    const [fromDate, setFromDate] = useState(value);
    return (
        <div className={`${className}__dateFrom form__dateFrom form__container ${groupCol}`}>
            <div className={`form__group form__date--left`}>
                <label className={`form__label--left`} htmlFor="date1">From</label>
                <input className={`form__dateInput--left`} type="date" name="date1" value={fromDate && (fromDate)} onChange={event => setFromDate(event.target.value)} ref={Ref}/>
            </div>
            {errors.date1 && <p className="form__error--left">{errors.date1.message}</p>}
        </div>
    )
}