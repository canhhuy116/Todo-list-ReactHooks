import React, { useState } from 'react';
import Button from '../Button/Button';
import './styleInput.scss';

interface propsInput {
  onListChange: (name: string) => void;
}

function Input({ onListChange }: propsInput) {
  const [job, setJob] = useState('');
  const handleClick = () => {
    onListChange(job);
    setJob('');
  };
  return (
    <div className="inputTodoList">
      <input
        type="text"
        className="inputBox"
        placeholder="Enter to do..."
        value={job}
        onChange={(event) => {
          setJob(event.target.value);
        }}
      />
      <div className="Btn" onClick={handleClick}>
        <Button nameBtn="Add" />
      </div>
    </div>
  );
}

export default Input;
