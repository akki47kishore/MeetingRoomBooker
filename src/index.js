import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import logo from './images/logo.png';
import {rooms} from './../data/room-data';
import {Room} from './dashboard.js'
import { BrowserRouter as Router, Route ,NavLink } from "react-router-dom";

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;

ReactDOM.render(
    <>   
        <div>
            <img src={logo} className='mb-2 ml-5'></img>
            <h2 className=" mb-0 position-absolute head-text">Meeting Room Booker</h2>
        </div>
        <Router>
            <div>
            <nav>
                <ul className='d-flex'>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about/">About</NavLink></li>
                </ul>
            </nav>
            </div>
        </Router>
    </>,document.querySelector('#header')
);

window.onload = function (){
    const roomSection=[];
    const timeSection=[] ;
    let j;
    for(let i =0;i<24;i++){
        
        timeSection.push(<div className='time-line d-inline border border-secondary pl-1' key={'timeline'+i}>{i+':00'}</div>)
    }
    rooms.map((element,index)=>{
        roomSection.push(<Room className='p-3 mb-3' key={index} value={element}/>);
    })
    ReactDOM.render(<div className='containerfluid background py-5'><div className='pr-5 py-5 pl-4 rounded room-section'><h4 className='ml-5'><u className="text-dark">Time Line</u></h4><div className='pt-3 mr-5 pl-5 time-Section row'>{timeSection}</div>{roomSection}</div></div>,document.querySelector('#root'));
   
} 
