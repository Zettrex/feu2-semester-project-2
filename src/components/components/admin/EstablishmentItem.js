import React from "react";

export default function ({establishment, openF}) {
    return (
        <div className="establishment admin-item admin-item__section">
            <div className="admin-item__left">
                <div className="establishment__img admin-item__img" style={{
                    backgroundImage: `url(${establishment.imageUrl})`
                }}/>
                <span className="establishment__name admin-item__name">{establishment.establishmentName}</span>
            </div>
            <div className="admin-item__right admin-item__section">
                <span className="establishment__area admin-item__info">area</span>
                <button className="btn--primary admin-item__btn" onClick={() => openF("open", "establishment", establishment)}>Edit</button>
            </div>
        </div>
    )
}