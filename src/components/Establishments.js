import React, {useState} from "react";
import Map from "./components/establishments/Map";
import EstablishmentItem from "./components/establishments/EstablishmentItem";
import DateFromTo from "./components/filters/DateFromTo";
import SearchBox from "./components/filters/SearchBox";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import People from "./components/filters/People";
import PriceRange from "./components/filters/PriceRange";
import {_filterEstablishments, _goToCheckout} from "../functions/handleEstablishmentForm";

export default function ({establishments}) {
    const [data, setData] = useState({
        oEstablishments: establishments,
        fEstablishments: establishments,
        sEstablishment: null
    });

    function _updateData(values) {
        setData(values)
    }

    const {register, handleSubmit, getValues, errors} = useForm(/*{
        validationSchema : yup.object().shape({
            type: yup
                .string()
                .matches(/(hotel|bnb|cabin|^$)/),
            search: yup
                .string(),
            adults: yup
                .string()
                .matches(/\d+/)
                .required(),
            children: yup
                .string()
                .matches(/\d+/)
                .required(),
            date1: yup
                .date()
                .required(),
            date2: yup
                .date()
                .min(yup.ref("date1"), ({min}) => `Date needs to be later then ${new Date(min).toLocaleDateString()}`)/!*https://stackoverflow.com/a/57161582*!/
                .required(),
            price1: yup
                .number()
                .max(350, "max is above 350")
                .required(),
            price2: yup
                .number()
                .max(350, "max is above 350")
        })
    }*/);

    return (
        <div className="page est">
            <div className="page__topBar">
                <form className="filterArea row" onChange={() => {
                    const values = getValues();
                    _filterEstablishments(data, _updateData, values)
                }} onSubmit={handleSubmit(values => _goToCheckout(data, values))}>
                    <div className="filterArea__filters col-12 col-d-10">
                        <div className="filterArea__section row">
                            <SearchBox className="filterArea" sectionCol="col-12 col-d-6" updateData={_updateData} data={data} Ref={register} results={false}/>
                            <DateFromTo className="filterArea" groupCol="col-6 col-m-12" sectionCol="col-12 col-d-6" Ref={register}/>
                        </div>
                        <div className="filterArea__section row">
                            <People className="filterArea" sectionCol="col-m-12 col-6" groupCol="column" adults={true} children={true} Ref={register}/>
                            <PriceRange className="filterArea" sectionCol="col-m-12 col-6" Ref={register} data={data} updateData={_updateData} />
                        </div>
                    </div>
                    <div className="filterArea__action filterArea__section col-d-2">
                        <div className="filterArea__matches">
                            Found {data.fEstablishments.length}<br/>Matches
                        </div>
                    </div>
                </form>
            </div>
            <div className="est__wrapper row">
                <aside className="col-12 col-d-5">
                    <Map/>
                </aside>
                <main className="est-list col-12 col-d-7">
                    {data.fEstablishments.length > 0 ? data.fEstablishments.map((est) => {
                        const values = getValues();
                        return <EstablishmentItem filters={values} key={est.id} item={est}/>
                    }): null}
                </main>
            </div>
        </div>
    )
}