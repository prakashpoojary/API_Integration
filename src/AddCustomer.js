// AddCustomer.js

import React, { useState } from 'react';
import './AddCustomer.css'; //css file for styling 

const AddCustomer = () => {
  const [customerDetails, setCustomerDetails] = useState({
    first_name: '',
    last_name: '',
    street: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: '',
  });

  const [submittedData, setSubmittedData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleSubmit = () => {
    setSubmittedData([...submittedData, customerDetails]);
    
    setCustomerDetails({
      first_name: '',
      last_name: '',
      street: '',
      address: '',
      city: '',
      state: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className="container">
      <h2>Add Customer</h2>
      <div className="form-container">
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="first_name" value={customerDetails.first_name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="last_name" value={customerDetails.last_name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Street:</label>
          <input type="text" name="street" value={customerDetails.street} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={customerDetails.address} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input type="text" name="city" value={customerDetails.city} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>State:</label>
          <input type="text" name="state" value={customerDetails.state} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" name="email" value={customerDetails.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" value={customerDetails.phone} onChange={handleInputChange} />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {submittedData.length > 0 && (
        <div className="submitted-data">
          <h2>Submitted Data:</h2>
          {submittedData.map((data, index) => (
            <div key={index} className="submitted-item">
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddCustomer;
