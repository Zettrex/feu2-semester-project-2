import React from "react";

export default function ({data, closeF}) {
    console.log(data);
    return (
        <div className="view-enquiry">
            <h2 className="h1 prompt__heading">Enquiry</h2>
                <div className="view-enquiry__content">
                    <div className="view-enquiry__contact">
                        <h2 className="h3">Contact Information</h2>
                        <div className="view-enquiry__name">
                            <span>Name: </span>
                            <span>{data.clientName}</span>
                        </div>
                        <div className="view-enquiry__registered">
                            <span>Registered user: </span>
                            <span>{data.clientRegistered ? ("Yes"): ("No")}</span>
                        </div>
                        {data.clientRegistered && (
                            <div className="view-enquiry__id">
                                <span>User ID: </span>
                                <span>{data.clientID}</span>
                            </div>
                        )}
                        <div className="view-enquiry__email">
                            <span>Email: </span>
                            <span>{data.clientEmail}</span>
                        </div>
                    </div>
                    <div className="view-enquiry__information row">
                        <div className="view-enquiry__orderInfo">
                            <div className="view-enquiry__orderID">
                                <span>Order: </span>
                                <span>{data.orderID}</span>
                            </div>
                            <div className="view-enquiry__orderDate">
                                <span>Order date: </span>
                                <span>{data.orderDate}</span>
                            </div>
                            <div className="view-enquiry__estName">
                                <span>Establishment: </span>
                                <span>{data.establishmentName}</span>
                            </div>
                            <div className="view-enquiry__estEmail">
                                <span>Establishment email:</span>
                                <span>{data.establishmentEmail}</span>
                            </div>
                            <div className="view-enquiry__payment">
                                <span>Payment Method: </span>
                                <span>{data.payMethod}</span>
                            </div>
                            <div className="view-enquiry__price">
                                <span>Price: </span>
                                <span>{data.price}</span>
                            </div>
                        </div>
                        <div className="view-enquiry__order">
                            <div className="view-enquiry__orderFrom">
                                <span>From: </span>
                                <span>{data.checkin}</span>
                            </div>
                            <div className="view-enquiry__order">
                                <span>To: </span>
                                <span>{data.checkout}</span>
                            </div>
                            <div className="view-enquiry__adults">
                                <span>Adults: </span>
                                <span>{data.adults}</span>
                            </div>
                            <div className="view-enquiry__children">
                                <span>Children: </span>
                                <span>{data.children}</span>
                            </div>
                            {data.rooms && (
                                <div className="view-enquiry__rooms">
                                    <span>Rooms: </span>
                                    <div>{data.rooms.map(room => <span>{room}</span>)}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="prompt__action">
                    <button>Cancel</button>
                    <button className="btn--primary" onClick={() => closeF("close")}>Edit</button>
                </div>
            </div>
    )
}