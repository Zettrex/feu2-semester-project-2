import React from "react";

export default function ({enquiry, openF}) {
    return (
        <div className="enquiry admin-item row">
            <div className="enquiry__establishment admin-item__left col-6">
                <div className="enquiry__img admin-item__img" style={{
                    backgroundImage: `url(${enquiry.establishmentImg})`
                }}/>
                <span className="enquiry__name admin-item__name">{enquiry.establishmentName}</span>
            </div>
            <div className="admin-item__right col-6 row">
                <div className="enquiry__date admin-item__date">{enquiry.checkin}</div>
                <button className="enquiry__view btn--primary admin-item__btn" onClick={() => openF("open", "enquiry", enquiry)}>View</button>
            </div>
        </div>
    )
}