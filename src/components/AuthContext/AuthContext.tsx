import { createContext, useCallback, useEffect, useState } from 'react';

const userContext = createContext({
  username: '',
  changeStateUser: (user: string) => {},
});

function AuthContext({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const store = localStorage.getItem('user');
    if (store) {
      setUsername(JSON.parse(store).username);
    }
  }, []);

  const changeStateUser = useCallback((user: string) => {
    setUsername(user);
  }, []);
  return (
    <userContext.Provider value={{ username, changeStateUser }}>
      {children}
    </userContext.Provider>
  );
}

export { AuthContext, userContext };
