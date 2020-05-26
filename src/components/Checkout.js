import React, {useEffect, useState} from "react";
import PaymentForm from "./components/Checkout/PaymentForm";
import UserTypeForm from "./components/Checkout/UserTypeForm";
import OrderConfirmation from "./components/Checkout/OrderConfirmation";
import {v4 as uuidv4} from "uuid";

export default function () {
    const [enquiry, setEnquiry] = useState({
        order: JSON.parse(localStorage.getItem("order")),
        payment: null
    })
    const [user, setUser] = useState();
    const [confirmed, setConfirmed] = useState(false);
    const [valid, setValid] = useState({
        order: false,
        payment: false
    })
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, [])
    function _loginUser(loginInfo) {
        const userInfo = {
            username: loginInfo.username,
            clientRegistered: true,
            clientID: uuidv4(),
            clientEmail: loginInfo.email
        }
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
    }

    function _handleConfirmed(values) {
        setConfirmed(true)
        setValid({
            ...valid,
            order: true
        })
        setEnquiry({
            ...enquiry,
            order: {
                ...enquiry.order,
                ...values
            }
        });
    }
    function _handlePayment(values) {
        const enquiryInfo = {
            ...enquiry,
            payment: {
                ...enquiry.payment,
                ...values
            },
            user: user
        }
        setValid({
            ...valid,
            payment: true
        })
        setEnquiry(enquiryInfo);
        _sendEnquiry(enquiryInfo, valid.order, true);
    }

    function _sendEnquiry(enquiry, order, payment) {
        console.log("inside Send: ", enquiry.user.clientRegistered);
        if (order && payment) {
            return fetch("http://localhost:8888/enquiry-success.php", {
                method: "POST",
                headers: {"Content-Type":"application/x-www-form-urlencoded"},
                body: `orderID=${encodeURIComponent(Math.random().toString(36).substr(2, 9))}&orderDate=${encodeURIComponent(JSON.stringify(new Date()))}&establishmentName=${encodeURIComponent(enquiry.order.establishmentName)}&establishmentImg=${encodeURIComponent(enquiry.order.imageUrl)}&establishmentEmail=${enquiry.order.establishmentEmail}&clientName=${encodeURIComponent(enquiry.payment.clientFirstName + " " + enquiry.payment.clientLastName)}${enquiry.user.clientRegistered ? (`&clientRegistered=${true}&clientID=${encodeURIComponent(enquiry.user.clientID)}`) : `&clientRegistered=${false}&clientID=${null}`}&clientEmail=${encodeURIComponent(enquiry.payment.clientEmail)}&checkin=${encodeURIComponent(enquiry.order.date1)}&checkout=${encodeURIComponent(enquiry.order.date2)}&adults=${encodeURIComponent(enquiry.order.adults)}&children=${encodeURIComponent(enquiry.order.children)}&payMethod=${encodeURIComponent(enquiry.payment.paymentMethod)}&price=${encodeURIComponent(enquiry.order.price)}`
            })
        }
    }

    if (enquiry.order) {
        console.log(enquiry);
        return (
            <div className="page">
                {!confirmed && (
                    <OrderConfirmation data={enquiry.order} updateConfirmed={_handleConfirmed}/>
                )}
                {confirmed && (
                    <div className="row">
                        <aside className="checkout__aside col-4 col-m-12">
                            <div className="checkout__orderSummary">
                                <h3 className="h3--white checkout__orderHeading">Order summary</h3>
                                <img className="checkout__orderImage" src={enquiry.order.imageUrl} alt={enquiry.order.establishmentName}/>
                                <span className="checkout__orderName">{enquiry.order.establishmentName}</span>
                                <div className="checkout__OrderRating">
                                    <span className="checkout__orderRatingLabel">Rating</span>
                                    <div className="checkout__orderRatingStars">
                                        X X X X X
                                    </div>
                                </div>
                                <div className="checkout__stay">
                                    <div className="checkout__from">
                                        <span className="checkout__fromLabel">From</span>
                                        <span className="checkout__fromTime">{enquiry.order.date1}</span>
                                    </div>
                                    <div className="checkout__to">
                                        <span className="checkout__toLabel">To</span>
                                        <span className="checkout__toTime">{enquiry.order.date2}</span>
                                    </div>
                                    <div className="checkout__adults">
                                        <span className="checkout__adultsLabel">Adults</span>
                                        <span className="checkout__adultsNumber">{enquiry.order.adults}</span>
                                    </div>
                                    <div className="checkout__children">
                                        <span className="checkout__childrenLabel">Children</span>
                                        <span className="checkout__childrenNumber">{enquiry.order.children}</span>
                                    </div>
                                </div>
                                <div className="checkout__orderPrice">
                                    <span className="checkout__priceLabel">Price</span>
                                    <span className="checkout__price">{enquiry.order.price}$</span>
                                </div>
                            </div>
                        </aside>
                        <main className="checkout__main col-8 col-m-12 row">
                            <UserTypeForm user={user} loginF={_loginUser}/>
                            <PaymentForm updatePayment={_handlePayment}/>
                        </main>
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <div className="page">
                <div className="order__error">
                    <h1>An error has occurred, you have no order selected. please </h1>
                </div>
            </div>
        )
    }
}