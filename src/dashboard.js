import {users} from '../data/user-data';
import React from "react";
import {Popover} from 'react-bootstrap'

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
        return (<div className='pt-3 mr-5  pl-5'>{this.roomName} <button className='bookNow position-absolute rounded btn-success'>Book Now</button><div className='position-relative  time-bar mt-3 mb-5' >{room}</div></div>);
    }
}

export {Room};
