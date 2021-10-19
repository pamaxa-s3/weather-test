import React from 'react'
import './WeatherInfo.css'

const WeatherInfo = props => (
   <div className='WeatherInfo'>
      {
         props.error
            ? <div>
               <p>{props.error}</p>
            </div>
            : <div>
               <p>City: {props.city}</p>
               <p>Temperatura: {props.temp}</p>
               <p>Icon: <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="Weather Icon" /></p>
            </div>
      }
   </div>
)

export default WeatherInfo