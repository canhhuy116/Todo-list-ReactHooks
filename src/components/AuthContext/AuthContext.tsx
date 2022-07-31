import { createContext, useState } from 'react';

interface propsAuth {
  children: JSX.Element;
}

const userContext = createContext({
  isUser: false,
  changeStateUser: () => {},
});

function AuthContext({ children }: propsAuth) {
  const [isUser, setIsUser] = useState(false);
  const changeStateUser = () => {
    setIsUser(true);
  };
  return (
    <userContext.Provider
      value={{ isUser: isUser, changeStateUser: changeStateUser }}
    >
      {children}
    </userContext.Provider>
  );
}

export { AuthContext, userContext };
