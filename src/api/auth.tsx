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

export const getMe = async () => {
  const store = localStorage.getItem('user');
  let token = '';
  if (store) {
    token = JSON.parse(store).token;
  }
  return (
    await fetch(`${URL}/me`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};

export const refreshToken = async () => {
  const store = localStorage.getItem('user');
  let refToken = '';
  if (store) {
    refToken = JSON.parse(store).refreshToken;
  }
  const payload = { refreshtoken: refToken };
  const res = await fetch(`${URL}/refreshToken`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
};
