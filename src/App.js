import React from 'react';
import Login from './Login';
import CustomerList from './CustomerList';
import AddCustomer from './AddCustomer'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/add-customer" element={<AddCustomer />} /> {}
        {}
      </Routes>
    </Router>
  );
};

export default App;
