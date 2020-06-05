import React, {useState} from "react";
import PaymentForm from "./components/Checkout/PaymentForm";
import UserTypeForm from "./components/Checkout/UserTypeForm";
import OrderConfirmation from "./components/Checkout/OrderConfirmation";
import StarRating from "./components/StarRating";
import ConfirmationBox from "./ConfirmationBox";
import PropTypes from "prop-types";

export default function Checkout({user, updateUser}) {
    const [enquiry, setEnquiry] = useState({
        order: JSON.parse(localStorage.getItem("order")),
        payment: null
    });
    const [confirmed, setConfirmed] = useState(false);
    const [valid, setValid] = useState({
        order: false,
        payment: false
    });
    const [showPrompt, setShowPrompt] = useState(false);
    function _loginUser(loginInfo) {
        updateUser(loginInfo);
    }
    function togglePrompt(value) {
        setShowPrompt(value);
    }

    function _handleConfirmed(values) {
        setConfirmed(true)
        setValid({
            ...valid,
            order: true
        });
        setEnquiry({
            ...enquiry,
            order: {
                ...enquiry.order,
                ...values
            }
        });
    }
    function _handlePayment(values) {
        let enquiryUser = false;
        if (user && user.id !== "") {
            enquiryUser = user
        }
        const enquiryInfo = {
            ...enquiry,
            order: {
                ...enquiry.order,
                orderID: Math.random().toString(36).substr(2, 9),
                orderDate: new Date().toLocaleString()
            },
            payment: {
                ...enquiry.payment,
                ...values
            },
            user: enquiryUser
        };
        setValid({
            ...valid,
            payment: true
        });
        setEnquiry(enquiryInfo);
        setShowPrompt(true);
        _sendEnquiry(enquiryInfo, valid.order, true);
    }

    function _sendEnquiry(enquiry, order, payment) {
        if (order && payment) {
            return fetch("https://www.zettrex.no/Noroff/semester4/data/enquiry-success.php", {
                method: "POST",
                headers: {"Content-Type":"application/x-www-form-urlencoded"},
                body: `orderID=${encodeURIComponent(enquiry.order.orderID)}&orderDate=${encodeURIComponent(enquiry.order.orderDate)}&establishmentName=${encodeURIComponent(enquiry.order.establishmentName)}&establishmentImg=${encodeURIComponent(enquiry.order.imageUrl)}&establishmentEmail=${enquiry.order.establishmentEmail}&clientName=${encodeURIComponent(enquiry.payment.clientFirstName + " " + enquiry.payment.clientLastName)}${(enquiry.user && enquiry.user.id) ? (`&clientRegistered=${encodeURIComponent("true")}&clientID=${encodeURIComponent(enquiry.user.id)}`) : (`&clientRegistered=${encodeURIComponent("false")}&clientID=""`)}&clientEmail=${encodeURIComponent(enquiry.payment.clientEmail)}&checkin=${encodeURIComponent(enquiry.order.date1)}&checkout=${encodeURIComponent(enquiry.order.date2)}&adults=${encodeURIComponent(enquiry.order.adults)}&children=${encodeURIComponent(enquiry.order.children)}&payMethod=${encodeURIComponent(enquiry.payment.paymentMethod)}&price=${encodeURIComponent(enquiry.order.price)}`
            });
        }
    }

    if (enquiry.order) {
        return (
            <div className="page">
                {(!confirmed && !showPrompt) && (
                    <OrderConfirmation data={enquiry.order} updateConfirmed={_handleConfirmed}/>
                )}
                {(confirmed && !showPrompt) && (
                    <div className="checkout containerBox row ">
                        <aside className="checkout__aside col-10 col-l-4">
                            <div className="checkout__orderSummary">
                                <h2 className="h3 checkout__orderHeading">Order summary</h2>
                                <img className="checkout__orderImage" src={enquiry.order.imageUrl} alt={enquiry.order.establishmentName}/>
                                <div className="h4 checkout__orderName">{enquiry.order.establishmentName}</div>
                                <div className="section">
                                    <div className="checkout__OrderRating group">
                                        <span className="checkout__ratingLabel">Rating</span>
                                        <div className="checkout__ratingStars">
                                            <StarRating score={enquiry.order.rating}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="checkout__stay section">
                                    <div className="checkout__dates section">
                                        <div className="checkout__from group">
                                            <span className="checkout__fromLabel">From</span>
                                            <span className="checkout__fromTime">{enquiry.order.date1}</span>
                                        </div>
                                        <div className="checkout__to group">
                                            <span className="checkout__toLabel">To</span>
                                            <span className="checkout__toTime">{enquiry.order.date2}</span>
                                        </div>
                                    </div>
                                    <div className="checkout__people section">
                                        <div className="checkout__adults group">
                                            <span className="checkout__adultsLabel">Adults</span>
                                            <span className="checkout__adultsNumber">{enquiry.order.adults}</span>
                                        </div>
                                        <div className="checkout__children group">
                                            <span className="checkout__childrenLabel">Children</span>
                                            <span className="checkout__childrenNumber">{enquiry.order.children}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="checkout__orderPrice group">
                                    <span className="checkout__priceLabel">Price</span>
                                    <span className="checkout__price">{enquiry.order.price}$</span>
                                </div>
                            </div>
                        </aside>
                        <main className="checkout__main col-12 col-l-8 row">
                            {!user && (<UserTypeForm user={user} loginF={_loginUser}/>)}
                            <PaymentForm updatePayment={_handlePayment} data={enquiry}/>
                        </main>
                    </div>
                )}
                {showPrompt && (
                    <ConfirmationBox toHome={true} updateConfirmed={togglePrompt}>
                        <div className="row">
                            <div className="confirmation__heading col-12">
                                <h2 className="h2">Thank you for your order.</h2>
                                <p className="confirmation__aside">We wish you a nice evening, and wish you a nice stay.</p>
                            </div>
                            <div className="confirmation__left col-12 col-l-6">
                                <h3 className="h3">Order Summary</h3>
                                <div className="confirmation__section">
                                    <img className="confirmation__image" src={enquiry.order.imageUrl} alt={enquiry.order.establishmentName}/>
                                    <div className="h4">{enquiry.order.establishmentName}</div>
                                </div>
                                <div className="confirmation__section">
                                    <div className="group">
                                        <span className="confirmation__label">From </span>
                                        <span>{enquiry.order.date1}</span>
                                    </div>
                                    <div className="group">
                                        <span className="confirmation__label">To </span>
                                        <span>{enquiry.order.date2}</span>
                                    </div>
                                </div>
                                <div className="confirmation__section">
                                    <div className="group">
                                        <span className="confirmation__label">Adults </span>
                                        <span>{enquiry.order.adults}</span>
                                    </div>
                                    <div className="group">
                                        <span className="confirmation__label">Children </span>
                                        <span>{enquiry.order.children}</span>
                                    </div>
                                </div>
                                <div className="confirmation__section">
                                    <div className="group">
                                        <span className="confirmation__label">Price </span>
                                        <span>{enquiry.order.price}$</span>
                                    </div>
                                </div>
                            </div>
                            <div className="confirmation__right col-12 col-l-6">
                                <h3 className="h3">Order Information</h3>
                                <div className="confirmation__section">
                                    <div className="group">
                                        <span className="confirmation__label">Order </span>
                                        <span>{enquiry.order.orderID}</span>
                                    </div>
                                    <div className="group">
                                        <span className="confirmation__label">Order date </span>
                                        <span>{enquiry.order.orderDate}</span>
                                    </div>
                                </div>
                                <div className="confirmation__section">
                                    <div className="group">
                                        <div>Contact Establishment</div>
                                        <div>{enquiry.order.establishmentEmail}</div>
                                    </div>
                                    <div className="group">
                                        <div>Contact Us</div>
                                        <div>contact@holidaze.com</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ConfirmationBox>
                )}
            </div>
        );
    } else {
        return (
            <div className="page">
                <div className="order__error">
                    <h1>An error has occurred, you have no order selected. please </h1>
                </div>
            </div>
        );
    }
}

Checkout.propTypes = {
    user: PropTypes.object,
    updateUser: PropTypes.func.isRequired
}