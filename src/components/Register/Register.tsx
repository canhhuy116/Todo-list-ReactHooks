import { useState } from 'react';
import { register } from '../../api/auth';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    password2: '',
  });

  const { name, username, password, password2 } = formData;

  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== password2) {
      alert('Passwords do not match');
    } else {
      const userData = {
        username,
        password,
      };

      try {
        register(userData).then((res) => {
          if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
          }
        });
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <section className="heading">
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
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
    </>
  );
}

export default Register;
