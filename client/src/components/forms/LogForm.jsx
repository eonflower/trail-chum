import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';
import Radio from '../Radio';
import Inputs from '../Inputs';
import Textarea from '../Textarea';

export default function LogForm(props) {
  const{ logId, setIsEditMode, isEditMode} = props
  const { trail: trailId } = useParams();
  const navigate = useNavigate();
  const { addLog, updateLog, trails, logs } = useContext(UserContext);
  const [trailSelected, setTrailSelected] = useState(false);
  const [trailValidationErr, setTrailValidationErr] = useState("");
  const [dateSelected, setDateSelected] = useState(false);
  const [dateValidationErr, setDateValidationErr] = useState("");
	
	
  const initInputs = {
    dayNumber: '',
    date: '',
    trail: trailId || '',
		trailName: '',
    trailDirection: 'NOBO',
    startLocation: '',
    startMileMark: '',
    endLocation: '',
    endMileMark: '',
    description: ''
  };

  const [inputs, setInputs] = useState(initInputs);

	useEffect(() => {
    if (logId) {
      const log = logs.find((log) => log._id === logId);
      if (log) {
        setInputs(log);
      }
    }
  }, [logId, logs]);

  const selectionHandler = (e) => {
    const { name, value } = e.target;
      if (name === 'trail' && value !== '') {
        setTrailSelected(true);
        setTrailValidationErr("");
      } else {
        setTrailSelected(false);
      }
  
      if (date === 'date' && value !== '') {
        setDateSelected(true);
        setDateValidationErr("");
      } else {
        setDateSelected(false);
      }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let cleanedValue;
  
    if (name === 'dayNumber') {
      // Remove non-numeric characters
      cleanedValue = value.replace(/\D/g, ''); 
    } 
      // Remove non-numeric characters and limit to two decimal places
      let numberText = value.replace(/[^0-9.]/g, ''); 
  
      const decimalParts = numberText.split('.');
      let formattedNumber = decimalParts[0];
      if (decimalParts.length > 1) {
        formattedNumber += '.' + decimalParts[1].slice(0, 2);
  
    }
  
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: name.includes('MileMark') ? formattedNumber : value,
      [name]: name === 'dayNumber' ? cleanedValue : value,
    }));
  
    selectionHandler(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const selectedTrail = trails.find((t) => t._id === inputs.trail);
    const updatedInputs = {
      ...inputs,
      trailName: selectedTrail ? selectedTrail.trailName : '',
    };
  
    const isDateSelected = inputs.date !== '';
    const isTrailSelected = inputs.trail !== '';
  
    if (!isDateSelected && !isTrailSelected) {
      setTrailValidationErr("Please select a trail first");
      setDateValidationErr("Please select a date first");
    } else if (!isDateSelected) {
      setTrailValidationErr("");
      setDateValidationErr("Please select a date first");
    } else if (!isTrailSelected) {
      setDateValidationErr("");
      setTrailValidationErr("Please select a trail first");
    } else {
      setTrailValidationErr("");
      setDateValidationErr("");
      if (isEditMode) {
        updateLog(logId, updatedInputs);
        setIsEditMode(false);
      } else {
        addLog(updatedInputs);
        setInputs(initInputs);
        navigate('/logs');
      }
    }
  };
	

  const calculateDistance = () => {
    const startMile = parseFloat(inputs.startMileMark);
    const endMile = parseFloat(inputs.endMileMark);
    if (!isNaN(startMile) && !isNaN(endMile)) {
      const distance = Math.abs(endMile - startMile).toFixed(2);
      return distance !== '0.00' ? `${distance} miles` : '';
    }
    return '';
  };

  const { dayNumber, date, trail, trailDirection, startLocation, startMileMark, endLocation, endMileMark, description } = inputs;

  return (
    <form className='log-form' onSubmit={handleSubmit}>
			<div className='log-input trail'>
          <label>Trail:</label>
          <span>
            <select
							name='trail' 
							value={trail} 
							className='select-trail'
							onChange={handleChange}>
              <option value=''>Select Trail</option>
              {trails && trails?.map((trailOption) => (
                <option 
									key={trailOption._id} 
									value={trailOption._id}>
                  {trailOption.trailName}
                </option>
              ))}
            </select>
					</span>
				</div>
          <Inputs
            label='Day Number'
            type='text'
            name='dayNumber'
            value={dayNumber}
            onChange={handleChange}
            maxLength={4}
          />
          <Inputs
            label='Date'
            type='date'
            name='date'
            value={date}
            onChange={handleChange}
          />
          <div className='log-input'>
          <div className='log-title-block'>
          <label>Trail Direction:</label>
        </div>
            <Radio
              label='NOBO'
              type='radio'
              name='trailDirection'
              value='NOBO'
              checked={trailDirection === 'NOBO'}
              onChange={handleChange}
            />
            <Radio
              label='SOBO'
              type='radio'
              name='trailDirection'
              value='SOBO'
              checked={trailDirection === 'SOBO'}
              onChange={handleChange}
            />
            <Radio
              label='WEBO'
              type='radio'
              name='trailDirection'
              value='WEBO'
              checked={trailDirection === 'WEBO'}
              onChange={handleChange}
            />
            <Radio
              label='EABO'
              type='radio'
              name='trailDirection'
              value='EABO'
              checked={trailDirection === 'EABO'}
              onChange={handleChange}
            />
          </div>
      <h3 className='log-title'>Where'd you start the day?</h3>
          <Inputs
            label='Location'
            type='text'
            name='startLocation'
            value={startLocation}
            onChange={handleChange}
            maxLength={40}
          />
          <Inputs
            label='Mile Mark'
            type='text'
            name='startMileMark'
            value={startMileMark}
            onChange={handleChange}
            maxLength={6}
          />
      <h3 className='log-title'>Where'd you end the day?</h3>
          <Inputs
            label='Location'
            type='text'
            name='endLocation'
            value={endLocation}
            onChange={handleChange}
            maxLength={40}
          />
          <Inputs
            label='Mile Mark'
            type='text'
            name='endMileMark'
            value={endMileMark}
            onChange={handleChange}
            maxLength={6}
          />
      <div className='log-input'>
        <p>Distance:</p>
        <p>{calculateDistance()}</p>
      </div>
      <h3 className='log-title'>What happened this day?</h3>
        <Textarea
          label='Notes'
          name='description'
          className='notes-textarea'
          value={description}
          onChange={handleChange}
        />
      <div className='button-container'>
			<button className='post-btn' onClick={handleSubmit}>
				{isEditMode ? 'Save Log' : 'Add Log'}
			</button>
      </div>
      {trailValidationErr && <p className='trail-validation-err'>{trailValidationErr}</p>}
      {dateValidationErr && <p className='date-validation-err'>{dateValidationErr}</p>}
    </form>
  );
}