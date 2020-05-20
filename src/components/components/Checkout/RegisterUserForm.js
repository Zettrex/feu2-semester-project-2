import React from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";

export default function () {

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
    function _registerUser(userInfo) {
    }
    return (
        <form className="checkout__login col-6" onSubmit={handleSubmit(_registerUser)}>
            <div className="checkout__userNameWrapper">
                <div className="checkout__userName form__group">
                    <label className="checkout__userNameLabel form__label" htmlFor="userName">Username</label>
                    <input className="checkout__userNameInput form__input" type="text" name="username" placeholder="username" ref={register}/>
                </div>
                {errors.username && (<p className="form__error">{errors.username.message}</p>)}
            </div>
            <span className="checkout__registerEmailWrapper">
                <div className="checkout__registerEmail form__group">
                    <label className="checkout__registerEmailLabel form__label" htmlFor="userName">Email</label>
                    <input className="checkout__registerEmailInput form__input" type="email" name="email" placeholder="example@example.com" ref={register}/>
                </div>
                {errors.email && (<p className="form__error">{errors.email.message}</p>)}
            </span>
            <div className="checkout__password1Wrapper">
                <div className="checkout__password form__group">
                    <label className="checkout__password1Label form__label" htmlFor="userName">Password</label>
                    <input className="checkout__password1Input form__input" type="password" name="password1" placeholder="password" ref={register}/>
                </div>
                {errors.password1 && (<p className="form__error">{errors.password1.message}</p>)}
            </div>
            <div className="checkout__password2Wrapper">
                <div className="checkout__password2 form__group">
                    <label className="checkout__password2Label form__label" htmlFor="userName">Password</label>
                    <input className="checkout__password2Input form__input" type="password" name="password2" placeholder="password" ref={register}/>
                </div>
                {errors.password2 && (<p className="form__error">{errors.password2.message}</p>)}
            </div>
            <button className="btn--primary" type="submit">Register</button>
        </form>
    )
}