interface UserData {
  username: string;
  password: string;
}

const URL = 'http://localhost:5000/users';

export const login = async (payload: UserData) => {
  return (
    await fetch(`${URL}/login`, {
      credentials: 'include',
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  ).json();
};

export const register = async (payload: UserData) => {
  return (
    await fetch(`${URL}/register`, {
      credentials: 'same-origin',
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  ).json();
};
