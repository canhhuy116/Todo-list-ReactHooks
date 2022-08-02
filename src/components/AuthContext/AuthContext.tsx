import { createContext, useState } from 'react';

interface propsAuth {
  children: JSX.Element;
}

const userContext = createContext({
  isUser: false,
  username: '',
  changeStateUser: (checkUser: boolean, user: string) => {},
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
  const [isUser, setIsUser] = useState(false);
  const [username, setUsername] = useState(userLocalStorage);

  const changeStateUser = (checkUser: boolean, user: string) => {
    setIsUser(checkUser);
    setUsername(user);
  };
  return (
    <userContext.Provider value={{ isUser, username, changeStateUser }}>
      {children}
    </userContext.Provider>
  );
}

export { AuthContext, userContext };
