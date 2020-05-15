import React, {useState} from "react";
import RadioButton from "./components/selectors/RadioButton";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as yup from "yup";

export default function () {
    if (localStorage.getItem("order")) {
        const order = JSON.parse(localStorage.getItem("order"));
        console.log(order);
        const  [radio, setRadio] = useState("user");
        const { register, handleSubmit, errors } = useForm({
            validationSchema: yup.object().shape({
                firstName: yup
                    .string()
                    .matches(/[\w\s-]+/, {
                        message: "First name is not a valid name",
                        excludeEmptyString: true
                    })
                    .required("First name empty, Please fill in your First name"),
                lastName: yup
                    .string()
                    .matches(/[\w\s-]+/, {
                        message: "Last name is not a valid name",
                        excludeEmptyString: true
                    })
                    .required("Last name empty, Please fill in your Last name"),
                email: yup
                    .string()
                    .email("Email is not a valid email, please make sure you entered correct")
                    .required("Email is empty, Please fill in your email so that we can contact you"),
                cardNr:yup
                    .string()
                    .matches(/^((\n{4}\s){4})|((\n{4}){4})$/, {
                        message: "not a valid card number"
                    })
                    .required("please enter your card number"),
                ssv: yup
                    .string()
                    .matches(/\n{3}/, {
                        message: "Not a valid SVV"
                    })
            })
        });
        function _checkValid() {

        }
        function _validateLogin() {

        }
        return (
            <div className="page">
                <form className="form row" onSubmit={handleSubmit(_validateLogin)}>
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
                        <div className="form__section">
                            <button className="checkout__order btn--primary" type="submit">Check out</button>
                        </div>
                    </aside>
                    <main className="checkout__main col-8 col-m-12 row">
                        <div className="checkout__continue col-12 row">
                            <form className="checkout__selectUser col-6">
                                <div className="checkout__selectOption form__group">
                                    <label className="checkout__user form__radio"
                                           onClick={() => setRadio("user")}>
                                        <input className="checkout__userInput form__radioButton" type="radio"/>
                                        <span className="checkout__userDesign form__radioDesign">
                                        <RadioButton checked={radio === "user"}/>
                                    </span>
                                        <span className="checkout__userLabel form__radioLabel">Continue with user</span>
                                    </label>
                                </div>
                                <div className="checkout__selectOption form__group">
                                    <label className="checkout__register form__radio"
                                           onClick={() => setRadio("register")}>
                                        <input className="checkout__registerInput form__radioButton" type="radio" value="register"/>
                                        <span className="checkout__registerDesign form__radioDesign">
                                        <RadioButton checked={radio === "register"}/>
                                    </span>
                                        <span className="checkout__registerLabel form__radioLabel">Register user</span>
                                    </label>
                                </div>
                                <div className="checkout__selectOption form__group">
                                    <label className="checkout__guest form__radio"
                                           onClick={() => setRadio("guest")}>
                                        <input className="checkout__guestInput form__radioButton" type="radio" value="guest"/>
                                        <span className="checkout__guestDesign form__radioDesign">
                                        <RadioButton checked={radio === "guest"}/>
                                    </span>
                                        <span className="checkout__guestLabel form__radioLabel">Continue as Guest</span>
                                    </label>
                                </div>
                            </form>
                            <div className="checkout__selectAction col-6">
                                {radio === "user" && (
                                    <form className="checkout__login col-6">
                                        <div className="form__group">
                                            <label className="form__label" htmlFor="userName">Username</label>
                                            <input className="form__input" type="text" name="username" placeholder="username"/>
                                        </div>
                                        <div className="form__group">
                                            <label className="form__label" htmlFor="userName">Password</label>
                                            <input className="form__input" type="text" name="password" placeholder="password"/>
                                        </div>
                                        <button className="btn--primary">Log in</button>
                                    </form>
                                )}
                                {radio === "register" && (
                                    <form className="checkout__login col-6">
                                        <div className="form__group">
                                            <label className="form__label" htmlFor="userName">Username</label>
                                            <input className="form__input" type="text" name="username" placeholder="username"/>
                                        </div>
                                        <div className="form__group">
                                            <label className="form__label" htmlFor="userName">Email</label>
                                            <input className="form__input" type="email" name="email" placeholder="example@example.com"/>
                                        </div>
                                        <div className="form__group">
                                            <label className="form__label" htmlFor="password1">Password</label>
                                            <input className="form__input" type="text" name="password1" placeholder="password"/>
                                        </div>
                                        <div className="form__group">
                                            <label className="form__label" htmlFor="password2">Repeat password</label>
                                            <input className="form__input" type="text" name="password2" placeholder="password"/>
                                        </div>
                                        <button className="btn--primary">Register</button>
                                    </form>
                                )}
                                {radio === "guest" && (
                                    <div className="guestInfo">
                                        As guest you will not have access to order details and managing order, but would have to contact us trough the contact form at the <Link className="link--white" to="/contact">[Contact page]</Link> or per email at <a
                                        className="link--white" href="mailto:example@example.com">[example@example.com]</a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="checkout__payment col-10">
                            <h2>Payment Information</h2>
                            <div className="checkout__firstName form__group col-6 col-m-12">
                                <label className="checkout__firstNameLabel form__label--compact" htmlFor="firstName">First name</label>
                                <input className="checkout__firstNameInput form__input--compact" name="firstName" id="firstName" type="text" placeholder="First name" ref={register}/>
                                {errors.firstName && <p className="form__error">{errors.firstName.message}</p>}
                            </div>
                            <div className="checkout__lastName form__group col-6 col-m-12">
                                <label className="checkout__lastNameLabel form__label--compact" htmlFor="surname">Last name</label>
                                <input className="checkout__lastNameInput form__input--compact" name="lastName" id="lastName" type="text" placeholder="Last name" ref={register}/>
                                {errors.lastName && <p className="form__error">{errors.lastName.message}</p>}
                            </div>
                            <div className="checkout__email form__group">
                                <label className="checkout__emailLabel form__label--compact" htmlFor="email">Email</label>
                                <input className="checkout__emailInput form__input--compact" name="email" id="email" type="email" placeholder="example@example.com" ref={register}/>
                                {errors.email && <p className="form__error">{errors.email.message}</p>}
                            </div>
                            <div className="checkout__method form__group">
                                <label className="checkout__methodLabel form__label--compact" htmlFor="paymentMethod">Payment</label>
                                <select className="checkout__methodInput form__select--compact" name="paymentMethod">
                                    <option className="form__option" value="1">Visa</option>
                                    <option className="form__option" value="1">Mastercard</option>
                                </select>
                            </div>
                            <div className="checkout__owner form__group">
                                <label className="checkout__ownerLabel form__label--compact" htmlFor="cardOwner">Card Owner</label>
                                <input className="checkout__ownerInput form__input--compact" type="text" name="cardOwner" placeholder="Full name"/>
                            </div>
                            <div className="form__section row">
                                <div className="checkout__card form__group">
                                    <label className="checkout__cardLabel form__label--compact" htmlFor="cardNr">Card number</label>
                                    <input className="checkout__cardInput form__input--compact" type="text" name="cardNr" placeholder="1234 1234 1234 1234" value="1234 1234 1234 1234"/>
                                </div>
                                <div className="checkout__ssv form__group">
                                    <label className="checkout__ssvLabel form__label--compact" htmlFor="ssn">SSV</label>
                                    <input className="checkout__ssvInput form__input--compact" type="text" name="ssv" placeholder="123"/>
                                </div>
                            </div>
                        </div>
                    </main>
                </form>
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