import React, {useEffect, useState} from "react";
import PaymentForm from "./components/Checkout/PaymentForm";
import UserTypeForm from "./components/Checkout/UserTypeForm";
import OrderConfirmation from "./components/Checkout/OrderConfirmation";
import {v4 as uuidv4} from "uuid";

export default function () {
    const [enquiry, setEnquiry] = useState({
        user: {
            username: "",

        },
        order: JSON.parse(localStorage.getItem("order")),
        payment: {
            fullname: "",
            email: "",
            payMethod: "",
            cardOwner: "",
            cardNr: "",
            svv: ""
        }
    })
    const [user, setUser] = useState();
    const [confirmed, setConfirmed] = useState(false);
    const [valid, setValid] = useState({
        order: false,
        payment: false
    })
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    },[]);
    function _loginUser(userInfo) {
        const user = {
            username: userInfo.username,
            clientRegistered: true,
            clientID: uuidv4(),
            clientEmail: userInfo.email
        }
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setEnquiry({
            ...enquiry,
            user: user
        })
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
                values
            }
        });
        _sendEnquiry();
    }
    function _handlePayment(values) {
        setValid({
            ...valid,
            payment: true
        })
        setEnquiry({
            ...enquiry,
            payment: {
                ...enquiry.payment,
                values
            }
        });
        _sendEnquiry();
    }

    function _sendEnquiry() {
        if (valid.order && valid.payment) {
            return fetch("http://localhost:8888/enquiry-success.php", {
                method: "POST",
                headers: {"Content-Type":"application/x-www-form-urlencoded"},
                body: `orderID=${encodeURIComponent(Math.random().toString(36).substr(2, 9))}&orderDate=${encodeURIComponent(JSON.stringify(new Date()))}&establishment=${encodeURIComponent(enquiry.order.establishmentName)}&establishmentEmail=${enquiry.enquiry.order.establishmentEmail}&clientName=${encodeURIComponent(enquiry.payment.clientFirstName + " " + enquiry.payment.clientLastName)}&clientRegistered=${encodeURIComponent(enquiry.payment.clientRegistered)}&clientID=${encodeURIComponent(enquiry.payment.clientID)}&clientEmail=${encodeURIComponent(enquiry.payment.clientEmail)}&checkin=${encodeURIComponent(enquiry.order.date1)}&checkout=${encodeURIComponent(enquiry.order.date2)}&adults=${encodeURIComponent(enquiry.order.adults)}&children=${encodeURIComponent(enquiry.order.children)}&payMethod=${encodeURIComponent(enquiry.payment.paymentMethod)}&price=${encodeURIComponent(enquiry.order.price)}`
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
                                        <span className="checkout__fromTime">27/04-2020</span>
                                    </div>
                                    <div className="checkout__to">
                                        <span className="checkout__toLabel">To</span>
                                        <span className="checkout__toTime">28/04-2020</span>
                                    </div>
                                    <div className="checkout__adults">
                                        <span className="checkout__adultsLabel">Adults</span>
                                        <span className="checkout__adultsNumber">2</span>
                                    </div>
                                    <div className="checkout__children">
                                        <span className="checkout__childrenLabel">Children</span>
                                        <span className="checkout__childrenNumber">0</span>
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