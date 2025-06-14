import React from 'react';

function TextInput({ label, type, value, onChange }) {
  return (
      <div>
          <label>{label}</label><br/>
          <input
              type={type}
              value={value}
              onChange={onChange}
          />
      </div>
  );
}

export default TextInput;