import React, { Component } from 'react';
import WeatherForm from './components/WeatherForm/WeatherForm';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import { API_KEY } from './helper/API_KEY';
import './App.css'
import RangeBackground from './components/RangeBacground/RangeBackground';

// let api = "http://api.openweathermap.org/data/2.5/weather?"

class App extends Component {

  state = {
    lon: null,
    lat: null,
    temp: null,
    city: null,
    icon: null,
    error: null
  }

  // Получение данных о погоде при первом входе на страницу
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const responseFirst = `https://www.metaweather.com/api/location/search/?lattlong=${position.coords.latitude},${position.coords.longitude}`;

        // для этого запроса нужно купить соответствующий тарифный план
        // const response = `http://api.openweathermap.org/data/2.5/weatherlat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`;

        fetch(responseFirst)
          .then(res => res.json())
          .then(result => (fetch(`http://api.openweathermap.org/data/2.5/weather?q=${result[0].title}&appid=${API_KEY}&units=metric`)))
          .then(response => response.json())
          .then(data => {
            if (data.cod === 200) {
              this.setState({
                lon: data.coord.lon,
                lat: data.coord.lat,
                temp: data.main.temp,
                city: data.name,
                icon: data.weather[0].icon,
                error: ''
              })
            }
            this.setState({
              error: data.message
            })
          })
      });
    }
  }

  // Получение данных о погоде по введению города

  getWeatherHandler = async (e) => {
    e.preventDefault()

    const city = e.target.elements.city.value

    if (city) {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      const data = await response.json()

      if (data.cod === 200) {
        this.setState({
          lon: data.coord.lon,
          lat: data.coord.lat,
          temp: data.main.temp,
          city: data.name,
          icon: data.weather[0].icon,
          error: ''
        })
      }
      this.setState({
        error: data.message
      })
    } else {
      this.setState({
        lon: null,
        lat: null,
        temp: null,
        city: null,
        icon: null,
        error: 'Enter the city'
      })
    }
  }

  render() {

    // Красим фон
    const divStyle = {
      'background': null
    }

    if (this.state.temp < (-10)) {

      divStyle.background = "#00ffff"
    }
    if (this.state.temp >= (-10) && this.state.temp <= 10) {

      divStyle.background = "#fff700"
    }

    if (this.state.temp > 10 && this.state.temp <= 30) {

      divStyle.background = "#ff8c00"
    }

    if (this.state.temp > 30) {

      divStyle.background = "#ffad00"
    }

    return (
      <div style={divStyle} className='App'>
        <WeatherForm
          getWeather={this.getWeatherHandler}
        />
        <WeatherInfo
          {...this.state}
        />
        <RangeBackground />
      </div >
    );
  }
}

export default App;