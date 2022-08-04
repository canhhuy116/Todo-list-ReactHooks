import { createContext, useState } from 'react';

interface propsAuth {
  children: JSX.Element;
}

const userContext = createContext({
  username: '',
  changeStateUser: (user: string) => {},
});

const userLocalStorage = () => {
  let username = '';
  const store = localStorage.getItem('user');
  if (store) {
    username = JSON.parse(store).username;
  }
  return username;
};

function AuthContext({ children }: propsAuth) {
  const [username, setUsername] = useState(userLocalStorage);

  const changeStateUser = (user: string) => {
    setUsername(user);
  };
  return (
    <userContext.Provider value={{ username, changeStateUser }}>
      {children}
    </userContext.Provider>
  );
}

export { AuthContext, userContext };
