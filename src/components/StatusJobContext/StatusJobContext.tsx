import { createContext, useReducer } from 'react';

interface propsStatusJob {
  children: JSX.Element;
}

interface statusJob {
  idJob: string;
  kind: string;
  color: string;
}

const colorStatus = {
  done: 'blue',
  doing: 'yellow',
  doNot: 'red',
};

const kindStatus = ['Done', 'Doing', 'Do not'];

const initialState = {
  updateJob: { idJob: '', kind: kindStatus[0], color: 'blue' },
  updateJobs: [],
};

const SET_DONE_JOB = 'setDoneJob';
const SET_DOING_JOB = 'setDoingJob';
const SET_DO_NOT_JOB = 'setDoNotJob';
const PUSH_TO_LIST_JOB_UPDATE = 'pushListJobUpdate';

const setDoneJob = (payload: statusJob) => {
  return {
    type: SET_DONE_JOB,
    payload,
  };
};

const setDoingJob = (payload: statusJob) => {
  return {
    type: SET_DOING_JOB,
    payload,
  };
};

const setDoNotJob = (payload: statusJob) => {
  return {
    type: SET_DO_NOT_JOB,
    payload,
  };
};

const pushListJob = (payload: statusJob) => {
  return {
    type: PUSH_TO_LIST_JOB_UPDATE,
    payload,
  };
};

const reducer = (
  state: { updateJobs: statusJob[]; updateJob: statusJob },
  action: { type: string; payload: statusJob }
) => {
  switch (action.type) {
    case SET_DONE_JOB:
      return {
        ...state,
        updateJob: action.payload,
      };
    case SET_DOING_JOB:
      return {
        ...state,
        updateJob: action.payload,
      };

    case SET_DO_NOT_JOB:
      return {
        ...state,
        updateJob: action.payload,
      };

    case PUSH_TO_LIST_JOB_UPDATE:
      return {
        ...state,
        updateJobs: [...state.updateJobs, action.payload],
      };

    default:
      throw new Error('Invalid Action');
  }
};

const statusContext = createContext({
  updateJobs: [{ idJob: '', kind: kindStatus[0], color: 'blue' }],
  updateJob: { idJob: '', kind: kindStatus[0], color: 'blue' },
  statusKind: kindStatus,
  changeColor: (id: string, statusKind: string) => {},
});

function StatusJobContext({ children }: propsStatusJob) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeColor = (id: string, statusKind: string) => {
    if (statusKind === kindStatus[0]) {
      dispatch(
        setDoneJob({ idJob: id, color: colorStatus.done, kind: statusKind })
      );
      dispatch(
        pushListJob({ idJob: id, color: colorStatus.done, kind: statusKind })
      );
    } else if (statusKind === kindStatus[1]) {
      dispatch(
        setDoingJob({ idJob: id, color: colorStatus.doing, kind: statusKind })
      );
      dispatch(
        pushListJob({ idJob: id, color: colorStatus.doing, kind: statusKind })
      );
    } else if (statusKind === kindStatus[2]) {
      dispatch(
        setDoNotJob({ idJob: id, color: colorStatus.doNot, kind: statusKind })
      );
      dispatch(
        pushListJob({ idJob: id, color: colorStatus.doNot, kind: statusKind })
      );
    }
  };

  return (
    <statusContext.Provider
      value={{
        updateJobs: state.updateJobs,
        updateJob: state.updateJob,
        statusKind: kindStatus,
        changeColor,
      }}
    >
      {children}
    </statusContext.Provider>
  );
}

export { statusContext, StatusJobContext };
