import React, {useState} from "react";

export default function ({className, updateData, data, Ref, sectionCol, groupCol, results}) {
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
        updateData({
            ...data,
            sEstablishment: item
        });
        setSearch({
            focus: false,
            input: item.establishmentName
        })
    }

    return (
        <div className={`${className}__search form__section ${sectionCol}`}>
            <div className={`${className}__place form__group ${groupCol}`}>
                <label className={`${className}__placeLabel form__label--compact`} htmlFor="est-search">Place</label>
                <input className={`${className}__placeInput form__input--compact`} type="text" placeholder="Name or area" name="search" ref={Ref}
                       onInput={() => setSearch({...search, focus: true})}
                       onClick={() => setSearch({...search, focus: true})}
                       onFocus={() => setSearch({...search, focus: true})}
                       value={search.input} onChange={_handleSearchInput}
                />
                {search.focus && results && (
                    <ul className="searchResults">
                        {data.fEstablishments.map(est => {
                            return (
                                <li className="searchResults__item" key={est.id}>
                                    <label className="resultItem row"
                                           onClick={(item) => {
                                               selectEstablishment(item.target, est);
                                           }}
                                           onKeyDown={(event => {
                                               console.log(event.target);
                                               if (event.key === "Enter") {
                                                   selectEstablishment(event.target, est);
                                               }
                                           })}
                                    >
                                        <input className="form__checkboxButton" type="checkbox" name="establishment"
                                            /*onFocus={() => setSearch({...search, focus: true})}
                                            onBlur={() => setSearch({...search, focus: false})}*/
                                        />
                                        <div className="form__checkboxDesign">
                                            <div className="resultItem__img bgImage" style={{
                                                backgroundImage: `url(${est.imageUrl})`
                                            }}/>
                                            <div className="resultItem__info">
                                                <div className="resultItem__name">
                                                    {est.establishmentName}
                                                </div>
                                                <span className="resultItem__price">
                                                    Price: {est.price}$
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}