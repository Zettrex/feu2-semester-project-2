import React, {useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";

export default function () {
    const [invalidUser, setInvalidUser] = useState(false);
    const { register, handleSubmit, errors } = useForm({
        validationSchema: yup.object().shape({
            username: yup
                .string()
                .required("please enter your username")
                .min(5, "username needs to at least be 5 characters"),
            password: yup
                .string()
                .required("please enter your password")
                .min(5, "password is to short")
        })
    });
    function _validateLogin(userInfo) {
        localStorage.setItem("user", JSON.stringify(userInfo))
    }

    if (localStorage.getItem("user")) {
        return (
            <form className="checkout__login col-6" onSubmit={handleSubmit(_validateLogin)}>
                <div className="checkout__userNameWrapper">
                    <div className="checkout__userName form__group">
                        <label className="checkout__userNameLabel form__label" htmlFor="userName">Username</label>
                        <input className="checkout__userNameInput form__input" type="text" name="username" placeholder="username" ref={register}/>
                    </div>
                    {errors.username && (<p className="form__error">{errors.username.message}</p>)}
                </div>
                <div className="checkout__passwordWrapper">
                    <div className="checkout__password form__group">
                        <label className="checkout__passwordLabel form__label" htmlFor="userName">Password</label>
                        <input className="checkout__passwordInput form__input" type="password" name="password" placeholder="password" ref={register}/>
                    </div>
                    {errors.password && (<p className="form__error">{errors.password.message}</p>)}
                </div>
                {invalidUser && (<p className="form__error">Username or password is incorrect please try again.</p>)}
                <button className="checkout__loginBtn btn--primary" type="submit">Log in</button>
            </form>
        )
    } else {
        return (
            <div className="checkout__login">
                <div className="checkout__loginInfo">
                    <span>Logged in as: </span>
                </div>
            </div>
        )
    }
}