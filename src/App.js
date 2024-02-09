// import Component1 from "./component1";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // let time = new Date().toLocaleTimeString();
  const [weather, setWeather] = useState(null);
  const [greet, setGreet] = useState("");
  const [currTime, setcurrTime] = useState(null);

  let updateTime = () => {
    // time = new Date().toLocaleTimeString();
    setcurrTime(new Date().toLocaleTimeString());
  }  

  useEffect(() => {
    setInterval(updateTime, 1000);

    const hours = new Date().getHours();
    if(hours >=4 && hours < 12){
      setGreet("Good Morning");
    }
    else if(hours >= 12 && hours < 16){
      setGreet("Good Afternoon");
    }
    else if(hours >= 12 && hours < 20) {
      setGreet("Good Evening");
    }
    else {
      setGreet("Good Night");
    }
  }, []);

  useEffect(() => {
    const fetchweatherData = async (latitude, longitude) => {
      try {
        const getWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f47439f47c28317f8d78c53ebc75575a`
        );
        setWeather(getWeather.data);
        // console.log("Weather Info: ", getWeather.data);
      } 
      catch (error) {
        console.error(error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
          // console.log("LOCATION : ",position)
          const { latitude, longitude } = position.coords;
          fetchweatherData(latitude, longitude);
        });
      } 
      else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);
  

  return (
    <>
    <div className='App'>
      <h1>Hi Chandrahas</h1>
      <h3>{greet}, The current time is {currTime}</h3>
      {weather && (<>
        <h5> The weather at Location - { weather.name } is </h5>
        <p>Weather: {weather.weather[0].main}</p>
        <p>Description: {weather.weather[0].description}</p>
        </>
      )}
    </div>
    </>
  );
}

export default App;
