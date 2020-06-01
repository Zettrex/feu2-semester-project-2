import React, {useEffect, useState} from 'react';
import "./style/style.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./components/Home";
import Establishments from "./components/Establishments";
import Contact from "./components/Contact";
import User from "./components/User";
import Checkout from "./components/Checkout";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Styleguide from "./components/Styleguide";
import SpecificEstablishment from "./components/components/SpecificEstablishment";

function App() {
    const [establishments, setEstablishments] = useState();
    const [messages, setMessages] = useState();
    const [enquiries, setEnquiries] = useState();
    const [userLoggedIn, setUserLoggedIn] = useState()
    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUserLoggedIn(JSON.parse(localStorage.getItem("user")));
        }
        fetch("https://www.zettrex.no/Noroff/semester4/data/get-enquiries.php")
            .then(response => response.json())
            .then(setEnquiries);
        fetch("https://www.zettrex.no/Noroff/semester4/data/get-contacts.php")
            .then(response => response.json())
            .then(setMessages);
        fetch("https://www.zettrex.no/Noroff/semester4/data/get-establishments.php")
            .then(response => response.json())
            .then(setEstablishments)
    }, []);
    function updateUser(user) {
        setUserLoggedIn(user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    if (establishments && enquiries && messages) {
        console.log("app: ", enquiries);
        return (
            <Router className="App">
                <Navigation userLoggedIn={userLoggedIn} updateUser={updateUser}/>
                <Switch>
                    <Route path="/" exact component={() => <Home establishments={establishments}/>}/>
                    <Route path="/establishments" component={() => <Establishments establishments={establishments}/>}/>
                    <Route path="/specific/:id" component={() => <SpecificEstablishment/>}/>
                    <Route path="/contact" component={() => <Contact/>}/>
                    <Route path="/user" component={() => <User messages={messages} enquiries={enquiries} establishments={establishments}/>}/>
                    <Route path="/styleguide" component={() => <Styleguide/>}/>
                    <Route path="/checkout" component={() => <Checkout user={userLoggedIn} updateUser={updateUser}/>}/>
                </Switch>
                <Footer/>
            </Router>
        );
    } else {
        return (
            <div>

            </div>
        )
    }
}

export default App;
