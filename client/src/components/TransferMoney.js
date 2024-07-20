import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/TransferMoney.module.css";

const TransferMoney = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [customers, setCustomers] = useState([]);
  const [toCustomerId, setToCustomerId] = useState("");
  const [errorMessage,setErrorMessage] = useState('');

  useEffect(() => {
    fetch("/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("error fetching customers"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/customers/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromCustomerId: id,
          toCustomerId,
          amount: parseFloat(amount),
        }),
      });
      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        setErrorMessage('Insufficient Balance..');
        console.error("Transfer Failed..", errorData);

      }
    } catch (error) {
      console.error("data not fetched", error);
    }
  };
  const handleChange = (e) => {
    setToCustomerId(e.target.value);
  };
  const handleGoBack = () =>{
    navigate(-1)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Transfer Money</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Transfer to:</label>
          <select value={toCustomerId} onChange={handleChange} required>
            <option value="" disabled>
              Select a customer
            </option>
            {customers
              .filter((customer) => customer._id !== id)
              .map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
          </select>
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
       <div className={styles.buttonGroup}>
       <button className={styles.submitButton} onClick={handleGoBack}>
        Back
      </button>
       <button className={styles.submitButton} type="submit">
          Transfer
        </button>
        </div> 
      </form>
    </div>
  );
};

export default TransferMoney;
