import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import logo from './images/logo.png';
import {Dashboard} from './dashboard.js';
import {MyBookings} from "./myBookings.js";
import { BrowserRouter as Router, Route ,NavLink,Switch } from "react-router-dom";

function Header (){
        return(
            <div className="header position-relative pt-3">   
                <div>
                    <img src={logo} className='mb-2 ml-5'></img>
                    <h2 className=" mb-0 position-absolute head-text">Meeting Room Booker</h2>
                </div>
                <Router>
                    <div>
                    <nav>
                        <ul className='d-flex justify-content-end mr-5 pr-5 mb-0'>
                            <li className='mr-5'><NavLink to="/"  exact className='nav-bar' activeClassName="selected" >Home</NavLink></li>
                            <li className='mr-4'><NavLink to="/mybookings/" className='nav-bar' activeClassName="selected" >My Bookings</NavLink></li>
                        </ul>
                    </nav>
                    </div>
                </Router>
            </div>);
}

function AppRouter(){
    
    return (
    <Router>
    <div>
        <Header />
        <Switch>
            <Route exact path="/" component = {Dashboard} />
            <Route path="/mybookings" component ={MyBookings} />
        </Switch>
    </div>
    </Router>
    );
    }



window.onload = function (){
    ReactDOM.render(<AppRouter/>,document.querySelector('#root'));   
} 
