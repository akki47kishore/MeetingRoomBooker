import {users} from '../data/user-data';
import React from "react";
import {rooms} from './../data/room-data';

function parseTime(time) {
    const minutes = time.split(':');
    return parseInt(minutes[0]) * 60 + parseInt(minutes[1]);
 }

class BookingForm extends React.Component{
    constructor(props){
        super(props);
        this.room = props.value;
        this.onClick = props.onClick;
        this.state = {
            value : props.value, 
        }
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    setBookingData(){
        let bookingData = {}
        bookingData.timing =  `${document.querySelector('#'+this.room+'from').value}-${document.querySelector('#'+this.room+'to').value}`
        bookingData.reserved_By = document.querySelector(`#${this.room}user`).value;
        this.onClick(bookingData);
    }

    render() {
        return (
            <div className='d-flex justify-content-between pl-5 py-1 ' >
                <div className="input-group mb-3 w-25">
                    <div className="input-group-prepend">
                       <span className="input-group-text" >Name</span>
                  </div>
                  <input type="text" className="form-control" placeholder="Username" id={this.room+"user"}></input>
                </div>
                <div className="input-group mb-3 w-25">
                    <div className="input-group-prepend">
                       <span className="input-group-text" >From</span>
                   </div>
                   <input type="time" className="form-control" id={this.room+'from'}></input>
                </div>
                <div className="input-group mb-3 w-25">
                    <div className="input-group-prepend">
                        <span className="input-group-text" >To</span>
                    </div>
                    <input type="time" className="form-control" id={this.room+"to"}></input>
                </div>
                <button className='btn btn-primary h-25 ' onClick={()=>{this.setBookingData()}}>Confirm</button>
            </div>
        );
    }
}
function Occupied(props){
    const time =props.value.timing.split('-');
    const width = (parseTime(time[1]) - parseTime(time[0]))*100/1440;
    let postion = parseTime(time[0])*100/1440;
    if(props.dst){
        postion += 4.16667;
    }
   
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
        this.roomName = props.value.name;
        this.state = {
            booked : props.value.bookings,
            display_Form : false,
        }
    }

    displayBookingForm(){
        this.setState({display_Form : true});
    }

    addNewBooking(bookingData){
        const currentBookings= this.state.booked.slice();
        currentBookings.push(bookingData);
        this.setState({booked : currentBookings,display_Form:false});
    }

    render(){
        
        const room =[];
        this.state.booked.map((element,index)=>{
            room.push(<Occupied className='py-3' key={this.roomName+index} value={element} dst={this.props.dst}></Occupied>);
        })
        let bookingform = <></>
        if(this.state.display_Form){
            bookingform = <BookingForm value ={this.roomName} onClick={(bookingData)=>{this.addNewBooking(bookingData)}}/>
        }
        return (<div className='pt-3 mr-5 border ml-5 pl-5'>{this.roomName} <button className='bookNow position-absolute rounded btn-success px-2' onClick={() => this.displayBookingForm()}>Book Now</button><div className='position-relative  time-bar mt-3 mb-5' >{room}</div>{bookingform}</div>);
    }
}

class Dashboard extends React.Component{
    
    constructor(){
        super();
        this.dst =false
        this.state = {
            DST_active : false
        }
    }
    
    enableDST(){
        const checkbox = document.querySelector('#DST');
        this.dst = checkbox.checked ;
        
        this.setState({ DST_active : checkbox.checked });
    }

    render(){
        
        const roomSection=[];
        const timeSection=[] ;
        for(let i =0;i<24;i++){
            timeSection.push(<div className='time-line d-inline border border-secondary pl-1' key={'timeline'+i}>{i+':00'}</div>)
        }
        rooms.map((element,index)=>{
            roomSection.push(<Room className='p-3 mb-3' key={index} value={element} dst={this.dst} />);
        })
        return(<div className='containerfluid background py-5'>
                    <div className='pr-5 py-5 pl-4 rounded room-section'>
                        <h4 className='ml-5'><u className="text-dark">Time Line</u></h4>
                        <div className='pt-3 mr-5 pl-5 border ml-5 mb-3 time-Section pb-3 row'>
                            {timeSection}
                        </div>
                        <div className="d-flex justify-content-end pr-5">
                            <div className="input-group  w-25 mb-3">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="checkbox" id='DST'  onChange={()=>{this.enableDST()}}></input>
                                    </div>
                                </div>
                                <input type="text" className="form-control" value="Daylight Saving Time" readOnly></input>
                            </div>
                        </div>
                        {roomSection}
                    </div>
                </div>);
    }
} 

export {Dashboard};
