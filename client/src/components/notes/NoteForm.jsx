import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';

export default function NoteForm({noteId, setIsEditMode, isEditMode}) {
  const { trail: trailId } = useParams();
  const { addNote, updateNote, trails, notes } = useContext(UserContext);
	
	
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
	// const [isEditMode, setIsEditMode] = useState(false);

	useEffect(() => {
    if (noteId) {
      const note = notes.find((note) => note._id === noteId);
      if (note) {
        setInputs(note);
      }
    }
  }, [noteId, notes]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));

    if (name === 'trail' && value !== '') {
      setTrailSelected(true);
    } else {
      setTrailSelected(false);
    }
  };

	const handleSubmit = (e) => {
		e.preventDefault();
		const selectedTrail = trails.find((t) => t._id === trail);
		const updatedInputs = {
			...inputs,
			trailName: selectedTrail ? selectedTrail.trailName : '',
		};
		if (isEditMode) {
			// Call the updateNote function
			updateNote(noteId, updatedInputs);
			setIsEditMode(false); // Reset edit mode after updating the note
		} else {
			// Call the addNote function
			addNote(updatedInputs);
		}
		setInputs(initInputs);
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
							required
							name='trail' 
							value={trail} 
							className='select-trail'
							onChange={handleChange}>
              <option value=''>Select Trail</option>
              {trails && trails.map((trailOption) => (
                <option 
									key={trailOption._id} 
									value={trailOption._id}>
                  {trailOption.trailName}
                </option>
              ))}
            </select>
					</span>
				</div>
      <div className='log-input'>
        <label>Day Number:</label>
        <span>
          <input
            required
            type='number'
            name='dayNumber'
            value={dayNumber}
            onChange={handleChange}
          />
        </span>
      </div>
      <div className='log-input'>
        <label>Date:</label>
        <span>
          <input
            required
            type='date'
            name='date'
            value={date}
            onChange={handleChange}
          />
        </span>
      </div>
      <div className='log-input'>
        <div className='log-title-block'>
          <label>Trail Direction:</label>
        </div>
        <span>
          <label className='radio-label'>
            <input
              type='radio'
              name='trailDirection'
              value='NOBO'
              checked={trailDirection === 'NOBO'}
              onChange={handleChange}
            />
            NOBO
          </label>
        </span>
        <span>
          <label className='radio-label'>
            <input
              type='radio'
              name='trailDirection'
              value='SOBO'
              checked={trailDirection === 'SOBO'}
              onChange={handleChange}
            />
            SOBO
          </label>
        </span>
        <span>
          <label className='radio-label'>
            <input
              type='radio'
              name='trailDirection'
              value='WEBO'
              checked={trailDirection === 'WEBO'}
              onChange={handleChange}
            />
            WEBO
          </label>
        </span>
        <span>
          <label className='radio-label'>
            <input
              type='radio'
              name='trailDirection'
              value='EABO'
              checked={trailDirection === 'EABO'}
              onChange={handleChange}
            />
            EABO
          </label>
        </span>
      </div>
      <h3 className='log-title'>Where'd you start the day?</h3>
      <div className='log-input'>
        <label>Location:</label>
        <span>
          <input
            type='text'
            name='startLocation'
            value={startLocation}
            onChange={handleChange}
          />
        </span>
      </div>
      <div className='log-input'>
        <label>Mile Mark:</label>
        <span>
          <input
            type='text'
            name='startMileMark'
            value={startMileMark}
            onChange={handleChange}
          />
        </span>
      </div>
      <h3 className='log-title'>Where'd you end the day?</h3>
      <div className='log-input'>
        <label>Location:</label>
        <span>
          <input
            type='text'
            name='endLocation'
            value={endLocation}
            onChange={handleChange}
          />
        </span>
      </div>
      <div className='log-input'>
        <label>Mile Mark:</label>
        <span>
          <input
            type='text'
            name='endMileMark'
            value={endMileMark}
            onChange={handleChange}
          />
        </span>
      </div>
      <div className='log-input'>
        <p>Distance:</p>
        <p>{calculateDistance()}</p>
      </div>
      <h3 className='log-title'>What happened this day?</h3>
      <div className='log-input'>
        <div className='log-title-block'>
          <label>Notes:</label>
        </div>
        <textarea
          name='description'
          className='notes-textarea'
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className='button-container'>
			<button className='post-btn' onClick={handleSubmit}>
				{isEditMode ? 'Save Log' : 'Add Log'}
			</button>
      </div>
    </form>
  );
}