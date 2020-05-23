import React from "react";

export default function ({message, openF}) {
    return (
        <div className="message admin-item admin-item__section">
            <div className="admin-item__left">
                <span className="message__name admin-item__name">{message.clientName}</span>
            </div>
            <div className="admin-item__right admin-item__section">
                <span className="message__subject admin-item__info">{message.subject}</span>
                <span className="message__date admin-item__date">20/12-2020</span>
                <button className="message__view btn--primary admin-item__btn" onClick={() => openF("open", "message", message)}>View</button>
            </div>
        </div>
    )
}