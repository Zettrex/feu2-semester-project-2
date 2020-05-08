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
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Styleguide from "./components/Styleguide";

function App() {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch("http://localhost:8888/get-establishments.php")
            .then(response => response.json())
            .then(setData)
    }, []);
    console.log(data);
    return (
        <Router className="App">
            <Navigation/>
            <Switch>
                <Route path="/" exact component={() => <Home/>}/>
                <Route path="/establishments" component={() => <Establishments/>}/>
                <Route path="/contact" component={() => <Contact/>}/>
                <Route path="/login" component={() => <Login/>}/>
                <Route path="/styleguide" component={() => <Styleguide/>}/>
            </Switch>
            <Footer/>
        </Router>
    );
}

export default App;
