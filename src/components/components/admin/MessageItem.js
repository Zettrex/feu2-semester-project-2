import React from "react";

export default function ({odd, message, openF}) {
    return (
        <div className="message admin-item row">
            <div className="message__left admin-item__left col-auto">
                <span className="message__name admin-item__name">{message.clientName}</span>
            </div>
            <div className={`message__right admin-item__right${odd ? "--odd" : "--even"}`}>
                <div className="message__info admin-item__infoWrapper column">
                    <span className="message__subject admin-item__info">{message.subject}</span>
                    <span className="message__date admin-item__date">20/12-2020</span>
                </div>
                <div className="message__rightAction">
                    <button className="message__view btn--primary admin-item__btn" onClick={() => openF("open", "message", message)}>View</button>
                </div>
            </div>
        </div>
    )
}