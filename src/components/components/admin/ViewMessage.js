import React from "react";

export default function ({data}) {
    return (
        <div className="view-message view-window__content">
            <div className="group col-auto">
                <h2 className="h1 prompt__heading">Message</h2>
                <div className="view-message__caseID">
                    <span>CaseID: </span>
                    <span>{data.caseID}</span>
                </div>
            </div>
            <div className="row">
                <div className="view-message__information section col-4 col-m-12">
                    <div className="view-message__contact">
                        <h2 className="h3">Contact Information</h2>
                        <div className="view-message__name group">
                            <span>Name: </span>
                            <span>{data.clientName}</span>
                        </div>
                        <div className="view-message__registered group">
                            <span>Registered user: </span>
                            <span>{data.clientRegistered ? ("Yes") : ("No")}</span>
                        </div>
                        {data.clientRegistered && (
                            <div className="view-message__id group">
                                <span>User ID: </span>
                                <span>{data.clientID}</span>
                            </div>
                        )}
                        <div className="view-message__mail group">
                            <span>Mail: </span>
                            <span>{data.clientEmail}</span>
                        </div>
                    </div>
                </div>
                <div className="view-message__message section col-8 col-m-12">
                    <h2 className="h3 view-message__subject">{data.subject.charAt(0).toUpperCase() + data.subject.slice(1)}</h2>
                    <div className="view-message__content">{data.message}</div>
                </div>
            </div>
            <div className="view-window__actions">
                <a className="btn--primary" href={`mailto:${data.clientMail}`}>Reply</a>
            </div>
        </div>
    )
}