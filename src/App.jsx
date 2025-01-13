import React, { useEffect, useState } from 'react'
import './App.css'

import clear from './Assets/clear.png'
import drizzle from './Assets/drizzle.png'
import cloud from './Assets/cloud.png'
import rain from './Assets/rain.png'
import snow from './Assets/snow.png'

import { WiHumidity } from "react-icons/wi";
import { CiSearch } from "react-icons/ci";
import { FaWind } from "react-icons/fa6";

const App = () => {
  const [city , setCity] = useState('');
  const [weatherdata , setWeatherdata] = useState(null);


  const fetchWeather=async(city)=>{
    try {
       const apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
      const data = await apiData.json();
      console.log(data);
      setWeatherdata(data);
    } catch (error) {
      console.log(error.message || error || 'Server error');
    }
  };

  useEffect(()=>{
    fetchWeather('kolkata');
  },[])

  return (
    <div className="app">
      <h1>Weather Forcast</h1>
      <div className="container">
        <div className="search-part">
          <input type="text" placeholder='search' value={city} onChange={(e)=>setCity(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === 'Enter'){
              fetchWeather(city);
            }
          }}
          />
          <CiSearch  className='search-icon' onClick={()=>fetchWeather(city)}/>
        </div>

        {
          weatherdata && (
            <>
            <div className="weather-image">
            <img
                src={`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
              <div className='desc'>{weatherdata.weather[0].description}</div>
        </div>
        <div className="temprature-city"><p className='temp'>{Math.round(weatherdata.main.temp)}°c</p><p className='city'>{weatherdata.name}</p></div>
        <div className="humidity-windSpeed">
          <div className="humidity">
            <WiHumidity className='hw-logo'/>
          <div className="humidity-data">
          <span className='hw-value'>{weatherdata.main.humidity}%</span>
          <span className='hw-name'>Humidity</span>
          </div>
          </div>
        
        <div className="wind">
          <FaWind  className='hw-logo'/>
          <div className="wind-data">
          <span className='hw-value'>{weatherdata.wind.speed} km/h</span>
          <span className='hw-name'>Wind Speed</span>
          </div>
        </div>
        </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default App