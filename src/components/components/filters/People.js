import React from "react";
import Adults from "./Adults";
import Children from "./Children";

export default function ({className, sectionCol, groupCol, Ref, errors, childrenValue, adultsValue, children = true, adults = true}) {
    return (
        <div className={`${className}__people form__section ${sectionCol} row`}>
            {adults && (<Adults className={className} groupCol={groupCol} value={adultsValue} Ref={Ref} errors={errors}/>)}
            {children && (<Children className={className} groupCol={groupCol} value={childrenValue} Ref={Ref} errors={errors}/>)}
        </div>
    )
}