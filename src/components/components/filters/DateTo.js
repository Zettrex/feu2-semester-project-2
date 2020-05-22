import React, {useState} from "react";

export default function ({className, groupCol, value, Ref, errors}) {
    const [toDate, setToDate] = useState(value);
    return (
        <div className={`${className}__dateTo form__container ${groupCol}`}>
            <div className={`form__date--right form__group`}>
                <label className={`form__label--right`} htmlFor="date2">To</label>
                <input className={`form__dateInput--right`} type="date" name="date2" value={value && toDate} ref={Ref} onChange={event => setToDate(event.target.value)}/>
            </div>
            {errors.date2 && <p className="form__error">{errors.date2.message}</p>}
        </div>
    )
}