import React from 'react'

const Textarea = ({ label, name, value, onChange }) => {
	return (
		<div className="log-input">
    <div className="log-title-block">
      <label>{label}:</label>
    </div>
    <textarea
      name={name}
      className="notes-textarea"
      value={value}
      onChange={onChange}
    />
  </div>
	)
}

export default Textarea