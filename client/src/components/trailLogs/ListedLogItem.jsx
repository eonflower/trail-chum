import React from 'react';

const ListedLogItem = (props) => {
  const { trailName, dayNumber, trailDirection, startMileMark, endMileMark, isFirst, isLast } = props;

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
				{dayNumber === null ? <h3 className='log-span log-day'>Day ??</h3> : <h3 className='log-span log-day'>Day {dayNumber}</h3>}
				<p className='bullet'>|</p>
				<h3 className='log-span log-mileage'>{mileage === "" ? "Zero" : mileage}</h3>
				<p className='bullet'>|</p>
				<h3 className='log-span log-trail'>{trailName}</h3>
				<p className='bullet'>|</p>
				<h3 className='log-span log-direction'>{trailDirection}</h3>
			</span>
    </div>
  );
}

export default ListedLogItem;