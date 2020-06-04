import React, {useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default function SearchBox({className, label, updateData, data, sectionCol, groupCol, results, Ref, errors}) {
    const [search, setSearch] = useState({
        focus: false,
        input: ""
    });

    function _handleSearchInput(event) {
        setSearch({
            ...search,
            input: event.target.value
        })
    }
    function selectEstablishment(target, item) {
        updateData(item);
        setSearch({
            focus: false,
            input: item.establishmentName
        })
    }

    return (
        <div className={`${className}__search form__section ${sectionCol}`}>
            <div className={`${className}__searchWrapper form__group ${groupCol}`}>
                <label className={`${className}__searchLabel form__label--compact`} htmlFor="est-search">{label}</label>
                <input className={`${className}__searchInput form__search form__input--compact`} type="text" placeholder="Name of Establishment" name="search" ref={Ref}
                       onInput={() => setSearch({...search, focus: true})}
                       onClick={() => setSearch({...search, focus: true})}
                       onFocus={() => setSearch({...search, focus: true})}
                       value={search.input} onChange={_handleSearchInput}
                />
                {search.focus && results && (
                    <ul className="searchResults">
                        {data.fEstablishments.map(est => {
                            return (
                                <li className="searchResults__item" key={est.establishmentID}>
                                    <label className="resultItem row"
                                           onClick={(item) => {
                                               selectEstablishment(item.target, est);
                                           }}
                                           onKeyDown={(event => {
                                               if (event.key === "Enter") {
                                                   selectEstablishment(event.target, est);
                                               }
                                           })}
                                    >
                                        <input className="form__checkboxButton" type="checkbox" name="establishment"
                                            /*onFocus={() => setSearch({...search, focus: true})}
                                            onBlur={() => setSearch({...search, focus: false})}*/
                                        />
                                        <div className="form__checkboxDesign resultItem__design col-12 row">
                                            <div className="resultItem__content col-auto row">
                                                <div className="resultItem__img bgImage" style={{
                                                    backgroundImage: `url(${est.imageUrl})`
                                                }}/>
                                                <div className="resultItem__info">
                                                    <div className="resultItem__name">
                                                        {est.establishmentName}
                                                    </div>
                                                    <span className="resultItem__price">Price: {est.price}$</span>
                                                </div>
                                            </div>
                                            <div className="resultItem__action column col-s-12">
                                                <Link className="resultItem__readMore link--white" to={`/specific/${est.establishmentID}`} tabindex="-1">Read more</Link>
                                            </div>
                                        </div>
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
            {errors.search && <p className="form__error">{errors.search.message}</p>}
        </div>
    )
}
SearchBox.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    sectionCol: PropTypes.string,
    groupCol: PropTypes.string,
    updateData: PropTypes.func,
    results: PropTypes.bool.isRequired,
    Ref: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}