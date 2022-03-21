import React, { useState, useEffect } from 'react';
import {Routes, Route, useNavigate } from 'react-router-dom';


const api = {
  key: "b1d540951938a89881163ceef66dc44a",
  base: "https://api.openweathermap.org/data/2.5/"
}

const api1 = {
  key: "eaee62b8c3d72802e5fbb6622fedf06c",
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {
  

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const [query1, setQuery1] = useState('');
  const [weather1, setWeather1] = useState({});

  const [check, SetCheck] = useState('');

  let navigate = useNavigate();

  

  

  useEffect(() => {
    fetch(`${api.base}weather?q=${"London"}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });


    fetch(`${api1.base}onecall?lat=${"51.5085"}&lon=${"-0.1257"}&units=metric&APPID=${api1.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather1(result);
          setQuery1('');
          console.log(result);
        });
  }, [])

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);

          fetch(`${api1.base}onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&APPID=${api1.key}`)
          .then(res => res.json())
          .then(result => {
          setWeather1(result);
          setQuery1('');
          console.log(result);
        });
         
        });
    }
  }

  
  const checkFalse = e => {
    SetCheck(true)
    console.log("it happened");
  }

  const checkTrue = e => {
    SetCheck(false)
    console.log("it happened again");
  }
  



  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

 
 if (check == false) {
  return (

    /*
      const [check, setCheckFalse] = useState('');
      
    */

    <div className="app">


      
   
      
      
      {(typeof weather.main != "undefined") ? (
      <main className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'color hot' : 'color warm') : 'color' }>
        
        
        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'weather-details hot' : 'weather-details warm') : 'weather-details' }>

          <div className="search-box">
            <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
          </div>


          

          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
          <div className="weather">{weather.weather[0].main}</div>
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
          </div>

          <button className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'button hot' : 'button warm') : 'button' }  type="button" 
          onClick={checkFalse}><p>Today</p>
          </button> 

          <div >
            <p className="line">
            </p>
            <h1>Wind Speed </h1>
            <h2>Atm Pressure </h2>
            <p className="margin">
              <p className="wind">
                <p className="speed">
                  {Math.round(weather.wind.speed)}m/s
                </p>
              </p>
              <p className="pressure">
                {weather.main.pressure}hPA
              </p>
            </p>
            

          </div>
        </div>
      </main>
    ) : ('')}
    </div>
  )
 } else {
   return (
     <div>

      {(typeof weather.main != "undefined") ? (
      <main className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'color hot' : 'color warm') : 'color' }>
       <button className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'button hot' : 'button warm') : 'button' }  type="button" 
          onClick={checkTrue}><p>Today</p>
          </button> 
        <div>
          {weather1.daily[0].temp.day}
          {weather.main.temp}
        </div>
        <div>
        {new Date(weather1.hourly[0].dt*1000).getHours().toLocaleString()}:00
        </div>
     
      </main>
      ) : ('')}
     </div>
   
   
   )
 };

  
}




export default App;