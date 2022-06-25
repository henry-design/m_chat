import React from 'react'
import  { useState } from "react";

import "./DateSelector.css"
import DatePicker from "react-datepicker";
import {UilCalendarAlt} from "@iconscout/react-unicons";
import "react-datepicker/dist/react-datepicker.css";

function DateSelector({startDate,endDate,setStartDate,setEndDate}) {
  
  return (
    <div className="date-selector">
      
    <div className="date-picker-container">
      <UilCalendarAlt/>
<h4>Start Date</h4>
  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  </div>
  <div className="date-picker-container">
    <UilCalendarAlt/>
<h4>End Date</h4>
  <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
  </div>
  </div>
  )
}

export default DateSelector