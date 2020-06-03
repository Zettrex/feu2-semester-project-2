import React, {useEffect, useState} from "react";
import EnquiryItem from "./components/admin/EnquiryItem";
import MessageItem from "./components/admin/MessageItem";
import EstablishmentItem from "./components/admin/EstablishmentItem";
import ViewEnquiry from "./components/admin/ViewEnquiry";
import ViewMessage from "./components/admin/ViewMessage";
import ViewEstablishment from "./components/admin/ViewEstablishment";
import ConfirmationBox from "./ConfirmationBox";
import PropTypes from "prop-types";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import SearchBox from "./components/filters/SearchBox";
import {_filterEstablishments} from "../functions/handleEstablishmentForm";

export default function User({enquiries, messages, establishments}) {
    const [showAdmin, setShowAdmin] = useState("none");
    const [target, setTarget] = useState();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [data, setData] = useState({
        oEstablishment: establishments,
        fEstablishment: establishments
    })
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
            window.scroll({
                top: target.offsetTop-60,
                left: 0,
                behavior: "smooth"
            })
        } else if (target && showAdmin === "establishments") {
            window.scroll({
                top: target.offsetTop+260,
                left: 0,
                behavior: "smooth"
            })
        }
    }, [target, showAdmin]);
    const {register, getValues, errors} = useForm({
        validationSchema : yup.object().shape({
            search: yup
                .string(),
        })
    });


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
    function _updateData(newData) {
        setData({
            ...data,
            fEstablishment: newData
        })
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
                        viewData: null,
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
        toggleConfirmation(false);
    }

    return (
        <div className="page">
            {!showConfirmation && (
                <div className="page__wrapper">
                    <div className="admin__inbox row">
                        {(showAdmin === "all" || showAdmin === "enquires") ? (
                            <div id="enquiries" className="admin__enquiries admin__section col-6 col-s-12">
                                <button className="admin__showMore" onClick={event => toggleAdmin(event.target,"enquires")}>
                                    <h2 className="h2 admin__enquiriesHeading">Enquiries <i className="fas fa-angle-up admin__showMore--indicator"/></h2>
                                </button>
                                <div className="admin__list admin__content">
                                    {enquiries && enquiries.map((enquiry, i) => <EnquiryItem key={enquiry.orderID} odd={!((i+1) % 2 === 0)} enquiry={enquiry} openF={handleWindow}/>)}
                                </div>
                            </div>
                        ) : (
                            <div id="enquiries" className="admin__enquiries admin__section col-6 col-s-12">
                                <button className="admin__showMore" onClick={event => toggleAdmin(event.target,"enquires")}>
                                    <h2 className="h2 admin__enquiriesHeading">Enquiries <i className="fas fa-angle-down admin__showMore--indicator"/></h2>
                                </button>
                                <div className="admin__list admin__content--hidden">
                                    {enquiries && enquiries.map((enquiry, i) => <EnquiryItem key={enquiry.orderID} odd={!((i+1) % 2 === 0)} enquiry={enquiry} openF={handleWindow}/>)}
                                </div>
                            </div>
                        )}
                        {(showAdmin === "all" || showAdmin === "messages") ? (
                            <div id="messages" className="admin__messages admin__section col-6 col-s-12">
                                <button className="admin__showMore" onClick={event => toggleAdmin(event.target,"messages")}>
                                    <h2 className="h2 admin__messagesHeading">Messages <i className="fas fa-angle-up admin__showMore--indicator"/></h2>
                                </button>
                                <div className="admin__list admin__content">
                                    {messages && messages.map((message, i) => <MessageItem key={message.caseID} odd={!((i+1) % 2 === 0)} message={message} openF={handleWindow}/>)}
                                </div>
                            </div>
                        ) : (
                            <div id="messages" className="admin__messages admin__section col-6 col-s-12">
                                <button className="admin__showMore" onClick={event => toggleAdmin(event.target,"messages")}>
                                    <h2 className="h2 admin__messagesHeading">Messages <i className="fas fa-angle-down admin__showMore--indicator"/></h2>
                                </button>
                                <div className="admin__list admin__content--hidden">
                                    {messages && messages.map((message, i) => <MessageItem key={message.caseID} odd={!((i+1) % 2 === 0)} message={message} openF={handleWindow}/>)}
                                </div>
                            </div>
                        )}
                    </div>
                    {(showAdmin === "all" || showAdmin === "establishments") ? (
                        <div id="establishments" className="admin__establishments admin__section">
                            <button className="admin__showMore" onClick={event => toggleAdmin(event.target,"establishments")}>
                                <h2 className="h2 admin__establishmentsHeading">Establishments <i className="fas fa-angle-up admin__showMore--indicator"/></h2>
                            </button>
                            <div className="admin__establishmentContent admin__content">
                                <div className="admin__establishmentsAction row" onClick={() => handleWindow("open", "establishment", "", "add")}>
                                    <span className="admin__establishmentsAddLabel">Add</span>
                                    <button className="admin__establishmentsAdd btn--primary">+</button>
                                </div>
                                <form className="admin__establishmentsFilter form" onChange={() => {
                                    const values = getValues();
                                    _filterEstablishments(data.oEstablishment, _updateData, values)
                                }}>
                                    <SearchBox className="admin-est" data={establishments} Ref={register} errors={errors} results={false}/>
                                </form>
                                <div className="admin__establishmentsList admin__list row">
                                    {data.fEstablishment && data.fEstablishment.map((establishment, i) => <EstablishmentItem key={establishment.establishmentID} odd={((((i+1) % 4) / 4 === 0.75) || (((i+1) % 4) / 4 === 0))} establishment={establishment} openF={handleWindow}/>)}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <aside id="establishments" className="admin__establishments admin__section">
                            <button className="admin__showMore" onClick={event => toggleAdmin(event.target,"establishments")}>
                                <h2 className="h2 admin__establishmentsHeading">Establishments <i className="fas fa-angle-down admin__showMore--indicator"/></h2>
                            </button>
                            <div className="admin__establishmentContent admin__content--hidden">
                                <div className="admin__establishmentsAction row" onClick={() => handleWindow("open", "establishment", "", "add")}>
                                    <span className="admin__establishmentsAddLabel">Add</span>
                                    <button className="admin__establishmentsAdd btn--primary">+</button>
                                </div>
                                <form className="admin__establishmentsFilter form" onChange={() => {
                                    const values = getValues();
                                    _filterEstablishments(data.oEstablishment, _updateData, values)
                                }}>
                                    <SearchBox className="admin-est" data={establishments} Ref={register} errors={errors} results={false}/>
                                </form>
                                <div className="admin__establishmentsList admin__list row">
                                    {data.fEstablishment && data.fEstablishment.map((establishment, i) => <EstablishmentItem key={establishment.establishmentID} odd={((((i+1) % 4) / 4 === 0.75) || (((i+1) % 4) / 4 === 0))} establishment={establishment} openF={handleWindow}/>)}
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

User.propTypes = {
    messages: PropTypes.array.isRequired,
    enquiries: PropTypes.array.isRequired,
    establishments: PropTypes.array.isRequired,
}