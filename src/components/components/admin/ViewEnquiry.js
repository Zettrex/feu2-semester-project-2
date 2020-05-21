import React from "react";

export default function ({data, closeF}) {
    console.log(data);
    return (
        <div className="view-enquiry view-window__content">
            <h2 className="h1 prompt__heading">Enquiry</h2>
                <div className="view-enquiry__content">
                    <div className="view-enquiry__client">
                        <h2 className="h3">Client Information</h2>
                        <div className="view-enquiry__name group">
                            <span>Name: </span>
                            <span>{data.clientName}</span>
                        </div>
                        <div className="view-enquiry__registered section group">
                            <span>Registered user: </span>
                            <span>{data.clientRegistered ? ("Yes"): ("No")}</span>
                        </div>
                        {data.clientRegistered && (
                            <div className="view-enquiry__id group">
                                <span>User ID: </span>
                                <span>{data.clientID}</span>
                            </div>
                        )}
                        <div className="view-enquiry__email group">
                            <span>Email: </span>
                            <span>{data.clientEmail}</span>
                        </div>
                    </div>
                    <div className="view-enquiry__information">
                        <div className="view-enquiry__orderInfo section">
                            <div className="view-enquiry__orderID group">
                                <span>Order: </span>
                                <span>{data.orderID}</span>
                            </div>
                            <div className="view-enquiry__orderDate ">
                                <span>Order date: </span>
                                <span>{data.orderDate}</span>
                            </div>
                        </div>
                        <div className="view-enquiry__order section">
                            <div className="view-enquiry__orderFrom group">
                                <span>From: </span>
                                <span>{data.checkin}</span>
                            </div>
                            <div className="view-enquiry__order group">
                                <span>To: </span>
                                <span>{data.checkout}</span>
                            </div>
                            <div className="view-enquiry__adults group">
                                <span>Adults: </span>
                                <span>{data.adults}</span>
                            </div>
                            <div className="view-enquiry__children group">
                                <span>Children: </span>
                                <span>{data.children}</span>
                            </div>
                            {data.rooms && (
                                <div className="view-enquiry__rooms group">
                                    {data.rooms.length > 1 ?
                                        (<span>Rooms: </span>)
                                        :
                                        (<span>Room: </span>)
                                    }
                                    <span>{data.rooms.map((room, i) => {
                                        if (i !== data.rooms.length -1) {
                                            return `${room}, `
                                        } else {
                                            return `${room}`
                                        }
                                    })}</span>
                                </div>
                            )}
                        </div>
                        <div className="view-enquiry__establishment section">
                            <div className="view-enquiry__estName group">
                                <span>Establishment: </span>
                                <span>{data.establishmentName}</span>
                            </div>
                            <div className="view-enquiry__estEmail group">
                                <span>Establishment email:</span>
                                <span>{data.establishmentEmail}</span>
                            </div>
                            <div className="view-enquiry__payment group">
                                <span>Payment Method: </span>
                                <span>{data.payMethod}</span>
                            </div>
                            <div className="view-enquiry__price group">
                                <span>Price: </span>
                                <span>{data.price} $</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="view-window__actions">
                    {/*<button className="btn--primary">Edit</button>*/}
                </div>
            </div>
    )
}