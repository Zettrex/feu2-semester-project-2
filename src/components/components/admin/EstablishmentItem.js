import React from "react";

export default function ({odd, establishment, openF}) {
    return (
        <div className="admin__fixWrapper col-6 col-m-12">
            <div className="est-item admin-item row">
                <div className="admin-item__left">
                    <div className="est-item__img admin-item__img" style={{
                        backgroundImage: `url(${establishment.imageUrl})`
                    }}/>
                    <span className="est-item__name admin-item__name">{establishment.establishmentName}</span>
                </div>
                <div className={`admin-item__right${odd ? "--odd" : "--even"}`}>
                    <span className="est-item__area admin-item__info">area</span>
                    <button className="btn--primary admin-item__btn" onClick={() => openF("open", "establishment", establishment, "edit")}>Edit</button>
                </div>
            </div>
        </div>
    )
}