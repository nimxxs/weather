import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity}) => {
  console.log("cities?", cities)
  return (
    <div className='weather-button'>
        <Button variant="warning">현재 위치</Button>

        {cities.map((item, index)=>(
          // stateless끼리는 데이터를 주고 받지 못하기 때문에, stateful(App.js)에서 데이터를 가져와야한다.
          // 그래서 stateless에는 어떠한 state도 가지고 있지 않음!
          // onClick. 즉, 클릭하면 setCity 함수를 실행시켜라.
          // setCity 함수는 어디에 있다? App.js 에 있다.
          <Button variant='warning' key={index} onClick={() => setCity(item)}> 
            {item}
          </Button>
          ))}
    </div>
  )
}

export default WeatherButton