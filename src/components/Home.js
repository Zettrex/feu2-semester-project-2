import React, {useState} from "react";
import { useForm } from  "react-hook-form";
import {useHistory} from "react-router-dom";
import DateFromTo from "./components/filters/DateFromTo";
import SearchBox from "./components/filters/SearchBox";
import People from "./components/filters/People";
import {_filterEstablishments} from "../functions/handleEstablishmentForm";
import bergenImage from "../media/images/lachlan-gowen-J38KXYtVrBA-unsplash.jpg";
import PropTypes from 'prop-types';
import * as yup from "yup";



export default function Home({establishments}) {
    const [data, setData] = useState({
        oEstablishments: establishments,
        fEstablishments: establishments,
        sEstablishment: null
    });
    const history = useHistory();
    function _checkout(filters) {
        const chart = {
            ...data.sEstablishment[0],
            adults: filters.adults,
            children: filters.children,
            date1: filters.date1,
            date2: filters.date2
        };
        localStorage.setItem("order", JSON.stringify(chart));
        history.push("/checkout");
    }

    function _updateData(newData) {
        setData({
            ...data,
            sEstablishment: newData
        });
    }
    function updateFilters(newData) {
        setData({
            ...data,
            fEstablishments: newData
        })
    }
    const {register, handleSubmit, getValues, errors} = useForm({
        validationSchema : yup.object().shape({
            search: yup
                .string()
                .test({
                    message: "please select an establishment",
                    test: () => {
                        return data.sEstablishment.length > 0;
                    }
                }),
            adults: yup
                .string(),
            children: yup
                .string(),
            date1: yup
                .string(),
            date2: yup
                .string()
        })
    });
    return (
        <div className="page">
            <div className="home-hero hero column">
                <form className="orderBox containerBox form" onChange={() => {
                    console.log(data.sEstablishment);
                    const values = getValues();
                    _filterEstablishments(data.oEstablishments, updateFilters
                    , values)
                }} onSubmit={handleSubmit(_checkout)}>
                    <div className="orderBox__filter">
                        <div className="form__section row">
                            <SearchBox className="orderBox" label="place" sectionCol="col-l-6 col-12" data={data} updateData={_updateData} results={true} Ref={register} errors={errors}/>
                            <People className="orderBox" sectionCol="col-l-6 col-12" groupCol="col-6 col-s-12" Ref={register} errors={errors}/>
                        </div>
                        <div className="form__section row">
                            <DateFromTo className="orderBox" groupCol="col-6 col-s-12" sectionCol="col-12" Ref={register} errors={errors}/>
                            <div className="orderBox__action form__section">
                                <div className="form__group">
                                    <button type="submit" className="orderBox__submit btn--primary">Find place</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <main className="bergen">
                <h1 className="h1">Welcome to Bergen</h1>
                <div className="row">
                    <div className="bergen__info col-7 col-s-12">
                        <p className="paragraph">
                            Bergen, historically Bjørgvin, is a city and municipality in Vestland county on the west coast of Norway. At the end of 2019, the municipality's population was 283,929, and the Bergen metropolitan region had about 420,000 inhabitants.
                        </p>
                        <p className="paragraph">
                             Bergen is the second-largest city in Norway. The municipality covers 465 square kilometres (180 sq mi) and is on the peninsula of Bergenshalvøyen. The city centre and northern neighbourhoods are on Byfjorden, 'the city fjord', and the city is surrounded by mountains; Bergen is known as the 'city of seven mountains'. Many of the extra-municipal suburbs are on islands.
                        </p>
                        <p className="paragraph">
                            Bergen is the administrative centre of Vestland county. The city consists of eight boroughs: Arna, Bergenhus, Fana, Fyllingsdalen, Laksevåg, Ytrebygda, Årstad, and Åsane.
                        </p>
                    </div>
                    <div className="bergen__image col-5 col-s-12">
                        <img src={bergenImage} alt="Bergen brygge"/>
                    </div>
                </div>
            </main>
        </div>
    )
}

Home.propTypes = {
    establishments: PropTypes.array.isRequired
}