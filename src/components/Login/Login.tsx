import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { login } from '../../api/auth';
import { userContext } from '../AuthContext/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;
  const contextUser = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (contextUser.username) {
      navigate('/');
    }
  }, [contextUser, navigate]);

  const onChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      login(userData).then((res) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
          contextUser.changeStateUser(res.username);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleClickBtnGG = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  return (
    <>
      <section className="heading">
        <p>Login and start setting goals</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>

      <section>
        <div className=" form form-group">
          <p>OR</p>
          <button
            onClick={handleClickBtnGG}
            type="button"
            className="btn btn-block btn-gg"
          >
            Google
          </button>
        </div>
      </section>

      <section className="register">
        <p>You do not have account?</p>
        <Link to="/register" className="linkToRegister">
          Register
        </Link>
      </section>
    </>
  );
}

export default Login;
