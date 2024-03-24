import React from 'react'

// {weather} => props라는 object에서 weather만 가져온다.
const WeatherBox = ({weather}) => {
    console.log("weather?", weather);
  if (!weather || !weather.main || typeof weather.main.temp === 'undefined') {
    return <div>날씨 정보를 불러오는 중입니다..</div>;
  }
  return (
    <div className='weather-box'>
        <div>{weather.name}</div> 
        <h2>{weather.main.temp}°C / {weather.main.temp * 1.8 + 32}°F </h2>
        <h3>{weather.weather[0].main}</h3>
    </div>
  )
}

export default WeatherBox