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
import SpecificEstablishment from "./components/SpecificEstablishment";
import ScrollToTop from "./functions/ScrollToTop";

function App() {
    const [establishments, setEstablishments] = useState();
    const [messages, setMessages] = useState();
    const [enquiries, setEnquiries] = useState();
    const [userLoggedIn, setUserLoggedIn] = useState()
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        updateAPIData("initial")
    }, []);

    function toggleLogin(state) {
        if (state !== undefined) {
            setShowLogin(state)
        } else {
            setShowLogin(!showLogin);
        }
    }

    function updateAPIData(job) {
        switch (job) {
            case "initial":
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
                break;
            case "enquiries":
                fetch("https://www.zettrex.no/Noroff/semester4/data/get-enquiries.php")
                    .then(response => response.json())
                    .then(setEnquiries);
                break;
            case "messages":
                fetch("https://www.zettrex.no/Noroff/semester4/data/get-contacts.php")
                    .then(response => response.json())
                    .then(setMessages);
                break;
            case "establishments":
                fetch("https://www.zettrex.no/Noroff/semester4/data/get-establishments.php")
                    .then(response => response.json())
                    .then(setEstablishments)
                break;
            default:
                break;
        }
    }


    function updateUser(user) {
        setUserLoggedIn(user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    if (establishments && enquiries && messages) {
        return (
            <Router className="App" >
                <Navigation showLogin={showLogin} setShowLogin={toggleLogin} userLoggedIn={userLoggedIn} updateUser={updateUser}/>
                <ScrollToTop/>
                <Switch>
                    <Route path="/" exact component={() => <Home establishments={establishments}/>}/>
                    <Route path="/establishments" component={() => <Establishments establishments={establishments}/>}/>
                    <Route path="/specific/:id" component={() => <SpecificEstablishment/>}/>
                    <Route path="/contact" component={() => <Contact/>}/>
                    <Route path="/user" component={() => <User messages={messages} enquiries={enquiries} establishments={establishments}/>}/>
                    <Route path="/styleguide" component={() => <Styleguide/>}/>
                    <Route path="/checkout" component={() => <Checkout user={userLoggedIn} updateUser={updateUser}/>}/>
                </Switch>
                <Footer openLogin={() => toggleLogin(true)} user={userLoggedIn}/>
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
