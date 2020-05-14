import React from "react";

export default function ({data}) {
    return (
        <div className="view-message">
            <h2 className="h1 prompt__heading">Message</h2>
            <span className="view-message__caseID">{data.caseID}</span>
            <div className="row">
                <div className="view-message__content prompt__section col-4 col-m-12">
                    <div className="view-message__contact">
                        <h2 className="h3">Contact Information</h2>
                        <div className="view-message__name">
                            <span>Name: </span>
                            <span>{data.clientName}</span>
                        </div>
                        <div className="view-message__registered">
                            <span>Registered user: </span>
                            <span>{data.clientRegistered ? ("Yes") : ("No")}</span>
                        </div>
                        {data.clientRegistered && (
                            <div className="view-message__id">
                                <span>User ID: </span>
                                <span>{data.clientID}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="view-message__message col-8 col-m-12">
                    <h3 className="h2 view-message__subject">{data.subject}</h3>
                    <div className="view-message__content">{data.message}</div>
                </div>
            </div>

        </div>
    )
}