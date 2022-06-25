import React from 'react'
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import {UilTimes,UilTear,UilQrcodeScan  ,UilDashboard ,UilBatteryBolt ,UilCalendarAlt ,UilChatBubbleUser ,UilTachometerFast ,UilTachometerFastAlt ,UilChart } from "@iconscout/react-unicons";
import './card.css'
import { getMeterMetaDataRoute } from "../../../utils/APIRoutes";
function Card() {
  function getDateTime(timestamp) {
    var a = new Date(timestamp * 1000);

    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + " " + month + " " + year;
    return time;
  }
  

  const [meterMeta, setMeterMeta] = useState([]);
  const loaded = useRef(false)
  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("app-user")).username;
    console.log("use effect call")
    axios
    .post(getMeterMetaDataRoute, { userId })
    .then((res) => {setMeterMeta( res.data.data)
      console.log(res.data.data)
    loaded.current=true}
    ).catch((err) => {
      console.log(err);
    }
    );
            
  }, []);
  
 if (loaded.current){
  console.log(meterMeta);
 // getMeterMetaData
  return (
    
    <div className="cards-house">
        <h2><UilChatBubbleUser/></h2>
     <h3>Hi There Water user!</h3>
        <div className="cards-basket">
        <div className="header">
        <span><UilQrcodeScan /><h3>Meter Code</h3>  {meterMeta&&<h4> {meterMeta[0].meter_code}</h4>}</span>
    </div>
    <div className="header">
    <span><UilCalendarAlt/><h3>For date</h3>{ meterMeta&&<h4>{getDateTime(meterMeta[0].collect_time)}</h4> }</span>
     <span><UilTachometerFastAlt/><h3>Meter Reading</h3>{ meterMeta&&<h4>{meterMeta[0].accumulate_flow}</h4> }</span>
      
    </div>

    <div className="header">
    <span><UilTachometerFast/><h3>Daily usage</h3>{ meterMeta&&<h4>{meterMeta[0].daily_flow}</h4> }</span>
     <span><UilBatteryBolt/><h3>Battery Level</h3>{ meterMeta&&<h4>{meterMeta[0].battery_voltage}</h4> }</span>
     
    </div>
    </div>
  </div>
  )}
  else{
    return (<div className="card-loading">loading</div>);
  }
}

export default Card;