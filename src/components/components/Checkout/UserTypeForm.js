import React, {useState} from "react";
import RadioButton from "../inputs/selectors/RadioButton";
import {Link} from "react-router-dom";
import RegisterUserForm from "../RegisterUserForm";
import LoginUserForm from "../LoginUserForm";

export default function ({user, loginF}) {
    const  [userType, setUserType] = useState("user");
    return (
        <div className="checkout__continue col-10 col-m-12 row">
            {!user && (
                <div className="checkout__selectUser col-6 col-m-12">
                    <div className="checkout__selectOption form__group">
                        <label className="checkout__user form__radio"
                               onClick={() => setUserType("user")}
                        >
                            <input className="checkout__userInput form__radioButton" type="radio"/>
                            <span className="checkout__userDesign form__radioDesign">
                            <RadioButton checked={userType === "user"}/>
                        </span>
                            <span className="checkout__userLabel form__radioLabel">Continue with user</span>
                        </label>
                    </div>
                    <div className="checkout__selectOption form__group">
                        <label className="checkout__register form__radio"
                               onClick={() => setUserType("register")}
                        >
                            <input className="checkout__registerInput form__radioButton" type="radio" value="register"/>
                            <span className="checkout__registerDesign form__radioDesign">
                            <RadioButton checked={userType === "register"}/>
                        </span>
                            <span className="checkout__registerLabel form__radioLabel">Register user</span>
                        </label>
                    </div>
                    <div className="checkout__selectOption form__group">
                        <label className="checkout__guest form__radio"
                               onClick={() => setUserType("guest")}
                        >
                            <input className="checkout__guestInput form__radioButton" type="radio" value="guest"/>
                            <span className="checkout__guestDesign form__radioDesign">
                            <RadioButton checked={userType === "guest"}/>
                        </span>
                            <span className="checkout__guestLabel form__radioLabel">Continue as Guest</span>
                        </label>
                    </div>
                </div>
            )}
            <div className="checkout__selectAction col-6 col-m-12">
                {userType === "user" && (
                    <LoginUserForm user={user} loginF={loginF}/>
                )}
                {userType === "register" && (
                    <RegisterUserForm loginF={loginF}/>
                )}
                {userType === "guest" && (
                    <div className="guestInfo">
                        As guest you will not have access to order details and managing order, but would have to contact us trough the contact form at the <Link className="link--white" to="/contact">[Contact page]</Link> or per email at <a
                        className="link--white" href="mailto:example@example.com">[example@example.com]</a>
                    </div>
                )}
            </div>
        </div>

    )
}