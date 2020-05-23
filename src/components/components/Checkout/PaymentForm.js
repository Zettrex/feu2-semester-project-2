import React from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";

export default function ({updatePayment}) {
    const { register, handleSubmit, errors } = useForm({
        validationSchema: yup.object().shape({
            clientFirstName: yup
                .string()
                .matches(/[\w\s-]+/, {
                    message: "First name is not a valid name",
                    excludeEmptyString: true
                })
                .required("First name empty, Please fill in your First name"),
            clientLastName: yup
                .string()
                .matches(/[\w\s-]+/, {
                    message: "Last name is not a valid name",
                    excludeEmptyString: true
                })
                .required("Last name empty, Please fill in your Last name"),
            clientEmail: yup
                .string()
                .email("Email is not a valid email, please make sure you entered correct")
                .required("Email is empty, Please fill in your email so that we can contact you"),
            paymentMethod: yup
                .string()
                .matches(/(visa|mastercard)/i, {
                    message: "not a valid option",
                    excludeEmptyString: true
                })
                .required("please select a payment method"),
            cardOwner: yup
                .string()
                .matches(/\w+\s\w+/, {
                    message: "name is not valid",
                    excludeEmptyString: true
                })
                .required(),
            cardNr: yup
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
        updatePayment(values)
    }
    
    return (
        <form className="checkout__payment col-10" onSubmit={handleSubmit(_checkValid)}>
            <h2>Payment Information</h2>
            <div className="checkout__firstNameWrapper form__section">
                <div className="checkout__firstName form__group col-6 col-m-12">
                    <label className="checkout__firstNameLabel form__label--compact" htmlFor="clientFirstName">First name</label>
                    <input className="checkout__firstNameInput form__input--compact" name="clientFirstName" id="clientFirstName" type="text" placeholder="First name" ref={register}/>
                </div>
                {errors.clientFirstName && <p className="form__error">{errors.clientFirstName.message}</p>}
            </div>
            <div className="checkout__lastNameWrapper form__section">
                <div className="checkout__lastName form__group col-6 col-m-12">
                    <label className="checkout__lastNameLabel form__label--compact" htmlFor="clientLastName">Last name</label>
                    <input className="checkout__lastNameInput form__input--compact" name="clientLastName" id="clientLastName" type="text" placeholder="Last name" ref={register}/>
                </div>
                {errors.clientLastName && <p className="form__error">{errors.clientLastName.message}</p>}
            </div>
            <div className="checkout__emailWrapper form__section">
                <div className="checkout__email form__group">
                    <label className="checkout__emailLabel form__label--compact" htmlFor="clientEmail">Email</label>
                    <input className="checkout__emailInput form__input--compact" name="clientEmail" id="clientEmail" type="email" placeholder="example@example.com" ref={register}/>
                </div>
                {errors.clientEmail && <p className="form__error">{errors.clientEmail.message}</p>}
            </div>
            <div className="checkout__methodWrapper form__section">
                <div className="checkout__method form__group">
                    <label className="checkout__methodLabel form__label--compact" htmlFor="paymentMethod">Payment</label>
                    <select className="checkout__methodInput form__select--compact" name="paymentMethod" ref={register}>
                        <option className="form__option" value="visa" defaultValue>Visa</option>
                        <option className="form__option" value="mastercard">Mastercard</option>
                    </select>
                </div>
                {errors.paymentMethod && <p className="form__error">{errors.paymentMethod.message}</p>}
            </div>
            <div className="checkout__ownerWrapper form__section">
                <div className="checkout__owner form__group">
                    <label className="checkout__ownerLabel form__label--compact" htmlFor="cardOwner">Card Owner</label>
                    <input className="checkout__ownerInput form__input--compact" type="text" name="cardOwner" placeholder="Full name" ref={register}/>
                </div>
                {errors.cardOwner && <p className="form__error">{errors.cardOwner.message}</p>}
            </div>
            <div className="form__section row">
                <div className="checkout__cardNrWrapper form__section col-auto">
                    <div className="checkout__cardNr form__group">
                        <label className="checkout__cardNrLabel form__label--compact" htmlFor="cardNr">Card number</label>
                        <input className="checkout__cardNrInput form__input--compact" type="text" name="cardNr" placeholder="#### #### #### ####" defaultValue="1234 4321 1234 4321" ref={register}/>
                    </div>
                    {errors.cardNr && <p className="form__error">{errors.cardNr.message}</p>}
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