import React, {useState} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default function () {
    const [contact, setContact] = useState({});
    const [valid, setValid] = useState(false);
    const [duplicateMessage, setDuplicateMessage] = useState(false);
    function _sendForm(data) {
        console.log(data);
        console.log(JSON.stringify(contact) === JSON.stringify(data));
        if (JSON.stringify(contact) !== JSON.stringify(data)) { //work around due to shallow compare
            const contact = {
                clientName: `${data.firstName} ${data.lastName}`,
                email: data.email,
                subject: data.subject,
                message: data.message
            };
            setContact(contact);
            setValid(true);
            return fetch("http://localhost:8888/contact-success.php", {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `clientName=${encodeURIComponent(`${data.firstName} ${data.lastName}`)}&email=${encodeURIComponent(data.email)}&&subject=${encodeURIComponent(data.subject)}&message=${encodeURIComponent(data.message)}`
            })
        } else {
            setDuplicateMessage(true);
        }
    }
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
            subject: yup
                .string()
                .matches(/^(?!placeholder).*$/, {message:"Option not Selected Please select one of the options above"})
                .required(""),
            message: yup
                .string()
                .min(10, "the message is to short, please enter a more descriptive message")
                .required("Please enter a message"),
        })
    });
    return (
        <div className="page">
            <form className="contact__form" onSubmit={handleSubmit(_sendForm)}>
                <div className="form__section row">
                    <div className="form__group col-6 col-m-12">
                        <label className="form__label--compact" htmlFor="firstName">First name</label>
                        <input className="form__input--compact" name="firstName" id="firstName" type="text" placeholder="First name" ref={register}/>
                        {errors.firstName && <p className="form__error">{errors.firstName.message}</p>}
                    </div>
                    <div className="form__group col-6 col-m-12">
                        <label className="form__label--compact" htmlFor="surname">Last name</label>
                        <input className="form__input--compact" name="lastName" id="lastName" type="text" placeholder="Last name" ref={register}/>
                        {errors.lastName && <p className="form__error">{errors.lastName.message}</p>}
                    </div>
                </div>
                <div className="form__group">
                    <label className="form__label--compact" htmlFor="email">Email</label>
                    <input className="form__input--compact" name="email" id="email" type="email" placeholder="example@example.com" ref={register}/>
                    {errors.email && <p className="form__error">{errors.email.message}</p>}
                </div>
                <div className="form__group">
                    <label className="form__label--compact" htmlFor="subject">Subject</label>
                    <select className="form__select--compact" name="subject" id="subject" ref={register}>
                        <option className="form__option" value="placeholder" hidden defaultValue>Please select one of the options...</option>
                        <option className="form__option" value="order">Manage Order</option>
                        <option className="form__option" value="establishment">Manage an establishment</option>
                        <option className="form__option" value="complaint">Complaint</option>
                        <option className="form__option" value="other">Other</option>
                    </select>
                    {errors.subject && <p className="form__error">{errors.subject.message}</p>}
                </div>
                <div className="form__group">
                    <label className="form__label--textarea" htmlFor="message">Message</label>
                    <textarea className="form__textarea--compact" name="message" id="message" placeholder="Please enter your message here..." ref={register}/>
                    {errors.message && <p className="form__error">{errors.message.message}</p>}
                </div>
                <button className="form__submit btn--primary" type="submit">Send</button>
                {duplicateMessage && (<p className="form__error">This message have already been sent</p>)}
                {valid === true && (
                    <div className="contact__prompt">
                        <div className="contact-prompt">
                            <div className="contact-prompt__topBar">
                                <button className="contact-prompt__close" onClick={() => setValid(false)}>X</button>
                            </div>
                            <div className="contact-prompt__content">
                                <span className="prompt-content__main">Thank you for contacting me, </span>
                                <span className="prompt-content__sec">I will reach out to you as soon as possible</span>
                            </div>
                            <button className="contact-prompt__ok btn" onClick={() => setValid(false)}>Ok</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}