import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import ConfirmationBox from "./ConfirmationBox";

export default function () {
    const [contact, setContact] = useState({});
    const [confirmation, setConfirmation] = useState(true);
    const [duplicateMessage, setDuplicateMessage] = useState(false);
    const [user, setUser] = useState();
    const [caseID, setCaseID] = useState();
    useEffect(() => {
        if (localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, [])

    function updateConfirmed(data) {
        setConfirmation(data);
    }

    function _sendForm(data) {
        if (JSON.stringify(contact) !== JSON.stringify(data)) { //work around due to shallow compare
            let registered = false;
            if (user.id) {
                registered = true
            }
            const contact = {
                caseID: `${Math.random().toString(36).substr(2, 6)}`,
                clientName: `${data.firstName} ${data.lastName}`,
                clientRegistered: registered,
                clientID: user.clientID,
                clientEmail: data.email,
                subject: data.subject,
                message: data.message
            };
            fetch("https://www.zettrex.no/Noroff/semester4/data/contact-success.php", {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: `clientName=${encodeURIComponent(contact.clientName)}&clientRegistered=${encodeURIComponent(contact.clientRegistered)}&clientID=${contact.clientID}&clientEmail=${encodeURIComponent(contact.clientEmail)}&subject=${encodeURIComponent(contact.subject)}&message=${encodeURIComponent(contact.message)}`
            })
                .then(() => {
                    setCaseID(contact.caseID);
                    setContact(contact);
                    setConfirmation(true);
                });
        } else {
            setDuplicateMessage(true);
        }
    }

    const {register, handleSubmit, errors} = useForm({
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
            subject: yup
                .string()
                .matches(/^(?!placeholder).*$/, {message: "Option not Selected Please select one of the options above"})
                .required(""),
            message: yup
                .string()
                .min(10, "the message is to short, please enter a more descriptive message")
                .required("Please enter a message"),
        })
    });
    return (
        <div className="page contact">
            {!confirmation && (
                <div className="contact__container row">
                    <main className="contact__form col-8 col-s-12">
                        <h1 className="h1 contact__heading">Contact Us</h1>
                        <form className="form" onSubmit={handleSubmit(_sendForm)}>
                            <div className="form__section row">
                                <div className="contact__firstName form__group col-6 col-s-12">
                                    <label className="contact__firstNameLabel form__label--compact" htmlFor="firstName">First
                                        name</label>
                                    <input className="contact__firstNameInput form__input--compact" name="firstName"
                                           id="firstName" type="text" placeholder="First name" ref={register}/>
                                    {errors.firstName && <p className="form__error">{errors.firstName.message}</p>}
                                </div>
                                <div className="contact__lastName form__group col-6 col-s-12">
                                    <label className="contact__lastNameLabel form__label--compact" htmlFor="surname">Last
                                        name</label>
                                    <input className="contact__lastNameInput form__input--compact" name="lastName" id="lastName"
                                           type="text" placeholder="Last name" ref={register}/>
                                    {errors.lastName && <p className="form__error">{errors.lastName.message}</p>}
                                </div>
                            </div>
                            <div className="contact__email form__group">
                                <label className="contact__emailLabel form__label--compact" htmlFor="email">Email</label>
                                <input className="contact__emailInput form__input--compact" name="email" id="email" type="email"
                                       placeholder="example@example.com" ref={register}/>
                                {errors.email && <p className="form__error">{errors.email.message}</p>}
                            </div>
                            <div className="contact__subject form__group">
                                <label className="contact__subjectLabel form__label--compact" htmlFor="subject">Subject</label>
                                <select className="contact__subjectInput form__select--compact" name="subject" id="subject"
                                        ref={register}>
                                    <option className="form__option" value="placeholder" hidden defaultValue>Please select one
                                        of the options...
                                    </option>
                                    <option className="form__option" value="order">Manage Order</option>
                                    <option className="form__option" value="establishment">Manage an establishment</option>
                                    <option className="form__option" value="complaint">Complaint</option>
                                    <option className="form__option" value="other">Other</option>
                                </select>
                                {errors.subject && <p className="form__error">{errors.subject.message}</p>}
                            </div>
                            <div className="contact__message form__group">
                                <label className="contact__messageLabel form__label--textarea" htmlFor="message">Message</label>
                                <textarea className="contact__messageInput form__textarea--compact" name="message" id="message"
                                          placeholder="Please enter your message here..." ref={register}/>
                                {errors.message && <p className="form__error">{errors.message.message}</p>}
                            </div>
                            <div className="contact__action form__action form__group">
                                <button className="contact__submit form__submit btn--primary" type="submit">Send</button>
                            </div>
                            {duplicateMessage && (<p className="form__error">This message have already been sent</p>)}
                        </form>
                    </main>
                    <aside className="contact__info col-4 col-s-12">
                        <div className="contact__infoRight row">
                            <div className="contact__phone contact__section">
                                <a className="contact__number contact__link" href="tel:+4712345678">
                                    <i className="fas fa-phone contact__icon"/>
                                    <span className="contact__infoText link--white">+47 12 34 56 78</span>
                                </a>
                            </div>
                            <div className="contact__email contact__section">
                                <a className="contact__emailAddress contact__link"
                                   href="mailto:example@example.com">
                                    <i className="fas fa-envelope contact__icon"/>
                                    <span className="contact__infoText link--white">support@holidaze.com</span>
                                </a>
                            </div>
                            <div className="contact__address contact__section">
                                <a className="contact__mapLink contact__link" href="https://goo.gl/maps/xNDw2LRC37zVD8bh7"
                                   target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-map-marker-alt contact__icon"/>
                                    <span className="contact__infoText link--white">Nordnesbakken 4, 5005 Bergen</span>
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            )}
            {confirmation === true && (
                <ConfirmationBox updateConfirmed={updateConfirmed}>
                    <div className="confirmation__checkWrapper">
                        <i className="far fa-check-circle confirmation__check"/>
                    </div>
                    <div className="confirmation__body">
                        <p className="confirmation__paragraph confirmation__main">Thank you for contacting Holidaze</p>
                        <p className="confirmation__paragraph confirmation__aside">We will contact you as soon as we can, and hope to help you as quickly as possible</p>
                        <p className="confirmation__paragraph confirmation__aside">Your case id is: {caseID}</p>
                    </div>
                </ConfirmationBox>
            )}
        </div>
    )
}