import React from 'react'
import {useState, useEffect,useCallback} from 'react'
import { getMeterDataRoute } from "../utils/APIRoutes";
import Chart from "react-apexcharts";
import axios from 'axios'
import "./Dashboard.css";
import DatePicker from "react-datepicker";
import {UilCalendarAlt} from "@iconscout/react-unicons";
import "react-datepicker/dist/react-datepicker.css";

import ReactEcharts from "echarts-for-react"; 
import DateSelector from "./components/DateSelector";
function Dashboard() {
  
    
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
    
    const [meterData, setMeterData] = useState();
    const [loaded,setLoaded]= useState(false);
    const [startDate,setStartDate] = useState(new Date());
    var date = new Date();
date.setDate(date.getDate() - 7);
    const[endDate,setEndDate] = useState(date);
      useEffect(() => {
        

       fetchData();
        
         
  }, []);
  
  const fetchData = () => {
    const userId = JSON.parse(localStorage.getItem("app-user")).username;
    axios
     .post(getMeterDataRoute, {userId: userId,startDate: startDate,endDate: endDate })
     .then((res) => {
       let plot = [];
       

       let datas = res.data.data;
       //console.log(datas)
       for (let i = 0; i < datas.length; i++) {
         plot.push({
           x: getDateTime(datas[i].collect_time),
           y: datas[i].daily_flow,
         });
       }
       setMeterData(plot)
       setLoaded(true)
     
     }
     ).catch((err) => {
       console.log(err);
     }
     );}
 
let handleSubmitGraph = (e) => {
  e.preventDefault();
  fetchData();
}



    
    console.log(meterData);
  
  

  const options = {
    chart: {
     
      height: "auto",
        
    },fill: {
      colors: [ '#2a13bd'],
      opacity: 0.9,
      type: 'solid',
      gradient: {
          shade: 'dark',
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: []
      },
      image: {
          src: [],
          width: undefined,
          height: undefined
      },
      pattern: {
          style: 'verticalLines',
          width: 6,
          height: 6,
          strokeWidth: 2,
      },
    }
    ,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '100%',
       // borderRadius: 8,
        dataLabels: {
        //  position: 'top', // top, center, bottom
        },
      },
     
    },
    
    dataLabels: {
      enabled: false,
     
      offsetY: -10,
          style: {
            direction: 'vertical',
            fontSize: '12px',
            colors: ["#000000"]
          }
    },
    noData: {
      text: "null",
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "#000",
        fontSize: '14px',
        fontFamily: undefined
      }
    },
    yaxis: {
      forceNiceScale: true,
      decimalsInFloat: 2,
      axisBorder: {
        show: true,
        
      },
      axisTicks: {
        show: false,
      },
      logarithmic: false,
      logBase: 1.2,
    },
    xaxis: {
      type: 'datetime'
    },
    series: [{
      type:"column",
      name: 'Consumption',
      data: meterData
    }
    
   
  ]
  }
  
  
  if (loaded){  
  return (
    <div className="ChartContainer">
      <div className="date-select">

       <DateSelector
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate= {setStartDate}
        />
        <button type="submit" onClick={handleSubmitGraph} >Submit</button>
        </div>
     
   {meterData&& <Chart series={options.series} type ="bar"  options={options}/>}
   
  </div>
   
  )}
  else{ return(
    <div className="dash-loading">loading</div>
  )}
}

export default Dashboard