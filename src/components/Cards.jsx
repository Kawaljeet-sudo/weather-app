import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Cards = ({ count, forecast }) => {
  return (
    <>
      <Card style={{
        width: '18rem',
        transition: 'transform 0.2s ease-in-out',
        textAlign: 'center',
        backgroundColor: 'transparent'
      }} className='hover-effect blur-card'>
        <Card.Body>
          <Card.Title>
            {forecast.date}
          </Card.Title>
          <img src={forecast.day.condition.icon} style={{ textAlign: 'center' }} />
          <h2 style={{ textAlign: 'center', fontWeight: '900' }}>{forecast.day.avgtemp_c}°C</h2>
          <p>{forecast.day.mintemp_c}°C/{forecast.day.maxtemp_c}°C</p>
        </Card.Body>
      </Card>
    </>
  )
}

export default Cards