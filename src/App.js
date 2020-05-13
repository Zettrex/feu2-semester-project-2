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

function App() {
    const [establishments, setEstablishments] = useState();
    const [messages, setMessages] = useState();
    const [enquiries, setEnquiries] = useState();

    useEffect(() => {
        fetch("http://localhost:8888/get-enquiries.php")
            .then(response => response.json())
            .then(setEnquiries);
        fetch("http://localhost:8888/get-contacts.php")
            .then(response => response.json())
            .then(setMessages);
        fetch("http://localhost:8888/get-establishments.php")
            .then(response => response.json())
            .then(setEstablishments)
    }, []);

    if (establishments && enquiries && messages) {
        return (
            <Router className="App">
                <Navigation/>
                <Switch>
                    <Route path="/" exact component={() => <Home/>}/>
                    <Route path="/establishments" component={() => <Establishments establishments={establishments}/>}/>
                    <Route path="/contact" component={() => <Contact/>}/>
                    <Route path="/user" component={() => <User messages={messages} enquiries={enquiries} establishments={establishments}/>}/>
                    <Route path="/styleguide" component={() => <Styleguide/>}/>
                    <Route path="/checkout" component={() => <Checkout/>}/>
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
