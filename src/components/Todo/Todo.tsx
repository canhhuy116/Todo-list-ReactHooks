import * as React from 'react';
import Button from '../Button/Button';
import './styleTodo.scss';

interface Job {
  id: string;
  name: string;
  description: string;
}

interface propsTodo {
  job: Job;
  onClickDeleteButton: (job: Job) => void;
}

function Todo({ job, onClickDeleteButton }: propsTodo) {
  const handleClick = () => {
    onClickDeleteButton(job);
  };
  return (
    <div className="Item">
      <div className="todo">
        <span>{job.name}</span>
      </div>
      <div className="Buttons">
        <Button
          nameBtn="Delete"
          className="DeleteButton"
          isDisableButton={false}
          onClickButton={handleClick}
        />
      </div>
    </div>
  );
}

export default Todo;
