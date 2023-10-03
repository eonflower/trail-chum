import React from 'react'

const Radio = ({ label, name, value, checked, onChange }) => {
	return (
      <>
      <label className="radio-label">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {value}
      </label>
		</>
	)
}

export default Radio