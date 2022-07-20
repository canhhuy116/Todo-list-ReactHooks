import * as React from 'react';
import { Link } from 'react-router-dom';
import { statusContext } from '../StatusJobContext/StatusJobContext';
import { useContext } from 'react';
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
  const statusJob = useContext(statusContext);
  const handleClick = () => {
    onClickDeleteButton(job);
  };

  const updateJob = statusJob.updateJobs.find((todo) => todo.idJob === job.id);

  return (
    <div className="Item">
      <div className="todo">
        <span style={{ color: updateJob !== undefined ? updateJob.color : '' }}>
          {job.name}
        </span>
      </div>
      <div className="Buttons">
        <Button
          nameBtn="Delete"
          className="DeleteButton"
          isDisableButton={false}
          onClickButton={handleClick}
        />
        <Link to={`/${job.id}`} className="linkDetail">
          <Button
            nameBtn="Detail"
            isDisableButton={false}
            onClickButton={() => {}}
            className="DetailBtn"
          />
        </Link>
      </div>
    </div>
  );
}

export default Todo;
