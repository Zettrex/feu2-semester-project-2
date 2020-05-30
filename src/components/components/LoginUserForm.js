import React, {useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {v4 as uuidv4} from "uuid";

export default function (props) {
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
    function _validateLogin(loginInfo) {
        const userInfo = {
            firstName: loginInfo.firstName,
            lastName: loginInfo.lastName,
            username: loginInfo.username,
            id: uuidv4(),
            email: loginInfo.email
        }
        props.loginF(userInfo);

        //for later if i decide to have a user database
        fetch("https://www.zettrex.no/Noroff/semester4/data/get-")
    }
    return (
        <form className={`${props.nav ? "nav__loginBox" : `${props.className}__login`} login`} onSubmit={handleSubmit(_validateLogin)}>
            <div className="form__group">
                <div className="form__section">
                    <div className="login__userName form__group">
                        <label className="login__userNameLabel form__label--compact" htmlFor="userName">Username</label>
                        <input className="login__userNameInput form__input--compact" type="text" name="username" ref={register}/>
                    </div>
                    {errors.username && (<p className="form__error">{errors.username.message}</p>)}
                </div>
                <div className="form__section">
                    <div className="login__password form__group">
                        <label className="login__passwordLabel form__label--compact" htmlFor="userName">Password</label>
                        <input className="login__passwordInput form__input--compact" type="password" name="password" ref={register}/>
                    </div>
                    {errors.password && (<p className="form__error">{errors.password.message}</p>)}
                </div>
                {invalidUser && (<p className="form__error">Username or password is incorrect please try again.</p>)}
                <div className="form__section row">
                    <div className="form__group">
                        {props.children}
                    </div>
                    <div className="form__action form__group">
                        <button className="login__loginBtn btn--primary" type="submit">Log in</button>
                    </div>
                </div>
            </div>
        </form>
    )
}