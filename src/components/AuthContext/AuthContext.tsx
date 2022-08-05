import { createContext, useCallback, useState } from 'react';

interface AuthContextType {
  username: string;
  login: (username: string, callback: VoidFunction) => void;
  logout: () => void;
}

let userContext = createContext<AuthContextType>(null!);

const DataLocal = () => {
  let data = '';
  const store = localStorage.getItem('user');
  if (store) {
    data = JSON.parse(store).username;
  }
  return data;
};

function AuthContext({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string>(DataLocal);

  const login = useCallback((newUser: string, callback: VoidFunction) => {
    setUsername(newUser);
    callback();
  }, []);

  const logout = useCallback(() => {
    setUsername('');
  }, []);

  return (
    <userContext.Provider value={{ username, login, logout }}>
      {children}
    </userContext.Provider>
  );
}

export { AuthContext, userContext };
