import {users} from '../data/user-data';
import React from "react";
import {Popover} from 'react-bootstrap'
import {rooms} from './../data/room-data';
import { BrowserRouter as Router, NavLink} from "react-router-dom";
function parseTime(time) {
    const minutes = time.split(':');
    return parseInt(minutes[0]) * 60 + parseInt(minutes[1]);
 }

function Occupied(props){
    const time =props.value.timing.split('-');
    const width = (parseTime(time[1]) - parseTime(time[0]))*100/1440;
    const postion = parseTime(time[0])*100/1440;
    const user = users.find((element)=>{
        return props.value.reserved_By ===element.name;
    });
    const styles = {
        width:`${width}%`,
        left:`${postion}%`,
        backgroundColor : user.color,
    }
    return (<div  className=" d-inline position-absolute font-weight-light border border-secondary px-1 reservation h-100 "   style={styles}> {props.value.reserved_By} </div>);
}

// class Vl extends React.Component{

// }

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
        return (<div className='pt-3 mr-5  pl-5'>{this.roomName} <Router><NavLink to={"/NewBooking/"+ this.roomName} className='bookNow position-absolute rounded btn-success px-2'>Book Now</NavLink></Router><div className='position-relative  time-bar mt-3 mb-5' >{room}</div></div>);
    }
}

function Dashboard (){
    const roomSection=[];
    const timeSection=[] ;
    let j;
    for(let i =0;i<24;i++){
        
        timeSection.push(<div className='time-line d-inline border border-secondary pl-1' key={'timeline'+i}>{i+':00'}</div>)
    }
    rooms.map((element,index)=>{
        roomSection.push(<Room className='p-3 mb-3' key={index} value={element}/>);
    })
    return(<div className='containerfluid background py-5'><div className='pr-5 py-5 pl-4 rounded room-section'><h4 className='ml-5'><u className="text-dark">Time Line</u></h4><div className='pt-3 mr-5 pl-5 time-Section row'>{timeSection}</div>{roomSection}</div></div>);
}


export {Dashboard};
