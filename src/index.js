import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import logo from './images/logo.png'
import {rooms} from './../data/room-data'

function parseTime(time) {
    const minutes = time.split(':');
    return parseInt(minutes[0]) * 60 + parseInt(minutes[1]);
 }

function Occupied(props){
    const time =props.value.timing.split('-');
    const width = (parseTime(time[1]) - parseTime(time[0]))*100/1440;
    const postion = parseTime(time[0])*100/1440;
    const styles = {
        width:`${width}%`,
        left:`${postion}%`
    }
    return (<div  className="bg-info d-inline position-absolute border border-warning pl-1 reservation h-100"  style={styles}> {props.value.reserved_By} </div>);
}


class Room extends React.Component{
    constructor(props){
        super(props);
        this.roomName =props.value.name;
        this.state = {
            booked : props.value.bookings 
        }
    }
    render(){
        const room =[];
        this.state.booked.map((element,index)=>{
            room.push(<Occupied className='py-3' key={this.roomName+index} value={element}></Occupied>);
        })
        return (<div className='pt-3 mr-5  pl-5'>{this.roomName}<div className='position-relative bg-dark time-bar' >{room}</div></div>);
    }
}

ReactDOM.render(
    <>   
         <img src={logo} className='mb-2 ml-5'></img>
         <h2 className=" mb-0 position-absolute head-text">Meeting Room Booker</h2>
    </>,document.querySelector('#header')
);

window.onload = function (){
    const roomSection=[];
    const timeSection=[] ;
    for(let i =0;i<24;i++){
        timeSection.push(<div className='time-line d-inline' key={'timeline'+i}>{i}</div>)
    }
    rooms.map((element,index)=>{
        roomSection.push(<Room className='p-3 mb-3' key={index} value={element}/>);
    })
    ReactDOM.render(<div className='containerfluid background py-5'><div className='pr-5 py-5 pl-4 rounded room-section'><h4 className='ml-5'><u className="text-dark">Time Line</u></h4>{timeSection}{roomSection}</div></div>,document.querySelector('#root'));
} 
