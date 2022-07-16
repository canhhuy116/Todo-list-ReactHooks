import * as React from 'react';
import Button from '../Button/Button';
import './styleTodo.scss';

interface Job {
  id: string;
  name: string;
}

interface propsTodo {
  job: Job;
  onClickDelBtn: any;
}

function Todo({ job, onClickDelBtn }: propsTodo) {
  const handleClick = () => {
    onClickDelBtn(job);
  };
  return (
    <div className="Item">
      <div className="todo">
        <span>{job.name}</span>
      </div>
      <div className="Btns">
        <div className="DelBtn" onClick={handleClick}>
          <div className="Btn">
            <Button nameBtn="Delete" />
          </div>
        </div>
        <div className="EditBtn">
          <div className="Btn">
            <Button nameBtn="Edit" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
