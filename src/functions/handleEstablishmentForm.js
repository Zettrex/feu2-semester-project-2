export function _filterEstablishments(data, updateData, values) {
    console.log(values);
    const original = data.oEstablishments;
    let filtered = original.filter(item => {
        if (values.price1 && values.price2) {
            return ((parseInt(item.price) >= parseInt(values.price1)) && (parseInt(item.price) <= parseInt(values.price2))) && new RegExp(`^${values.search}`, "gi").test(item.establishmentName);
        } else {
            return new RegExp(`^${values.search}`, "gi").test(item.establishmentName)
        }
    });
    console.log(filtered);
    if (updateData) {
        updateData({
            ...data,
            fEstablishments: filtered
        })
    }
}
export function _goToCheckout(data, values) {
    console.log("we get here?!");
    const chart = {
        ...values,
        establishment: data.sEstablishment
    };
    localStorage.setItem("chart", JSON.stringify(chart));
    console.log(chart)
}

export function _checkout(data, confirmation) {
    confirmation(data);
    return fetch("http://localhost:8888/enquiry-success.php", {
        method: "POST",
        headers: {"Content-Type":"application/x-www-form-urlencoded"},
        body: `orderID=${encodeURIComponent(Math.random().toString(36).substr(2, 9))}&orderDate=${encodeURIComponent(JSON.stringify(new Date()))}&establishment=${encodeURIComponent(data.establishmentName)}&establishmentEmail=${data.establishmentEmail}&clientName=${encodeURIComponent(data.clientFirstName + " " + data.clientLastName)}&clientRegistered=${encodeURIComponent(data.clientRegistered)}&clientID=${encodeURIComponent(data.clientID)}&clientEmail=${encodeURIComponent(data.clientEmail)}&checkin=${encodeURIComponent(data.date1)}&checkout=${encodeURIComponent(data.date2)}&adults=${encodeURIComponent(data.adults)}&children=${encodeURIComponent(data.children)}&payMethod=${encodeURIComponent(data.paymentmethod)}&price=${encodeURIComponent(data.price)}`
    })
}