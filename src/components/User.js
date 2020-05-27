import React, {useState} from "react";
import EnquiryItem from "./components/admin/EnquiryItem";
import MessageItem from "./components/admin/MessageItem";
import EstablishmentItem from "./components/admin/EstablishmentItem";
import ViewEnquiry from "./components/admin/ViewEnquiry";
import ViewMessage from "./components/admin/ViewMessage";
import ViewEstablishment from "./components/admin/ViewEstablishment";

export default function ({enquiries, messages, establishments}) {
    const [view, setView] = useState({
        viewData: {},
        viewWindow: false,
        blurBackground: false,
        enquiry: false,
        message: false,
        establishment: false,
        job: ""
    });

    function handleFilter() {

    }

    function handleWindow(action, window, data, job) {
        if (action === "close") {
            setView({
                ...view,
                viewWindow: false,
                blurBackground: false,
                enquiry: false,
                message: false,
                establishment: false,
                job: ""
            })
        } else if (action === "open") {
            switch (window) {
                case "enquiry":
                    setView({
                        ...view,
                        viewData: data,
                        viewWindow: true,
                        blurBackground: true,
                        enquiry: true,
                        job: job
                    });
                    break;
                case "message":
                    setView({
                        ...view,
                        viewData: data,
                        viewWindow: true,
                        blurBackground: true,
                        message: true,
                        job: job
                    });
                    break;
                case "establishment":
                    setView({
                        ...view,
                        viewData: data,
                        viewWindow: true,
                        blurBackground: true,
                        establishment: true,
                        job: job
                    });
                    break;
                default:
                    setView({
                        ...view,
                        viewWindow: false,
                        blurBackground: false,
                        enquiry: false,
                        message: false,
                        establishment: false,
                        job: ""
                    });
                    console.log("Something unexpected occurred, tried to open none-valid item");
                    break;
            }
        }
        console.log("handle", view);
    }
    return (
        <div className="page">
            <main className="admin__inbox row">
                <div className="admin__enquiries admin__section col-6 col-m-12">
                    <h2 className="h2 admin__enquiriesHeading">Enquiries</h2>
                    <div className="admin__list">
                        {enquiries && enquiries.map((enquiry, i) => <EnquiryItem key={enquiry.orderID} odd={!((i+1) % 2 === 0)} enquiry={enquiry} openF={handleWindow}/>)}
                    </div>
                </div>
                <div className="admin__messages admin__section col-6 col-m-12">
                    <h2 className="h2 admin__messagesHeading">Messages</h2>
                    <div className="admin__list">
                        {messages && messages.map((message, i) => <MessageItem key={message.caseID} odd={!((i+1) % 2 === 0)} message={message} openF={handleWindow}/>)}
                    </div>
                </div>
            </main>
            <aside className="admin__establishments admin__section">
                <h2 className="h2 admin__establishmentsHeading">Establishments</h2>
                <div className="row">
                    <div className="admin__establishmentsAction row" onClick={() => handleWindow("open", "establishment", "", "add")}>
                        <span className="admin__establishmentsAddLabel">Add</span>
                        <button className="admin__establishmentsAdd btn--primary">+</button>
                    </div>
                    <form className="admin__establishmentsFilter form col-12 col-t-5 col-d-3" onChange={handleFilter}>
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
                        {establishments && establishments.map((establishment, i) => <EstablishmentItem key={establishment.establishmentID} odd={!((i+1) % 2 === 0)} establishment={establishment} openF={handleWindow}/>)}
                    </div>
                </div>
            </aside>
            {view.blurBackground && (
                <div className="blurBackground"/>
            )}
            {view.viewWindow && (
                <div className="view-window containerBox">
                    <div className="view-window__topBar">
                        <button className="btn--close" onClick={() => handleWindow("close")}>X</button>
                    </div>
                    {view.enquiry && (<ViewEnquiry data={view.viewData} closeF={handleWindow}/>)}
                    {view.message && (<ViewMessage data={view.viewData} closeF={handleWindow}/>)}
                    {view.establishment && (<ViewEstablishment data={view.viewData} closeF={handleWindow} job={view.job}/>)}
                </div>
            )}
        </div>
    )
}