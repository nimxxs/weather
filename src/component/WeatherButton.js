import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div className='weather-button'>
        <Button variant="warning">현재 위치</Button>{' '}
        <Button variant="warning">PARIS</Button>{' '}
        <Button variant="warning">NEW YORK</Button>{' '}
    </div>
  )
}

export default WeatherButton