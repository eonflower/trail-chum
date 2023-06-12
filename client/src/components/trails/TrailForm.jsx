import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


export default function TrailForm(props) {
	const { addTrail } = props;
	const [trailName, setTrailName] = useState("")


	const handleSubmit = (e) => {
		e.preventDefault();
		const newTrail = { trailName };
		addTrail(newTrail);
		setTrailName("");
	};

	return (
		<div className='trail-form-container'>
			<form className="trail-form" onSubmit={handleSubmit}>
			<div className='trail-input'>
          <input
            type='text'
            name='trailName'
						className='trail-name'
						value={trailName}
						onChange={(e) => setTrailName(e.target.value)}
            placeholder='Add Trail'
          />
          <button className='trail-btn'><FontAwesomeIcon icon={faPlus} /></button>
      </div>
		</form>
		</div>
	)
}
