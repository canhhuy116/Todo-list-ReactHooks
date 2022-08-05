import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import { StatusJobContext } from './components/StatusJobContext/StatusJobContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './App.scss';
import Header from './components/Header/Header';
import RequireAuth from './components/AuthContext/RequireAuth';

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
              path="*"
              element={
                <StatusJobContext>
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
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
