import React, {useState} from "react";
import Checkbox from "../inputs/selectors/Checkbox";
import {v4 as uuidv4} from "uuid";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import PropTypes from "prop-types";
import TextArea from "../inputs/TextArea";

export default function ViewEstablishment({data, closeF, job}) {
    const [est, setEst] = useState(data)
    if (job === "add" && est === "") {
        setEst ({
            establishmentName: "",
            establishmentEmail: "",
            establishmentAddress: "",
            imageUrl: "",
            price: "",
            rating: "",
            googleLat: "",
            googleLong: "",
            description: "",
            selfCatering: "",
            establishmentID: uuidv4()
        });
    }
    function _sendEst() {
        closeF("close");
        if (job === "add") {
            return fetch("https://www.zettrex.no/Noroff/semester4/data/add-establishments-success.php", {
                method: "POST",
                headers: {"Content-Type":"application/x-www-form-urlencoded"},
                body: `establishmentName=${encodeURIComponent(est.establishmentName)}&establishmentEmail=${encodeURIComponent(est.establishmentEmail)}&imageUrl=${encodeURIComponent(est.imageUrl)}&rating=${encodeURIComponent(Math.round(Math.random() * 5)*2)/2}&price=${encodeURIComponent(est.price)}&googleLat=${encodeURIComponent(est.googleLat)}&googleLong=${encodeURIComponent(est.googleLong)}&description=${est.description}&selfCatering=${encodeURIComponent(est.selfCatering)}&establishmentID=${est.establishmentID}`
            })
        } else if (job === "edit") {
            return fetch("https://www.zettrex.no/Noroff/semester4/data/edit-establishments-success.php", {
                method: "POST",
                headers: {"Content-Type":"application/x-www-form-urlencoded"},
                body: `establishmentName=${encodeURIComponent(est.establishmentName)}&establishmentEmail=${encodeURIComponent(est.establishmentEmail)}&imageUrl=${encodeURIComponent(est.imageUrl)}&rating=${encodeURIComponent(est.rating)}&price=${encodeURIComponent(est.price)}&googleLat=${encodeURIComponent(est.googleLat)}&googleLong=${encodeURIComponent(est.googleLong)}&description=${est.description}&selfCatering=${encodeURIComponent(est.selfCatering)}&establishmentID=${est.establishmentID}`
            })
        }
    }
    const { register, handleSubmit, errors} = useForm({
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
                        return (new RegExp(/\d{1,3}\.\d{6}/).test(value));
                    }
                }),
            googleLong: yup
                .string()
                .test({
                    message: "Enter address or Longitude & latitude",
                    test: value => {
                        return (new RegExp(/\d{1,3}\.\d{6}/).test(value));
                    }
                }),
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
                        <div className="form__container col-12 col-l-6">
                            <div className="view-est__name form__group">
                                <label className="view-est__nameLabel form__label--compact" htmlFor="establishmentName">Name</label>
                                <input className="view-est__nameInput form__input--compact" name="establishmentName" id="establishmentName" type="text" value={est.establishmentName} onChange={event => setEst({...est, establishmentName: event.target.value})} ref={register}/>
                                {errors.establishmentName && <p className="form__error">{errors.establishmentName.message}</p>}
                            </div>
                        </div>
                        <div className="form__container col-12 col-l-6">
                            <div className="view-est__email form__group">
                                <label className="view-est__emailLabel form__label--compact" htmlFor="establishmentEmail">Email</label>
                                <input className="view-est__emailInput form__input--compact" name="establishmentEmail" id="establishmentEmail" type="text" value={est.establishmentEmail}
                                       onChange={event => setEst({...est, establishmentEmail: event.target.value})} ref={register}/>
                                {errors.establishmentEmail && <p className="form__error">{errors.establishmentEmail.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="form__section row">
                        <div className="form__section col-12 row">
                            <div className="form__container col-12 col-l-6">
                                <div className="view-est__latitude form__group">
                                    <label className="view-est__latitudeLabel form__label--compact" htmlFor="address">Latitude</label>
                                    <input className="view-est__latitudeInput form__input--compact" name="googleLat" type="text" value={est.googleLat} onChange={event => setEst({...est, googleLat: event.target.value})} ref={register}/>
                                    {errors.googleLat && <p className="form__error">{errors.googleLat.message}</p>}
                                </div>
                            </div>
                            <div className="form__container col-12 col-l-6">
                                <div className="view-est__longitude form__group">
                                    <label className="view-est__longitudeLabel form__label--compact" htmlFor="address">Longitude</label>
                                    <input className="view-est__longitudeInput form__input--compact" name="googleLong" type="text" value={est.googleLong} onChange={event => setEst({...est, googleLong: event.target.value})} ref={register}/>
                                    {errors.googleLong && <p className="form__error">{errors.googleLong.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="view-est__image form__section">
                        <div className="view-est__showcase">
                            {est.imageUrl && <img className="view-est__showcaseImg" src={est.imageUrl} alt="showcase of display for establishment"/>}
                        </div>
                        <div className="view-est__imageUrl form__group">
                            <label className="view-est__imageUrlLabel form__label--compact" htmlFor="img">Image URL</label>
                            <input className="view-est__imageUrlInput form__input--compact" name="imageUrl" type="text" value={est.imageUrl} onChange={event => setEst({...est, imageUrl: event.target.value})} ref={register}/>
                            {errors.imageUrl && <p className="form__error">{errors.imageUrl.message}</p>}
                        </div>
                    </div>
                    <div className="form__container">
                        <TextArea className="view-est__description view-est" label="Description" name="description" Ref={register} errors={errors.description} value={est.description} setValue={event => setEst({
                            ...est,
                            description: event.target.value
                        })}/>
                    </div>
                    <div className="form__container">
                        <div className="view-est__price form__group">
                            <label className="view-est__priceLabel form__label--compact" htmlFor="price">Price</label>
                            <input className="view-est__priceInput form__input--compact" name="price" type="number" max={9999} value={est.price} onChange={event => setEst({...est, price: event.target.value})} ref={register}/>
                            <span className="view-est__currency">$</span>
                            {errors.price && <p className="form__error">{errors.price.message}</p>}
                        </div>
                    </div>
                    <div className="view-est__facilities form__group">
                        <span className="form__label--compact">Facilities</span>
                        <div className="view-est__facilitiesList">
                            <div className="form__group">
                                <label className="form__checkbox">
                                    <input className="form__checkboxButton view-est__facilitiesInput" name="catering" type="checkbox" value="true" onClick={() => {
                                        if (est.selfCatering === "true") {
                                            setEst({
                                                ...est,
                                                selfCatering: "false"
                                            })
                                        } else {
                                            setEst({
                                                ...est,
                                                selfCatering: "true"
                                            })
                                        }
                                    }} ref={register}/>
                                    <span className="form__checkboxDesign">
                                    <Checkbox checked={est.selfCatering}/>
                                </span>
                                    <span className="form__checkboxLabel">Catering</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form__section">
                        <div className="view-window__actions">
                            <button className="view-est__cancelBtn link--white" onClick={() => closeF("close")}>Cancel</button>
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

ViewEstablishment.propTypes = {
    data: PropTypes.object.isRequired,
    closeF: PropTypes.func.isRequired,
    job: PropTypes.string.isRequired,
}