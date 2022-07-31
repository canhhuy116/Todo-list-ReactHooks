interface Job {
  id: string;
  name: string;
  description: string;
}

const URL = 'http://localhost:5000/todos';

export const createTodo = (payload: Job) => {
  return fetch(`${URL}`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const readTodo = () => {
  return fetch(`${URL}`);
};

export const updateTodo = (payload: Job) => {
  return fetch(`${URL}`, {
    method: 'PUT',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const deleteTodo = (idTodo: string) => {
  return fetch(`${URL}/${idTodo}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
};
