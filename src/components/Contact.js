import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";

export default function () {
    const [contact, setContact] = useState({});
    const [valid, setValid] = useState(false);
    const [duplicateMessage, setDuplicateMessage] = useState(false);
    const [user, setUser] = useState();
    useEffect(() => {
        if (localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, [])

    function _sendForm(data) {
        console.log(data);
        console.log(JSON.stringify(contact) === JSON.stringify(data));
        if (JSON.stringify(contact) !== JSON.stringify(data)) { //work around due to shallow compare
            const contact = {
                caseID: `${Math.random().toString(36).substr(2, 6)}`,
                clientName: `${data.firstName} ${data.lastName}`,
                clientRegistered: user.clientRegistered,
                clientID: user.clientID,
                clientEmail: data.email,
                subject: data.subject,
                message: data.message
            };
            setContact(contact);
            setValid(true);
            return fetch("https://www.zettrex.no/Noroff/semester4/data/contact-success.php", {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: `clientName=${encodeURIComponent(contact.clientName)}&clientRegistered=${encodeURIComponent(contact.clientRegistered)}&clientID=${contact.clientID}&clientEmail=${encodeURIComponent(contact.clientEmail)}&subject=${encodeURIComponent(contact.subject)}&message=${encodeURIComponent(contact.message)}`
            })
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
        <div className="page contact row">
            <div className="contact__container col-12 row">
                <main className="contact__form col-8 col-m-12">
                    <h1 className="h1 contact__heading">Contact Us</h1>
                    <form className="form" onSubmit={handleSubmit(_sendForm)}>
                        <div className="form__section row">
                            <div className="contact__firstName form__group col-6 col-m-12">
                                <label className="contact__firstNameLabel form__label--compact" htmlFor="firstName">First
                                    name</label>
                                <input className="contact__firstNameInput form__input--compact" name="firstName"
                                       id="firstName" type="text" placeholder="First name" ref={register}/>
                                {errors.firstName && <p className="form__error">{errors.firstName.message}</p>}
                            </div>
                            <div className="contact__lastName form__group col-6 col-m-12">
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
                        {valid === true && (
                            <div className="contact__prompt">
                                <div className="contact-prompt">
                                    <div className="contact-prompt__topBar">
                                        <button className="contact-prompt__close" onClick={() => setValid(false)}>X</button>
                                    </div>
                                    <div className="contact-prompt__content">
                                        <span className="prompt-content__main">Thank you for contacting Holidaze</span>
                                        <span className="prompt-content__sec">We will contact you as soon as we can, and hope to help you as quickly as possible</span>
                                    </div>
                                    <button className="contact-prompt__ok btn" onClick={() => setValid(false)}>Ok</button>
                                </div>
                            </div>
                        )}
                    </form>
                </main>
                <aside className="contact__info col-4 col-m-12">
                    <div className="contact__infoRight">
                        <div className="contact__times contact__section">
                            <span className="contact__open">24/7 Support</span>
                        </div>
                        <div className="contact__phone contact__section">
                            <a className="contact__number link--white" href="tel:+4712345678">+47 12 34 56 78</a>
                        </div>
                        <div className="contact__email contact__section">
                            <a className="contact__emailAddress link--white"
                               href="mailto:example@example.com">example@example.com</a>
                        </div>
                        <div className="contact__address contact__section">
                            <a className="contact__mapLink link--white" href="https://goo.gl/maps/xNDw2LRC37zVD8bh7"
                               target="_blank" rel="noopener noreferrer">Something gate 4</a>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}