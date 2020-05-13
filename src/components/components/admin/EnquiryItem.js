import React from "react";

export default function ({enquiry}) {
    function _viewEnquiry() {

    }
    return (
        <div className="enquiry admin-item admin-item__section">
            <div className="enquiry__establishment admin-item__left">
                <div className="enquiry__img admin-item__Img" style={{
                    backgroundImage: `url(${enquiry.establishmentImg})`
                }}/>
                <span className="enquiry__name admin-item__name">{enquiry.establishment}</span>
            </div>
            <div className="admin-item__right admin-item__section">
                <div className="enquiry__date admin-item__date">{enquiry.checkin}</div>
                <button className="enquiry__view btn--primary admin-item__btn" onClick={() => _viewEnquiry}>View</button>
            </div>
        </div>
    )
}