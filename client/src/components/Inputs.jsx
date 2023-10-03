import React from 'react'

const Inputs = ({ label, name, type, value, onChange, max, maxLength }) => {

	return (
		<div className="log-input">
    <label>{label}:</label>
    <span>
      <input
				required
        type={type}
        name={name}
        value={value}
        onChange={onChange}
				maxLength={maxLength}
				max={max}
      />
    </span>
  </div>
	)
}

export default Inputs