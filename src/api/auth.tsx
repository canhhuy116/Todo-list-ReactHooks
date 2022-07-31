interface UserData {
  username: string;
  password: string;
}

const URL = 'http://localhost:5000/users';

export const login = (payload: UserData) => {
  return fetch(`${URL}/login`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const register = (payload: UserData) => {
  return fetch(`${URL}/register`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};
