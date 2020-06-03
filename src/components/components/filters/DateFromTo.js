import React from "react";
import DateFrom from "./DateFrom";
import DateTo from "./DateTo";
import PropTypes from "prop-types";

export default function DateFromTo({className, sectionCol, groupCol, value1, value2, Ref, errors}) {
    return (
        <div className={`${className}__dates form__section ${sectionCol} row`}>
            <DateFrom className={className} groupCol={groupCol} value={value1} Ref={Ref} errors={errors}/>
            <DateTo className={className} groupCol={groupCol} value={value2} Ref={Ref} errors={errors}/>
        </div>
    )
}
DateFromTo.propTypes = {
    className: PropTypes.string,
    sectionCol: PropTypes.string,
    groupCol: PropTypes.string,
    value1: PropTypes.string,
    value2: PropTypes.string,
    Ref: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}