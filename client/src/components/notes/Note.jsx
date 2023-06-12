import React, { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';

export default function Note(props) {
  const { description, trailName, dayNumber, trailDirection, startLocation, endLocation, startMileMark, endMileMark, isFirst, isLast } = props;

  const calculateMileage = () => {
    const startMile = parseFloat(startMileMark);
    const endMile = parseFloat(endMileMark);
    if (!isNaN(startMile) && !isNaN(endMile)) {
      const distance = Math.abs(endMile - startMile).toFixed(2);
      return distance !== '0.00' ? `${distance} miles` : '';
    }
    return '';
  };

  const mileage = calculateMileage();

  return (
    <div className={`log-container ${isFirst ? 'first-item' : ''} ${isLast ? 'last-item' : ''}`}>
			<span className='note-span'>
				<h3 className='log-day'>Day {dayNumber}</h3>
				<p className='bullet'>|</p>
				<h3 className='log-mileage'>{mileage === "" ? "Zero" : mileage}</h3>
				<p className='bullet'>|</p>
				<h3 className='log-trail'>{trailName}</h3>
				<p className='bullet'>|</p>
				<h3 className='log-direction'>{trailDirection}</h3>
			</span>
    </div>
  );
}