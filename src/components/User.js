import React, {useEffect, useState} from "react";
import EnquiryItem from "./components/admin/EnquiryItem";
import MessageItem from "./components/admin/MessageItem";
import EstablishmentItem from "./components/admin/EstablishmentItem";
import ViewEnquiry from "./components/admin/ViewEnquiry";
import ViewMessage from "./components/admin/ViewMessage";
import ViewEstablishment from "./components/admin/ViewEstablishment";
import ConfirmationBox from "./ConfirmationBox";

export default function ({enquiries, messages, establishments}) {
    const [showAdmin, setShowAdmin] = useState("none");
    const [target, setTarget] = useState();
    const [showConfirmation, setShowConfirmation] = useState(true);
    const [view, setView] = useState({
        viewData: {},
        viewWindow: false,
        blurBackground: false,
        enquiry: false,
        message: false,
        establishment: false,
        confirmation: false,
        job: ""
    });
    useEffect(() => {
        if (target && showAdmin !== "establishments") {
            window.scrollTo(0,target.offsetTop-60);
        } else if (target && showAdmin === "establishments") {
            window.scrollTo(0,target.offsetTop+190);
        }
    }, [target, showAdmin]);
    function toggleAdmin (target, elem) {
        if (showAdmin !== elem && showAdmin !== "all") {
            setShowAdmin(elem);
            setTarget(target)
        } else if (showAdmin !== "all") {
            setShowAdmin("none");
        }
    }
    function toggleConfirmation (value) {
        setShowConfirmation(value);
    }
    useEffect(() => {
        setResponsive();
    })
    function setResponsive () {
        if (Math.max(
            window.innerWidth,
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth
        ) >= 900) {
            setShowAdmin("all");
        } else {
            if (showAdmin === "all") {
                setShowAdmin("none");
            }
        }
    }
    window.onresize = () => {
        setResponsive();
    }
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
        toggleConfirmation(false);
    }

    return (
        <div className="page">
            {!showConfirmation && (
                <div className="page__wrapper">
                    <main className="admin__inbox row">
                        {(showAdmin === "all" || showAdmin === "enquires") ? (
                            <div id="enquiries" className="admin__enquiries admin__section col-6 col-m-12">
                                <button className="admin__showMore" onClick={event => toggleAdmin(event.target,"enquires")}>
                                    <h2 className="h2 admin__enquiriesHeading">Enquiries <i className="fas fa-angle-up admin__showMore--indicator"/></h2>
                                </button>
                                <div className="admin__list admin__content">
                                    {enquiries && enquiries.map((enquiry, i) => <EnquiryItem key={enquiry.orderID} odd={!((i+1) % 2 === 0)} enquiry={enquiry} openF={handleWindow}/>)}
                                </div>
                            </div>
                        ) : (
                            <div id="enquiries" className="admin__enquiries admin__section col-6 col-m-12">
                                <button className="admin__showMore" onClick={event => toggleAdmin(event.target,"enquires")}>
                                    <h2 className="h2 admin__enquiriesHeading">Enquiries <i className="fas fa-angle-down admin__showMore--indicator"/></h2>
                                </button>
                                <div className="admin__list admin__content--hidden">
                                    {enquiries && enquiries.map((enquiry, i) => <EnquiryItem key={enquiry.orderID} odd={!((i+1) % 2 === 0)} enquiry={enquiry} openF={handleWindow}/>)}
                                </div>
                            </div>
                        )}
                        {(showAdmin === "all" || showAdmin === "messages") ? (
                            <div id="messages" className="admin__messages admin__section col-6 col-m-12">
                                <button className="admin__showMore" onClick={event => toggleAdmin(event.target,"messages")}>
                                    <h2 className="h2 admin__messagesHeading">Messages <i className="fas fa-angle-up admin__showMore--indicator"/></h2>
                                </button>
                                <div className="admin__list admin__content">
                                    {messages && messages.map((message, i) => <MessageItem key={message.caseID} odd={!((i+1) % 2 === 0)} message={message} openF={handleWindow}/>)}
                                </div>
                            </div>
                        ) : (
                            <div id="messages" className="admin__messages admin__section col-6 col-m-12">
                                <button className="admin__showMore" onClick={event => toggleAdmin(event.target,"messages")}>
                                    <h2 className="h2 admin__messagesHeading">Messages <i className="fas fa-angle-down admin__showMore--indicator"/></h2>
                                </button>
                                <div className="admin__list admin__content--hidden">
                                    {messages && messages.map((message, i) => <MessageItem key={message.caseID} odd={!((i+1) % 2 === 0)} message={message} openF={handleWindow}/>)}
                                </div>
                            </div>
                        )}
                    </main>
                    {(showAdmin === "all" || showAdmin === "establishments") ? (
                        <aside id="establishments" className="admin__establishments admin__section col-12">
                            <button className="admin__showMore" onClick={event => toggleAdmin(event.target,"establishments")}>
                                <h2 className="h2 admin__establishmentsHeading">Establishments <i className="fas fa-angle-up admin__showMore--indicator"/></h2>
                            </button>
                            <div className="admin__establishmentContent admin__content row">
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
                    ) : (
                        <aside id="establishments" className="admin__establishments admin__section col-12">
                            <button className="admin__showMore" onClick={event => toggleAdmin(event.target,"establishments")}>
                                <h2 className="h2 admin__establishmentsHeading">Establishments <i className="fas fa-angle-down admin__showMore--indicator"/></h2>
                            </button>
                            <div className="admin__establishmentContent admin__content--hidden row">
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
                    )}
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
            )}
            {showConfirmation && (<ConfirmationBox updateConfirmed={toggleConfirmation}>
                <div className="confirmation__checkWrapper">
                    <i className="far fa-check-circle confirmation__check"/>
                </div>
                <div className="confirmation__section">
                    <h2 className="confirmation__heading--center h2">Order Successfully {view.job === "add" && "added"}{view.job === "edit" && "edited"}</h2>
                </div>
            </ConfirmationBox>)}
        </div>
    )
}