import React, { useState, useEffect } from 'react';


/* two api's are used, one for data for the current day and the other for data of the current week */
const api = {
  key: "b1d540951938a89881163ceef66dc44a",
  base: "https://api.openweathermap.org/data/2.5/"
}

const api1 = {
  key: "eaee62b8c3d72802e5fbb6622fedf06c",
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {
  
  /* variables weather and weather1 will store the results from the api, query will be used for search purposes and check is 
  for changing of pages */
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const [weather1, setWeather1] = useState({});

  const [check, SetCheck] = useState('');



  

  
  /* these two fetch commands will be called right in the beginning. The default location is set to london */
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
          console.log(result);
        });
  }, [])
  
  /* as soon as search is called, the data of a location will be fetched using the base and api key. Query holds the name of the 
  location */
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
      
      /* this uses the results of the first api (for latitude and longitude) */    
      fetch(`${api1.base}onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&units=metric&APPID=${api1.key}`)
        .then(res => res.json())
        .then(result => {
        setWeather1(result);
        console.log(result);
        });
         
        });
    }
  }

  /* changes the value of check depending on what button is pressed */
  const checkFalse = e => {
    SetCheck(true)
  }

  const checkTrue = e => {
    SetCheck(false)
  }
  


  /* The date builderis events used for creation of current date*/
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const dayBuilder = (d,i1) => { // method used is similar to the one above however its purpose is to return the name of the days of the next 5 days
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day1 = d.getDay();
    console.log(d.getDay())
    
    for (let i = 1; i < i1 + 1 ; i++) {
      if(day1 >= 6){
        day1 = 0;
      }
      else{
        day1 += 1;
      }
    }
    let day = days[day1]
    

    return `${day}`
  }


 /* only return it if check is false. Note -> check will intially be false */
 if (check == false) {
  return (

    /* main div returned */
    <div className="app">


      {/* checking whether the variables where the api returned object is stored are empty or not */}
      {(typeof weather.main != "undefined" && typeof weather1.daily != "undefined") ? (
      
      /* main class. Note -> The classname of multiple components included the main component is decided based on the temperature
      This is because of mainly the background color */
      <main className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'color hot' : 'color warm') : 'color' }>
        
        
        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'weather-details hot' : 'weather-details warm') : 'weather-details' }>

        {/* main search box. Calls the search event when a key is pressed. The key is later checked to be enter */}
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


          
          {/* some of the main data for the app. Each text has a unique css style hence div is used constantly */}
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
          <div className="weather">{weather.weather[0].main}</div>
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
          </div>
          
          {/* When this button is pressed, check is changed to true and the return value changes therefore the page outlet changes */}
          <button className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'button hot' : 'button warm') : 'button' }  type="button" 
          onClick={checkFalse}><p>Today</p>
          </button> 

          {/* data for windspeed and atmospheric pressure */}
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

        <div class="scrolling-wrapper"> {/*the purpose of this class is to create a horizontal scrolling effect that allows the user to view the tempreatures of the next 5 days*/} 
            <div class="card">
            <h2>{Math.round(weather1.daily[1].temp.day)}°c</h2> 
              <br></br>
              <h2>{dayBuilder(new Date,1)}</h2> 
            </div>
            <div class="card">
              <h2>{Math.round(weather1.daily[2].temp.day)}°c</h2>
              <br></br>
              <h2>{dayBuilder(new Date,2)}</h2>
            </div>
            <div class="card">
              <h2>{Math.round(weather1.daily[3].temp.day)}°c</h2>
              <br></br>
              <h2>{dayBuilder(new Date,3)}</h2>
            </div><div class="card">
              <h2>{Math.round(weather1.daily[4].temp.day)}°c</h2>
              <br></br>
              <h2>{dayBuilder(new Date,4)}</h2>
            </div><div class="card">
              <h2>{Math.round(weather1.daily[5].temp.day)}°c</h2>
              <br></br>
              <h2>{dayBuilder(new Date,5)}</h2>
            </div>

        </div>
      </main>
    ) : ('')}
    </div>
  )

  /* if check is true */
  /*  */
 } else {
   return (
     <div >

      {(typeof weather.main != "undefined") ? (
      <main className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'color hot' : 'color warm') : 'color' }>

       {/* button to change check to false therefore taking you back to the original page outlet */}
       <button className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'secondButton hot' : 'secondButton warm') : 'secondButton' }  type="button" 
          onClick={checkTrue}><p>Back</p>
          </button>


       {/* The 12 piece of div components are used for showing data (temp, hour and icon) of the next 24 hours (one of every 2 hours)
        */}
       <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime hot' : 'iconTime warm') : 'iconTime' }>
          <div className='data'>{new Date(weather1.hourly[0].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[0].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[0].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime2 hot' : 'iconTime2 warm') : 'iconTime2' }>
          <div className='data'>{new Date(weather1.hourly[2].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[2].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[2].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime hot' : 'iconTime warm') : 'iconTime' }>
          <div className='data'>{new Date(weather1.hourly[4].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[4].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[4].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime2 hot' : 'iconTime2 warm') : 'iconTime2' }>
          <div className='data'>{new Date(weather1.hourly[6].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[6].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[6].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>
        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime hot' : 'iconTime warm') : 'iconTime' }>
          <div className='data'>{new Date(weather1.hourly[8].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[8].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[8].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>
        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime2 hot' : 'iconTime2 warm') : 'iconTime2' }>
          <div className='data'>{new Date(weather1.hourly[10].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[10].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[10].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        

       <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime hot' : 'iconTime warm') : 'iconTime' }>
          <div className='data'>{new Date(weather1.hourly[12].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[12].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[12].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime2 hot' : 'iconTime2 warm') : 'iconTime2' }>
          <div className='data'>{new Date(weather1.hourly[14].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[14].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[14].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime hot' : 'iconTime warm') : 'iconTime' }>
          <div className='data'>{new Date(weather1.hourly[16].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[16].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[16].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime2 hot' : 'iconTime2 warm') : 'iconTime2' }>
          <div className='data'>{new Date(weather1.hourly[18].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[18].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[18].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime hot' : 'iconTime warm') : 'iconTime' }>
          <div className='data'>{new Date(weather1.hourly[20].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[20].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[20].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>

        <div className={(weather.main.temp > 12) ? ((weather.main.temp > 24) ? 'iconTime2 hot' : 'iconTime2 warm') : 'iconTime2' }>
          <div className='data'>{new Date(weather1.hourly[22].dt*1000).getHours().toLocaleString()}:00</div>
          <div className='tempMargin'>{Math.round(weather1.hourly[22].temp)}°c</div>
          <img id="wicon" className='iconMargin' src={"http://openweathermap.org/img/wn/"+ weather1.hourly[11].weather[0].icon + ".png"} alt="Weather icon"/>
        </div>
      
     
      </main>
      ) : ('')}
     </div>
   
   
   )
 };

  
}




export default App;