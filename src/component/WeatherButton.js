import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, selectedCity, handleCityChange}) => {
  console.log("cities?", cities)
  return (
    <div className='weather-button'>
        <Button variant={`${selectedCity === null ? "outline-warning" : "warning"}`} onClick={() => handleCityChange("current")}>현재 위치</Button>

        {cities.map((city)=>(
          // stateless끼리는 데이터를 주고 받지 못하기 때문에, stateful(App.js)에서 데이터를 가져와야한다.
          // 그래서 stateless에는 어떠한 state도 가지고 있지 않음!
          // onClick. 즉, 클릭하면 setCity 함수를 실행시켜라.
          // setCity 함수는 어디에 있다? App.js 에 있다.
          <Button variant={`${selectedCity === city ? "outline-warning" : "warning"}`} onClick={() => handleCityChange(city)}> 
            {city}
          </Button>
          ))}
    </div>
  )
}

export default WeatherButton