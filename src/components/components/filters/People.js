import React from "react";
import Adults from "./Adults";
import Children from "./Children";

export default function ({className, sectionCol, groupCol, Ref, children, adults}) {
    return (
        <div className={`${className}__people form__section ${sectionCol} row`}>
            {adults && (<Adults className={className} groupCol={groupCol} Ref={Ref}/>)}
            {children && (<Children className={className} groupCol={groupCol} Ref={Ref}/>)}
        </div>
    )
}