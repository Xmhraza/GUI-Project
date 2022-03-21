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

          fetch(`${api1.base}onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&units=metric&APPID=${api1.key}`)
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
       <button className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'secondButton hot' : 'secondButton warm') : 'secondButton' }  type="button" 
          onClick={checkTrue}><p>Today</p>
          </button>


       <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime hot' : 'iconTime warm') : 'iconTime' }>
          <div className='data'>{new Date(weather1.hourly[0].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[0].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[0].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime2 hot' : 'iconTime2 warm') : 'iconTime2' }>
          <div className='data'>{new Date(weather1.hourly[1].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[1].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[1].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime hot' : 'iconTime warm') : 'iconTime' }>
          <div className='data'>{new Date(weather1.hourly[2].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[2].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[2].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime2 hot' : 'iconTime2 warm') : 'iconTime2' }>
          <div className='data'>{new Date(weather1.hourly[3].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[3].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[3].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>
        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime hot' : 'iconTime warm') : 'iconTime' }>
          <div className='data'>{new Date(weather1.hourly[4].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[4].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[4].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>
        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime2 hot' : 'iconTime2 warm') : 'iconTime2' }>
          <div className='data'>{new Date(weather1.hourly[5].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[5].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[5].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        

       <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime hot' : 'iconTime warm') : 'iconTime' }>
          <div className='data'>{new Date(weather1.hourly[6].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[6].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[6].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime2 hot' : 'iconTime2 warm') : 'iconTime2' }>
          <div className='data'>{new Date(weather1.hourly[7].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[7].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[7].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime hot' : 'iconTime warm') : 'iconTime' }>
          <div className='data'>{new Date(weather1.hourly[8].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[8].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[8].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime2 hot' : 'iconTime2 warm') : 'iconTime2' }>
          <div className='data'>{new Date(weather1.hourly[9].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[9].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[9].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime hot' : 'iconTime warm') : 'iconTime' }>
          <div className='data'>{new Date(weather1.hourly[10].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[10].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[10].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime2 hot' : 'iconTime2 warm') : 'iconTime2' }>
          <div className='data'>{new Date(weather1.hourly[11].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[11].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[11].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>
      
     
      </main>
      ) : ('')}
     </div>
   
   
   )
 };

  
}




export default App;