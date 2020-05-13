import React from "react";
import EnquiryItem from "./components/admin/EnquiryItem";
import MessageItem from "./components/admin/MessageItem";
import EstablishmentItem from "./components/admin/EstablishmentItem";

export default function ({enquiries, messages, establishments}) {
    return (
        <div className="page">
            <main className="admin__inbox row">
                <div className="admin__enquiries admin__section col-6 col-m-12">
                    <h2 className="h2 admin__enquiriesHeading">Enquiries</h2>
                    <div className="admin__list">
                        {enquiries && enquiries.map(enquiry => <EnquiryItem enquiry={enquiry}/>)}
                    </div>
                </div>
                <div className="admin__messages admin__section col-6 col-m-12">
                    <h2 className="h2 admin__messagesHeading">Messages</h2>
                    <div className="admin__list">
                        {messages && messages.map(message => <MessageItem message={message}/>)}
                    </div>
                </div>
            </main>
            <aside className="admin__establishments admin__section">
                <h2 className="h2 admin__establishmentsHeading">Establishments</h2>
                <div className="row">
                    <form className="admin__establishmentsFilter form col-12 col-t-5 col-d-3">
                        <div className="admin__filterName">
                            <label className="admin__filterNameLabel form__label" htmlFor="establishmentName">Name of establishment</label>
                            <input className="admin__filterNameInput form__input" type="text"/>
                        </div>
                        <div className="admin__filterType">
                            <label className="admin__filterTypeLabel form__label" htmlFor="establishmentName">Type of establishment</label>
                            <select className="admin__filterTypeInput form__input">
                                <option className="form__option" value="hotel">Hotel</option>
                                <option className="form__option" value="bnb">B&B</option>
                                <option className="form__option" value="house">House</option>
                                <option className="form__option" value="cabin">Cabin</option>
                            </select>
                        </div>
                        <div className="admin__filterLocation">
                            <label className="admin__filterLocationLabel form__label" htmlFor="establishmentName">Location of establishment</label>
                            <select className="admin__filterLocationInput form__input">
                                <option className="form__option" value="aasene">Åsane</option>
                                <option className="form__option" value="sotra">Sotra</option>
                                <option className="form__option" value="sentrum">Sentrum</option>
                                <option className="form__option" value="minde">Minde</option>
                            </select>
                        </div>
                    </form>
                    <div className="admin__establishmentsList admin__list col-12 col-t-7 col-d-9">
                        {establishments && establishments.map(establishment => <EstablishmentItem establishment={establishment}/>)}
                    </div>
                </div>
            </aside>
        </div>
    )
}