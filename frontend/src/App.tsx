import React from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import MainNav from './components/nav/MainNav';
import NotificationLogs from './components/notification/NotificationLogs';
import MyFoods from './pages/admin/MyFoods';
import MyOrders from './pages/admin/MyOrders';
import MyRestaurant from './pages/admin/MyRestaurant';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Foods from './pages/user/Foods';
import Orders from './pages/user/Orders';
import Restaurants from './pages/user/Restaurants';

const App = () => {
  return (
    <Router>
      <NotificationLogs />
      <div className="w-screen h-screen z-0">
        <MainNav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />

          <Route path="/my-restaurant" element={<MyRestaurant />} />
          <Route path="/my-foods" element={<MyFoods />} />
          <Route path="/my-orders" element={<MyOrders />} />

          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/restaurants/:restaurantId" element={<Foods />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
