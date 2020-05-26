import React, {useState} from "react";
import Checkbox from "../inputs/selectors/Checkbox";
import {v4 as uuidv4} from "uuid";
import {useForm} from "react-hook-form";
import * as yup from "yup";

export default function ({data, closeF, job}) {
    const [est, setEst] = useState(data)
    if (job === "add" && est === "") {
        setEst ({
            establishmentName: "",
            establishmentEmail: "",
            establishmentAddress: "",
            imageUrl: "",
            price: "",
            googleLat: "",
            googleLong: "",
            description: "",
            selfCatering: "",
            establishmentID: uuidv4()
        });
    }
    function _sendEst(values) {
        if (job === "add") {
            return fetch("http://localhost:8888/add-establishments-success.php", {
                method: "POST",
                headers: {"Content-Type":"application/x-www-form-urlencoded"},
                body: `establishmentName=${encodeURIComponent(est.establishmentName)}&establishmentEmail=${encodeURIComponent(est.establishmentEmail)}&establishmentAddress=${encodeURIComponent(est.establishmentAddress)}&imageUrl=${encodeURIComponent(est.imageUrl)}&price=${encodeURIComponent(est.price)}&googleLat=${encodeURIComponent(est.googleLat)}&googleLong=${encodeURIComponent(est.googleLong)}&description=${est.description}&selfCatering=${encodeURIComponent(est.selfCatering)}&establishmentID=${est.establishmentID}`
            })
        } else {
            
        }
    }
    const { register, handleSubmit, errors, getValues} = useForm({
        validationSchema: yup.object().shape({
            establishmentID: yup
                .string()
                .required("establishment ID missing"),
            establishmentName: yup
                .string()
                .required("Fill in name of establishment"),
            establishmentEmail: yup
                .string()
                .required("Fill in email")
                .email("not a valid email"),
            imageUrl: yup
                .string()
                .required("Fill in link to image")
                .url("not a valid link"),
            price: yup
                .string()
                .required("Fill in Price")
                .matches(/\d+/, {
                    message: "not a valid price"
                }),
            googleLat: yup
                .string()
                .test({
                    message: "Enter address or Longitude & latitude",
                    test: value => {
                        const estValues = getValues();
                        if (!estValues.establishmentAddress) {
                            return (!estValues.establishmentAddress && new RegExp(/\d{1,3}\.\d{6}/).test(value));
                        } else {
                            return true;
                        }
                    }
                }),
            googleLong: yup
                .string()
                .test({
                    message: "Enter address or Longitude & latitude",
                    test: value => {
                        console.log(value);
                        const estValues = getValues();
                        if (!estValues.establishmentAddress) {
                            return (new RegExp(/\d{1,3}\.\d{6}/).test(value));
                        } else {
                            return true;
                        }
                    }
                }),
            establishmentAddress: yup
                .string()
                .test({
                    message: "Enter address or Longitude & latitude",
                    test: value => {
                        const estValues = getValues();
                        if (!(estValues.googleLong && estValues.googleLong)) {
                            return (new RegExp(/w+/, "i").test(value));
                        } else {
                            return true;
                        }
                    }
                })
            ,
            description: yup
                .string()
                .required("Enter a description")
                .min(10, "Description is not long enough"),
            selfCatering: yup
                .string()
                .matches(/(true|false)/, {
                    message: "not a valid selection"
                })
        })
    });
    if (est) {
        return (
            <form className="view-est view-window__content" onSubmit={handleSubmit(_sendEst)}>
                <div className="form__group">
                    <h2 className="view-est__heading h2">{job === "add" ? "Add" : "Edit"} establishment</h2>
                </div>
                <div className="form__section">
                    <div className="view-est__id form__group">
                        <label className="view-est__idLabel form__label" htmlFor="establishmentID">ID:</label>
                        <input className="view-est__idInput" name="establishmentID" id="establishmentID" type="text" value={est.establishmentID} ref={register} disabled/>
                        {errors.establishmentID && <p className="form__error">{errors.establishmentID.message}</p>}
                    </div>
                </div>
                <div className="view-est__content">
                    <div className="form__section row">
                        <div className="form__container col-12 col-d-6">
                            <div className="view-est__name form__group">
                                <label className="form__label--compact" htmlFor="establishmentName">Name</label>
                                <input className="form__input--compact" name="establishmentName" id="establishmentName" type="text" value={est.establishmentName} onChange={event => setEst({...est, establishmentName: event.target.value})} ref={register}/>
                                {errors.establishmentName && <p className="form__error">{errors.establishmentName.message}</p>}
                            </div>
                        </div>
                        <div className="form__container col-12 col-d-6">
                            <div className="view-est__email form__group">
                                <label className="form__label--compact" htmlFor="establishmentEmail">Email</label>
                                <input className="form__input--compact" name="establishmentEmail" id="establishmentEmail" type="text" value={est.establishmentEmail}
                                       onChange={event => setEst({...est, establishmentEmail: event.target.value})} ref={register}/>
                                {errors.establishmentEmail && <p className="form__error">{errors.establishmentEmail.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="form__section row">
                        <div className="form__container col-12">
                            <div className="view-est__address form__group">
                                <label className="form__label--compact" htmlFor="address">Address</label>
                                <input className="form__input--compact" name="address" type="text" value={est.establishmentAddress && (est.establishmentAddress)} onChange={event => setEst({...est, establishmentAddress: event.target.value})} ref={register}/>
                                {errors.establishmentAddress && <p className="form__error">{errors.establishmentAddress.message}</p>}
                            </div>
                        </div>
                        <div className="form__section col-12 row">
                            <div className="form__container col-12 col-d-6">
                                <div className="view-est__latitude form__group">
                                    <label className="form__label--compact" htmlFor="address">Latitude</label>
                                    <input className="form__input--compact" name="googleLat" type="text" value={est.googleLat} onChange={event => setEst({...est, googleLat: event.target.value})} ref={register}/>
                                    {errors.googleLat && <p className="form__error">{errors.googleLat.message}</p>}
                                </div>
                            </div>
                            <div className="form__container col-12 col-d-6">
                                <div className="view-est__longitude form__group">
                                    <label className="form__label--compact" htmlFor="address">Longitude</label>
                                    <input className="form__input--compact" name="googleLong" type="text" value={est.googleLong} onChange={event => setEst({...est, googleLong: event.target.value})} ref={register}/>
                                    {errors.googleLong && <p className="form__error">{errors.googleLong.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="view-est__image form__section">
                        <div className="view-est__showcase">
                            {est.imageUrl && <img className="view-est__showcaseImg" src={est.imageUrl} alt="showcase of display for establishment"/>}
                        </div>
                        <div className="form__group">
                            <label className="form__label--compact" htmlFor="img">Image URL</label>
                            <input className="form__input--compact" name="imageUrl" type="text" value={est.imageUrl} onChange={event => setEst({...est, imageUrl: event.target.value})} ref={register}/>
                            {errors.imageUrl && <p className="form__error">{errors.imageUrl.message}</p>}
                        </div>
                    </div>
                    <div className="form__container">
                        <div className="view-est__description form__group">
                            <label className="form__label--textarea" htmlFor="establishmentDescription">Description</label>
                            <textarea className="form__textarea--compact" name="description" id="establishmentDescription" value={est.description} onChange={event => setEst({...est, description: event.target.value})} ref={register}/>
                            {errors.description && <p className="form__error">{errors.description.message}</p>}
                        </div>
                    </div>
                    <div className="form__container">
                        <div className="view-est__price form__group">
                            <label className="form__label--compact view-est__priceLabel" htmlFor="price">Price</label>
                            <input className="form__input--compact view-est__priceInput" name="price" type="number" max={9999} value={est.price} onChange={event => setEst({...est, price: event.target.value})} ref={register}/>
                            <span className="view-est__currency">$</span>
                            {errors.price && <p className="form__error">{errors.price.message}</p>}
                        </div>
                    </div>
                    <div className="view-est__facilities form__group">
                        <span className="form__label--compact">Facilities</span>
                        <div className="view-est__facilitiesList">
                            <div className="form__group">
                                <label className="form__checkbox">
                                    <input className="form__checkboxButton view-est__facilitiesInput" name="catering" type="checkbox" value="true" onClick={() => setEst({
                                        ...est,
                                        selfCatering: !est.selfCatering
                                    })} ref={register}/>
                                    <span className="form__checkboxDesign">
                                    <Checkbox checked={!est.selfCatering}/>
                                </span>
                                    <span className="form__checkboxLabel">Catering</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form__section">
                        <div className="view-window__actions">
                            <button className="view-est__cancelBtn btn" onClick={() => closeF("close")}>Cancel</button>
                            <button className="view-est__saveBtn btn--primary" type="submit">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    } else {
        return null;
    }
}