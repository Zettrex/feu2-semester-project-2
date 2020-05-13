import React from "react";

export default function ({data}) {
    return (
        <div className="message-prompt prompt">
            <h2 className="h1 prompt__heading">Message</h2>
            <span className="message-prompt__caseID">{data.caseID}</span>
            <div className="row">
                <div className="message-prompt__content prompt__section col-m-12 col-t-7 col-d-9">
                    <div className="message-prompt__contact">
                        <h2 className="h3">Contact Information</h2>
                        <div className="message-prompt__name">
                            <span>Name: </span>
                            <span>{data.contact.name}</span>
                        </div>
                        <div className="message-prompt__registered">
                            <span>Registered user: </span>
                            <span>{data.contact.registered ? ("Yes"): ("No")}</span>
                        </div>
                        {data.contact.registered && (
                            <div className="message-prompt__id">
                                <span>User ID: </span>
                                <span>{data.contact.id}</span>
                            </div>
                        )}
                        <div className="message-prompt__email">
                            <span>Email: </span>
                            <span>{data.contact.email}</span>
                        </div>
                    </div>
                    <div className="message-prompt__message">
                        <h2 className="h2 message-prompt__subject">{data.subject}</h2>
                        <div className="message-prompt__content">{data.message}</div>
                    </div>
                </div>
                <div className="message-prompt__history">
                    <h3 className="h3 message-prompt__historyHeading">History</h3>
                </div>
            </div>

        </div>
    )
}