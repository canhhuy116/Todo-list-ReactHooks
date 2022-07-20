import { useState } from 'react';
import Button from '../Button/Button';
import './styleInput.scss';
import { v4 } from 'uuid';

interface Job {
  id: string;
  name: string;
  description: string;
}

interface propsInput {
  onClickAddButton: (job: Job) => void;
}

function Input({ onClickAddButton }: propsInput) {
  const [textInput, setJob] = useState('');

  const handleClickAddButton = () => {
    setJob('');
    const job = { id: v4(), name: textInput, description: '' };
    onClickAddButton(job);
  };

  return (
    <div className="inputTodoList">
      <input
        type="text"
        className="inputBox"
        placeholder="Enter to do..."
        value={textInput}
        onChange={(event) => {
          setJob(event.target.value);
        }}
      />
      <Button
        nameBtn="Add"
        className="AddButton"
        isDisableButton={textInput === ''}
        onClickButton={handleClickAddButton}
      />
    </div>
  );
}

export default Input;
