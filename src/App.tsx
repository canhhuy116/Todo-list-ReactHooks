import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import { StatusJobContext } from './components/StatusJobContext/StatusJobContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './App.scss';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <StatusJobContext>
                  <Dashboard />
                </StatusJobContext>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
