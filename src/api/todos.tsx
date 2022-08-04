interface Job {
  id: string;
  name: string;
  description: string;
}

const URL = 'http://localhost:5000/todos';

const store = localStorage.getItem('user');
let token: '';
if (store) {
  token = JSON.parse(store).token;
}

export const createTodo = async (payload: Job) => {
  const res = await fetch(`${URL}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const readTodoByUsername = async () => {
  const res = await fetch(`${URL}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const updateTodo = async (payload: Job) => {
  const res = await fetch(`${URL}/${payload.id}`, {
    credentials: 'include',
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const deleteTodo = async (idTodo: string) => {
  const res = await fetch(`${URL}/${idTodo}`, {
    credentials: 'include',
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};
