import React, {useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import PropTypes from "prop-types";

export default function LoginUserForm(props) {
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
        fetch("https://www.zettrex.no/Noroff/semester4/data/get-users.php")
            .then(response => response.json())
            .then(validate);
        function validate(users) {
            const user = users.filter(user => user.username === loginInfo.username && user.password === loginInfo.password);
            console.log(user);
            if (user.length === 1) {
                const userInfo = {
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    username: user[0].username,
                    id: user[0].id,
                    email: user[0].email
                };
                console.log(userInfo);
                props.loginF(userInfo);
                setInvalidUser(false);
            } else {
                setInvalidUser(true);
            }
        }
    }
    return (
        <form className={`${props.nav ? "nav__loginBox" : `${props.className}__login`} login`} onSubmit={handleSubmit(_validateLogin)} onKeyUp={event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                return handleSubmit(_validateLogin)
            }
        }}>
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
                <div className="form__section">
                    {invalidUser && (<p className="login__error">Username or password is incorrect please try again.</p>)}
                </div>
                <div className="form__section login__buttons clearfix">
                    <div className="form__action form__group login__submit">
                        <button className="login__loginBtn btn--primary" type="submit">Log in</button>
                    </div>
                    <div className="form__group login__extra">
                        {props.children}
                    </div>
                </div>
            </div>
        </form>
    )
}

LoginUserForm.propTypes = {
    children: PropTypes.element.isRequired,
    loginF: PropTypes.func.isRequired,
    nav: PropTypes.bool,
    className: PropTypes.string
}
