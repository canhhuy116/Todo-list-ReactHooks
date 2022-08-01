import { createContext, useState } from 'react';

interface propsAuth {
  children: JSX.Element;
}

const userContext = createContext({
  isUser: false,
  username: '',
  changeStateUser: (checkUser: boolean, user: string) => {},
});

function AuthContext({ children }: propsAuth) {
  const [isUser, setIsUser] = useState(false);
  const [username, setUsername] = useState('');

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
