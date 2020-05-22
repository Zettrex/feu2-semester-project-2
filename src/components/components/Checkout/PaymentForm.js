import React from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";

export default function (props) {
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
            paymentmethod: yup
                .string()
                .matches(/(visa|mastercard)/i, {
                    message: "not a valid option",
                    excludeEmptyString: true
                })
                .required("please select a payment method"),
            cardowner: yup
                .string()
                .matches(/\w+\s\w+/, {
                    message: "name is not valid",
                    excludeEmptyString: true
                })
                .required(),
            cardnr: yup
                .string()
                .matches(/(((\d{4}\s){3}\d{4})|(\d{16}))/, {
                    message: "not a valid card number",
                    excludeEmptyString: true
                })
                .required("please enter your card number"),
            ssv: yup
                .string()
                .matches(/\d{3}/, {
                    message: "Not a valid SVV",
                    excludeEmptyString: true
                })
        })
    });
    function _checkValid(values) {
        console.log("checkValues: ", values)
    }
    
    return (
        <form className="checkout__payment col-10" onSubmit={handleSubmit(_checkValid)}>
            <h2>Payment Information</h2>
            <div className="checkout__firstNameWrapper form__section">
                <div className="checkout__firstName form__group col-6 col-m-12">
                    <label className="checkout__firstNameLabel form__label--compact" htmlFor="firstName">First name</label>
                    <input className="checkout__firstNameInput form__input--compact" name="firstName" id="firstName" type="text" placeholder="First name" ref={register}/>
                </div>
                {errors.firstName && <p className="form__error">{errors.firstName.message}</p>}
            </div>
            <div className="checkout__lastNameWrapper form__section">
                <div className="checkout__lastName form__group col-6 col-m-12">
                    <label className="checkout__lastNameLabel form__label--compact" htmlFor="surname">Last name</label>
                    <input className="checkout__lastNameInput form__input--compact" name="lastName" id="lastName" type="text" placeholder="Last name" ref={register}/>
                </div>
                {errors.lastName && <p className="form__error">{errors.lastName.message}</p>}
            </div>
            <div className="checkout__emailWrapper form__section">
                <div className="checkout__email form__group">
                    <label className="checkout__emailLabel form__label--compact" htmlFor="email">Email</label>
                    <input className="checkout__emailInput form__input--compact" name="email" id="email" type="email" placeholder="example@example.com" ref={register}/>
                </div>
                {errors.email && <p className="form__error">{errors.email.message}</p>}
            </div>
            <div className="checkout__methodWrapper form__section">
                <div className="checkout__method form__group">
                    <label className="checkout__methodLabel form__label--compact" htmlFor="paymentmethod">Payment</label>
                    <select className="checkout__methodInput form__select--compact" name="paymentmethod" ref={register}>
                        <option className="form__option" value="visa" defaultValue>Visa</option>
                        <option className="form__option" value="mastercard">Mastercard</option>
                    </select>
                </div>
                {errors.paymentmethod && <p className="form__error">{errors.paymentmethod.message}</p>}
            </div>
            <div className="checkout__ownerWrapper form__section">
                <div className="checkout__owner form__group">
                    <label className="checkout__ownerLabel form__label--compact" htmlFor="cardowner">Card Owner</label>
                    <input className="checkout__ownerInput form__input--compact" type="text" name="cardowner" placeholder="Full name" ref={register}/>
                </div>
                {errors.cardowner && <p className="form__error">{errors.cardowner.message}</p>}
            </div>
            <div className="form__section row">
                <div className="checkout__cardNrWrapper form__section col-auto">
                    <div className="checkout__cardNr form__group">
                        <label className="checkout__cardNrLabel form__label--compact" htmlFor="cardnr">Card number</label>
                        <input className="checkout__cardNrInput form__input--compact" type="text" name="cardnr" placeholder="#### #### #### ####" defaultValue="1234 4321 1234 4321" ref={register}/>
                    </div>
                    {errors.cardnr && <p className="form__error">{errors.cardnr.message}</p>}
                </div>
                <div className="checkout__ssvWrapper form__section">
                    <div className="checkout__ssv form__group">
                        <label className="checkout__ssvLabel form__label--compact" htmlFor="ssv">SSV</label>
                        <input className="checkout__ssvInput form__input--compact" type="number" max={999} name="ssv" placeholder="123" defaultValue={987} ref={register}/>
                    </div>
                    {errors.ssv && <p className="form__error">{errors.ssv.message}</p>}
                </div>
            </div>
            <div className="form__section">
                <button className="checkout__order btn--primary" type="submit">Check out</button>
            </div>
        </form>
    )
}