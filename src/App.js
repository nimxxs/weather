import { useState, useEffect, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import userEvent from '@testing-library/user-event';
import ClipLoader from "react-spinners/ClipLoader";

// 1. app 실행 되자마자(userEffect 사용) 현재 위치 기반의 날씨가 보임.
// 1-1. 현재 위치를 가져온다.
// 2. 현재 위치, 섭씨, 화씨, 날씨 상태가 보임.
// 3. 5개의 버튼이 있다. (현재 위치 / 다른 도시들)
// 4. 도시 버튼을 클릭할 때 마다 도시별 날씨가 나옴.
// 5. 현재 위치를 누르면 다시 현재 위치 기반의 날씨가 업데이트 됨.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");

  const cities = ['PARIS', 'NEW YORK', 'TOKYO', 'SEOUL'];

  const getCurrentLocation = () => {
    // Geolocation API -> 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // lat, lon 가져오는 순간 getWeatherByCurrentLocation 함수 실행
      // 함수 실행하면서 lat, lon 넘기기
      getWeatherByCurrentLocation(lat, lon)
    });
  };
  // 넘어온 lat, lon을 매개변수로 받기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=95ab0c517a1cd478e155945eff5c1118&units=metric`
      // url을 호출해서 데이터를 가져올 동안 기다려라! 비동기!
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch(err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95ab0c517a1cd478e155945eff5c1118&units=metric`
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch(err) {
      setAPIError(err.message);
      setLoading(false);
    }
  }

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  }

  // UI가 다 그려진 후 useEffect 작동
  // useEffect componentUpdate 역할..
  useEffect(() => {
    if (city === null) {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]); // 현재 배열에 변수가 없으니 renter 후 바로 실행이 됨.

  // useEffect는 UI가 그려졌을 때,
  // 배열에 값이 있다면 배열에 있는 값이 바뀔 때마다 usetEffect가 호출이 된다.
  // useEffect(() => {
  //   getWeatherByCity()
  // }, [city]);

  return (
    <div>
      <div className='container'>
        {loading ? (
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        ) : !apiError ? (
        <div className='container'>
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
        </div>
      ) : (
      apiError
    )}
      </div>
    </div>
  );
}

export default App;
