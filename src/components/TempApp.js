import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../css/style.css";
import { FaStreetView } from "react-icons/fa";
import { BsCloudFogFill } from "react-icons/bs";
import { BsFillCloudHazeFill } from "react-icons/bs";
import { IoMdSunny} from "react-icons/io";
import { IoPartlySunny} from "react-icons/io5";
import {IoRainySharp } from "react-icons/io5";
import Clock from "./Clock";

const TempApp=()=>{

    const date=new Date();
    const todayDate=date.getDate();
    const month=date.getMonth();
    const msecond=date.getMilliseconds();
    

    //useState for gettign the city name
    const [city,setcity]=useState(null);

    const [search, setSearch]=useState("Jaipur");
    const [target,setTarget]=useState(search);

    const API=`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=55403297c4c4f0033c1bc80a66bb90fe&units=standard`;

    const getCity= async(url)=>{
        const res=await axios.get(url);
        console.log(res.data);
        const dat=await res.data;
        setcity(dat);
    }
    useEffect(()=>{
        try{
        getCity(API);
        }catch(e){
            console.log(e);
        }
    },[target]);

    
    return (
        <div className="FirstBox">
            <div className="secondBox">
                <div>
               <h1> <Clock /> </h1>
                </div>
        <div>
            
            <input type="search" onChange={(event)=>{
                setSearch(event.target.value)
            }} placeholder="Enter your city"></input>
            <button type="submit" onClick={()=>{
                setTarget(search);
            }}>Submit</button>
        </div>
        {!city ? (<p>No data found</p>):(
            <div>
                <div className="clear">
                {city.weather[0].main==="Haze" ? <BsFillCloudHazeFill style={{ fontSize: "6em", width: "20%", margin: "0%"}}/> : null}
                {city.weather[0].main==="Clear" ? <IoMdSunny style={{ fontSize: "6em", width: "20%", margin: "0%"}}/> : null}
                {city.weather[0].main==="Clouds" ? <IoPartlySunny style={{ fontSize: "6em", width: "20%", margin: "0%"}}/> : null}
                {city.weather[0].main==="Rain" ? <IoRainySharp style={{ fontSize: "6em", width: "20%", margin: "0%"}}/> : null}
                {city.weather[0].main==="Fog" ? <BsCloudFogFill style={{ fontSize: "6em", width: "20%", margin: "0%"}}/> : null}
            </div>
                <h1><span className="street">< FaStreetView style={{color: 'red'}}/> </span>{target}</h1>
                <h1>{parseFloat((city.main.temp-273).toFixed(2))} ºC</h1>
                <h3>Wind Speed: {city.wind.speed}Km/h</h3 >
                <h3>Weather: {city.weather[0].main}</h3>
            </div>
        )
        }
        </div>
         </div>
    );
}

export default TempApp;