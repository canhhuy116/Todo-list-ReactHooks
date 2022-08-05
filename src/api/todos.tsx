interface Job {
  id: string;
  name: string;
  description: string;
}

const URL = 'http://localhost:5000/todos';

export const createTodo = async (payload: Job) => {
  const store = localStorage.getItem('user');
  let token = '';
  if (store) {
    token = JSON.parse(store).token;
  }
  return (
    await fetch(`${URL}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
  ).json();
};

export const readTodoByUsername = async () => {
  const store = localStorage.getItem('user');
  let token = '';
  if (store) {
    token = JSON.parse(store).token;
  }

  const res = await fetch(`${URL}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 401) {
    window.location.replace(`${window.location.origin}/login`);
    return [];
  }
  return res.json();
};

export const updateTodo = async (payload: Job) => {
  const store = localStorage.getItem('user');
  let token = '';
  if (store) {
    token = JSON.parse(store).token;
  }
  return (
    await fetch(`${URL}/${payload.id}`, {
      credentials: 'include',
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
  ).json();
};

export const deleteTodo = async (idTodo: string) => {
  const store = localStorage.getItem('user');
  let token = '';
  if (store) {
    token = JSON.parse(store).token;
  }
  return (
    await fetch(`${URL}/${idTodo}`, {
      credentials: 'include',
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};
