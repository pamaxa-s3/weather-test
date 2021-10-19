import React from 'react'
import './WeatherForm.css'

const WeatherForm = props => (
   <form onSubmit={props.getWeather} className='WeatherForm'>
      <input type="text" name="city" placeholder="Enter your city" />
      <button>Getting the weather</button>
   </form>
)

export default WeatherForm