import { createContext, useState } from 'react';

interface propsAuth {
  children: JSX.Element;
}

const userContext = createContext({
  isUser: false,
  changeStateUser: (checkUser: boolean) => {},
});

function AuthContext({ children }: propsAuth) {
  const [isUser, setIsUser] = useState(false);
  const changeStateUser = (checkUser: boolean) => {
    setIsUser(checkUser);
  };
  return (
    <userContext.Provider value={{ isUser, changeStateUser }}>
      {children}
    </userContext.Provider>
  );
}

export { AuthContext, userContext };
