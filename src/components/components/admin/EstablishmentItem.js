import React from "react";

export default function ({establishment, openF}) {
    return (
        <div className="est-item admin-item row">
            <div className="admin-item__left col-6">
                <div className="est-item__img admin-item__img" style={{
                    backgroundImage: `url(${establishment.imageUrl})`
                }}/>
                <span className="est-item__name admin-item__name">{establishment.establishmentName}</span>
            </div>
            <div className="admin-item__right col-6 row">
                <span className="est-item__area admin-item__info">area</span>
                <button className="btn--primary admin-item__btn" onClick={() => openF("open", "establishment", establishment, "edit")}>Edit</button>
            </div>
        </div>
    )
}