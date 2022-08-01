import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth';
import { userContext } from '../AuthContext/AuthContext';
import './Header.scss';

function Header() {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('user');
    logout().then((res) => {
      if (res.message) {
        contextUser.changeStateUser(false);
        navigate('/');
      }
    });
  };

  const contextUser = useContext(userContext);

  return (
    <header className="header">
      <div className="header__dashboard">
        <Link to="/">Todo List</Link>
      </div>
      <ul>
        {contextUser.isUser ? (
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
