import React from 'react';
import { Routes, BrowserRouter as Router, Route} from 'react-router-dom';
import MainNav from './components/nav/MainNav';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <div className='screen-h z-0'>
        <MainNav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
