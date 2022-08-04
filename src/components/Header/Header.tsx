import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../AuthContext/AuthContext';
import './Header.scss';

function Header() {
  const contextUser = useContext(userContext);

  const onLogout = () => {
    localStorage.removeItem('user');
    contextUser.changeStateUser('');
  };

  return (
    <header className="header">
      <div className="header__dashboard">
        <Link to="/">Todo List</Link>
      </div>
      <ul>
        {contextUser.username ? (
          <li>
            <button className="btn" onClick={onLogout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
