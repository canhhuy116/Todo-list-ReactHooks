import { useCallback, useContext, useState } from 'react';
import InputForm from '../InputForm/InputForm';
import './styleDetailTodo.scss';
import { statusContext } from '../StatusJobContext/StatusJobContext';

interface Job {
  id: string;
  name: string;
  description: string;
}

interface propsDetailTodo {
  job: Job;
  handleUpdateJob: (job: Job) => void;
}

function DetailTodo({ job, handleUpdateJob }: propsDetailTodo) {
  const [updateJob, setUpdateJob] = useState(job);
  const statusJob = useContext(statusContext);
  const currentJob = statusJob.updateJobs.find((todo) => todo.idJob === job.id);
  const [statusKind, setStatusKind] = useState(
    currentJob !== undefined ? currentJob.kind : statusJob.statusKind[0]
  );

  const changeInput = useCallback(
    (name: string, value: string) => {
      name === 'name'
        ? setUpdateJob({ ...updateJob, name: value })
        : setUpdateJob({ ...updateJob, description: value });
    },
    [updateJob]
  );

  const handleSubmit = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      handleUpdateJob(updateJob);
    },
    [handleUpdateJob, updateJob]
  );

  return (
    <form
      className="formDetail"
      onSubmit={(event) => {
        handleSubmit(event);
        statusJob.changeColor(job.id, statusKind);
      }}
    >
      <h2>{job.name}</h2>
      <div className="jobName">
        <label>Enter Job Name:</label>
        <InputForm name="name" value={job.name} changeInput={changeInput} />
      </div>
      <div className="jobDescription">
        <label>Enter Description:</label>
        <InputForm
          name="description"
          value={job.description}
          changeInput={changeInput}
        />
      </div>
      <select
        value={statusKind}
        onChange={(event) => {
          setStatusKind(event.target.value);
        }}
      >
        {statusJob.statusKind.map((kind, index) => (
          <option key={index} value={kind}>
            {kind}
          </option>
        ))}
      </select>
      <input type="submit" className="submitBox" />
    </form>
  );
}

export default DetailTodo;
