import React from 'react';

const FormRow = ({ name, type, handleChange, label, field, placeholder }) => {
  if(field === 'input'){
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}<span className="asterisk">*</span></label>
        <input 
          className='input' 
          type={type}
          name={name} 
          onChange={handleChange}
          required
          placeholder={placeholder}
        />
      </div>
    )
  } 

  else if(field === 'textarea'){
    return (
      <div className="form-group textarea-wrapper">
        <label htmlFor={name}>{label}<span className="asterisk">*</span></label>
        <textarea 
          className='input' 
          name={name} 
          onChange={handleChange}
          placeholder={placeholder}
          required
          multiple
        />
      </div>
    )
  }

  else if(field==='file') {
    return(
      <div className="form-group">
      <label htmlFor="photos"> {label}<span className="asterisk">*</span> </label>
      <div className="photos-container">
        <input
          className="photos-input"
          type='file'
          name={name}
          label={label}
          multiple
          onChange={handleChange}
        />
      </div>
    </div>
    )
  }
  
}

export default FormRow