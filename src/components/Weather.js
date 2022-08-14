import React, { useState } from 'react'
import videoBg from '../assets/videoBg.mp4'

let img = "http://openweathermap.org/img/wn/"

const Weather = () => {
    const [search, setSearch] = useState("")
    const [weather, setWeather] = useState({});
  
    //klikom na button fetchuju se podaci sa apija u json formatu
    const searchPressed = () => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=487083d1af077993c1e617c08a37d55e`)
        .then((res) => res.json())
        .then((result) => {
          //console.log(result) 
          setWeather(result)
        });
    };

  return (
    <div>
        <video src={videoBg} autoPlay loop muted  className='background'/>
        <div className='container'>
      <input type="text" placeholder="Enter location..." onChange={(e) => setSearch(e.target.value)} />
      <button className='btn' onClick={searchPressed}>Search</button>
     {typeof weather.main !== "undefined" ? (
        <div className='content'>
      <p className='city'>{weather.name}</p>
      <div className='weather'>
      <p className='temperature'>{(weather.main.temp - 273.15).toFixed(0)}° C</p>
          <div className='flex'>
            <p className='condition'>{weather.weather[0].main}</p>
            <p className='condition'>({weather.weather[0].description})</p>
            <p className='condition'>Feels like {(weather.main.feels_like - 273.15).toFixed(0)}° C</p>
            <div> <img alt="weather icons" className="oblak" src={img + weather.weather[0].icon + '.png'}  />  </div>
          </div>
          </div>
        </div>
      ) : (
        <p className="title">Enter a location to find the weather...</p>
      )}

    </div>
    </div>
  )
}

export default Weather