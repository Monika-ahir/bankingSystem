import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CustomerList.module.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    currentBalance: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      });
  }, []);

  const handleAddCustomerClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newCustomer.name && newCustomer.email && newCustomer.currentBalance) {
      fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      })
        .then(response => response.json())
        .then(data => {
          setCustomers((prev) => [...prev, data]);
          setNewCustomer({ name: "", email: "", currentBalance: "" });
          setShowForm(false);
        })
        .catch(error => console.error('Error:', error));
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Money Master</h1>
      <table className={styles.customerTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Balance</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} onClick={() => navigate(`/customer/${customer._id}`)}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>RS.{customer.currentBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!showForm && (
        <button className={styles.addButton} onClick={handleAddCustomerClick}>
          Add New Customer
        </button>
      )}
      {showForm && (
        <form className={styles.addCustomerForm} onSubmit={handleFormSubmit}>
          <div className={styles.formRow}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newCustomer.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="currentBalance"
              placeholder="Current Balance"
              value={newCustomer.currentBalance}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.buttonGroup}><button className={styles.submitButton} onClick={() => {
            setShowForm(false);
            setNewCustomer({ name: "", email: "", currentBalance: "" });
          }}>Cancel</button>
          <button type="submit" className={styles.submitButton}>Add New Customer</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CustomerList;
