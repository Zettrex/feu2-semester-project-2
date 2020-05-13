import React from "react";

export default function (props) {
    return (
        <div className="enquiry-prompt prompt">
            <h2 className="h1 prompt__heading">Enquiry</h2>
                <div className="enquiry-prompt__content">
                    <div className="enquiry-prompt__contact">
                        <h2 className="h3">Contact Information</h2>
                        <div className="enquiry-prompt__name">
                            <span>Name: </span>
                            <span>{data.contact.name}</span>
                        </div>
                        <div className="enquiry-prompt__registered">
                            <span>Registered user: </span>
                            <span>{data.contact.registered ? ("Yes"): ("No")}</span>
                        </div>
                        {data.contact.registered && (
                            <div className="enquiry-prompt__id">
                                <span>User ID: </span>
                                <span>{data.contact.id}</span>
                            </div>
                        )}
                        <div className="enquiry-prompt__email">
                            <span>Email: </span>
                            <span>{data.contact.email}</span>
                        </div>
                    </div>
                    <div className="enquiry-prompt__information row">
                        <div className="enquiry-prompt__orderInfo">
                            <div className="enquiry-prompt__orderID">
                                <span>Order: </span>
                                <span>{data.orderID}</span>
                            </div>
                            <div className="enquiry-prompt__orderDate">
                                <span>Order date: </span>
                                <span>{data.orderDate}</span>
                            </div>
                            <div className="enquiry-prompt__payment">
                                <span>Payment Method: </span>
                                <span>{data.payMethod}</span>
                            </div>
                        </div>
                        <div className="enquiry-prompt__order">
                            <div className="enquiry-prompt__orderName">{data.establishmentName}</div>
                            <div className="enquiry-prompt__orderFrom">
                                <span>From: </span>
                                <span>{data.dateFrom}</span>
                            </div>
                            <div className="enquiry-prompt__order">
                                <span>To: </span>
                                <span>{data.dateTo}</span>
                            </div>
                            <div className="enquiry-prompt__adults">
                                <span>Adults: </span>
                                <span>{data.adults}</span>
                            </div>
                            <div className="enquiry-prompt__children">
                                <span>Children: </span>
                                <span>{data.children}</span>
                            </div>
                            <div className="enquiry-prompt__rooms">
                                <span>Rooms: </span>
                                <div>{data.rooms.map(room => <span>{room}</span>)}</div>
                            </div>
                            <div className="enquiry-prompt__price">
                                <span>Price: </span>
                                <span>{data.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="prompt__action">
                    <button>Cancel</button>
                    <button className="btn--primary">Edit</button>
                </div>
            </div>
    )
}