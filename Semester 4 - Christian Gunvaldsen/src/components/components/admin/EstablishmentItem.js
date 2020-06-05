import React from "react";
import PropTypes from "prop-types";

export default function EstablishmentItem({odd, establishment, openF}) {
    return (
        <div className="admin__fixWrapper col-6 col-s-12">
            <div className="est-item admin-item row">
                <div className="admin-item__left">
                    <div className="est-item__img admin-item__img" style={{
                        backgroundImage: `url(${establishment.imageUrl})`
                    }}/>
                    <span className="est-item__name admin-item__name">{establishment.establishmentName}</span>
                </div>
                <div className={`admin-item__right${odd ? "--odd" : "--even"}`}>
                    <div className="admin-item__action">
                        <button className="btn--primary admin-item__btn" onClick={() => openF("open", "establishment", establishment, "edit")}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

EstablishmentItem.propTypes = {
    odd: PropTypes.bool.isRequired,
    establishment: PropTypes.object.isRequired,
    openF: PropTypes.func.isRequired
}