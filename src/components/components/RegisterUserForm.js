import React from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {v4 as uuidv4} from "uuid";

export default function (props) {

    //start of https://github.com/jquense/yup/issues/97#issuecomment-306547261
    //this basicly takes the parameters ref ans msg creates a new test that sees if the value it equal ro ref's value
    function equalTo(ref, msg) {
        return this.test({
            name: 'equalTo',
            exclusive: false,
            message: msg,
            params: {
                reference: ref.path
            },
            test: function(value) {
                return value === this.resolve(ref)
            }
        })
    }
    yup.addMethod(yup.string, 'equalTo', equalTo);
    //end of https://github.com/jquense/yup/issues/97#issuecomment-306547261


    const { register, handleSubmit, errors } = useForm({
        validationSchema: yup.object().shape({
            firstName: yup
                .string()
                .required("Enter first name")
                .matches(/\w+/, "not a valid first name"),
            lastName: yup
                .string()
                .required("Enter last name")
                .matches(/\w+/, "not a valid last name"),
            username: yup
                .string()
                .required("please enter your username")
                .min(5, "username needs to at least be 5 characters"),
            password1: yup
                .string()
                .required("please enter your password")
                .min(5, "password is to short"),
            password2: yup
                .string()
                .equalTo(yup.ref("password1"), "password is not the same")
                .required("please enter your password")
                .min(5, "password is to short"),
            email: yup
                .string()
                .email("email is not a valid email")
                .required("please enter your email address")
        })
    });
    function _registerUser(registerInfo) {
        const userInfo = {
            firstName: registerInfo.firstName,
            lastName: registerInfo.lastName,
            username: registerInfo.username,
            id: uuidv4(),
            email: registerInfo.email
        };
        props.loginF(userInfo);

        fetch("https://www.zettrex.no/Noroff/semester4/data/users-success.php", {
            method: "POST",
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
            body: `firstName=${encodeURIComponent(userInfo.firstName)}&lastName=${encodeURIComponent(userInfo.lastName)}&username=${encodeURIComponent(userInfo.username)}&id=${encodeURIComponent(userInfo.id)}&email=${encodeURIComponent(userInfo.email)}&password=${registerInfo.password1}`
        });
    }
    return (
        <form className={`${props.nav ? "nav__loginBox" : `${props.className}__register`} register `} onSubmit={handleSubmit(_registerUser)} onKeyUp={event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                return handleSubmit(_registerUser)
            }
        }}>
            <div className="register__userNameWrapper">
                <div className="register__userName form__group">
                    <label className="register__userNameLabel form__label--compact" htmlFor="userName">First name</label>
                    <input id="firstName" className="register__userNameInput form__input--compact" name="firstName" type="text" ref={register}/>
                </div>
                {errors.firstName && (<p className="form__error">{errors.firstName.message}</p>)}
            </div>
            <div className="register__userNameWrapper">
                <div className="register__userName form__group">
                    <label className="register__userNameLabel form__label--compact" htmlFor="lastName">Last name</label>
                    <input id="lastName" className="register__userNameInput form__input--compact" name="lastName" type="text" ref={register}/>
                </div>
                {errors.lastName && (<p className="form__error">{errors.lastName.message}</p>)}
            </div>
            <div className="register__userNameWrapper">
                <div className="register__userName form__group">
                    <label className="register__userNameLabel form__label--compact" htmlFor="userName">Username</label>
                    <input className="register__userNameInput form__input--compact" type="text" name="username" placeholder="username" ref={register}/>
                </div>
                {errors.username && (<p className="form__error">{errors.username.message}</p>)}
            </div>
            <span className="register__registerEmailWrapper">
                <div className="register__registerEmail form__group">
                    <label className="register__registerEmailLabel form__label--compact" htmlFor="userName">Email</label>
                    <input className="register__registerEmailInput form__input--compact" type="email" name="email" placeholder="example@example.com" ref={register}/>
                </div>
                {errors.email && (<p className="form__error">{errors.email.message}</p>)}
            </span>
            <div className="register__password1Wrapper">
                <div className="register__password form__group">
                    <label className="register__password1Label form__label--compact" htmlFor="userName">Password</label>
                    <input className="register__password1Input form__input--compact" type="password" name="password1" placeholder="password" ref={register}/>
                </div>
                {errors.password1 && (<p className="form__error">{errors.password1.message}</p>)}
            </div>
            <div className="register__password2Wrapper">
                <div className="register__password2 form__group">
                    <label className="register__password2Label form__label--compact" htmlFor="userName">Password</label>
                    <input className="register__password2Input form__input--compact" type="password" name="password2" placeholder="re-enter password" ref={register}/>
                </div>
                {errors.password2 && (<p className="form__error">{errors.password2.message}</p>)}
            </div>
            <div className="form__section register__buttons clearfix">
                <div className="form__group register__extra">
                    {props.children}
                </div>
                <div className="form__action form__group register__submit">
                <button className="btn--primary" type="submit">Register</button>
            </div>
            </div>
        </form>
    )
}