import React from "react";

export default function ({className, sectionCol, groupCol, Ref}) {
    return (
        <div className={`${className}__dates form__section ${sectionCol} row`}>
            <div className={`form__date--left form__group ${groupCol}`}>
                <label className={`form__label--left`} htmlFor="date1">From</label>
                <input className={`form__dateInput--left`} type="date" name="date1" ref={Ref}/>
            </div>
            <div className={`form__date--right form__group ${groupCol}`}>
                <label className={`form__label--right`} htmlFor="date2">To</label>
                <input className={`form__dateInput--right`} type="date" name="date2" ref={Ref}/>
            </div>
        </div>
    )
}