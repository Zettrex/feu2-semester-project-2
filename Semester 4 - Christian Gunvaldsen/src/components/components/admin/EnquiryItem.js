import React from "react";
import PropTypes from 'prop-types';

export default function EnquiryItem ({odd, enquiry, openF}) {
    return (
        <div className="enquiry admin-item row">
            <div className="enquiry__establishment admin-item__left">
                <div className="enquiry__img admin-item__img" style={{
                    backgroundImage: `url(${enquiry.establishmentImg})`
                }}/>
                <span className="enquiry__name admin-item__name">{enquiry.establishmentName}</span>
            </div>
            <div className={`admin-item__right${odd ? "--odd" : "--even"}`}>
                <div className="admin-item__action row">
                    <div className="enquiry__date admin-item__date">{enquiry.checkin}</div>
                    <button className="enquiry__view btn--primary admin-item__btn" onClick={() => openF("open", "enquiry", enquiry)}>View</button>
                </div>
            </div>
        </div>
    )
}
EnquiryItem.propTypes = {
    odd: PropTypes.bool.isRequired,
    enquiry: PropTypes.object.isRequired,
    openF: PropTypes.func.isRequired
}