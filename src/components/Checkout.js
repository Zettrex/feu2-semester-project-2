import React from "react";
import PaymentForm from "./components/Checkout/PaymentForm";
import UserTypeForm from "./components/Checkout/UserTypeForm";

export default function () {
    if (localStorage.getItem("order")) {
        const order = JSON.parse(localStorage.getItem("order"));
        console.log(order);
        return (
            <div className="page">
                <div className="form row">
                    <aside className="checkout__aside col-4 col-m-12">
                        <div className="checkout__orderSummary">
                            <h3 className="h3--white checkout__orderHeading">Order summary</h3>
                            <img className="checkout__orderImage" src={order.imageUrl} alt={order.establishmentName}/>
                            <span className="checkout__orderName">{order.establishmentName}</span>
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
                                <span className="checkout__price">{order.price}$</span>
                            </div>
                        </div>
                    </aside>
                    <main className="checkout__main col-8 col-m-12 row">
                        <UserTypeForm/>
                        <PaymentForm/>
                    </main>
                </div>
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