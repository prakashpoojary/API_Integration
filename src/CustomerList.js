// CustomerList.js

import React, { useState, useEffect } from 'react';
import AddCustomer from './AddCustomer';
import { useNavigate } from 'react-router-dom';
import './CustomerList.css'; 

const CustomerList = () => {
  const [useApiData, setUseApiData] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (useApiData) {
      getCustomerList();
    } else {
      setCustomers([
        {
            uuid: '1',
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            phone: '555-1234',
          },
          {
            uuid: '2',
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane.smith@example.com',
            address: '456 Oak St',
            city: 'Another City',
            state: 'NY',
            phone: '555-5678',
          },
      ]);
    }
  }, [useApiData]);

  const getCustomerList = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customer list');
      }

      const customerList = await response.json();
      setCustomers(customerList);
    } catch (error) {
      setError('Error fetching customer list. Please try again.');
    }
  };

  const handleAddCustomerSubmit = (customerDetails) => {
    setCustomers([...customers, { uuid: customers.length + 1, ...customerDetails }]);
    setShowAddCustomer(false);
  };

  const deleteCustomer = async (uuid) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=' + uuid, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }

      getCustomerList();
    } catch (error) {
      setError('Error deleting customer. Please try again.');
    }
  };

  const updateCustomer = async (uuid, updatedCustomerDetails) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=' + uuid, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCustomerDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to update customer');
      }

      getCustomerList();
    } catch (error) {
      setError('Error updating customer. Please try again.');
    }
  };

  return (
    <div className="customer-list-container">
      <h2 className="customer-list-heading">Customer List</h2>
      {error && <p className="error-message">{error}</p>}
      <button className="add-customer-button" onClick={() => { setShowAddCustomer(true); navigate('/add-customer'); }}>Add Customer</button>
      <button className="toggle-data-button" onClick={() => setUseApiData(!useApiData)}>
        {useApiData ? 'Use Manual List' : 'Use API Data'}
      </button>
      {showAddCustomer && <AddCustomer onSubmit={handleAddCustomerSubmit} />}
      <ul className="customer-ul">
        {customers.map((customer) => (
          <li key={customer.uuid} className="customer-li">
            <div className="customer-info">
              <strong>{customer.first_name} {customer.last_name}</strong>
              <p>Email: {customer.email}</p>
              <p>Address: {customer.address}, {customer.city}, {customer.state}</p>
              <p>Phone: {customer.phone}</p>
            </div>
            <div className="customer-buttons">
              <button className="delete-button" onClick={() => deleteCustomer(customer.uuid)}>Delete</button>
              <button className="update-button" onClick={() => updateCustomer(customer.uuid, {
                "first_name": "UpdatedFirstName",
                "last_name": "UpdatedLastName",
              })}>Update</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
