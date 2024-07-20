import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/CustomerDetails.module.css";

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/customers/${id}`)
      .then((response) => response.json())
      .then((data) => {setCustomer(data);setLoading(false);})
      .catch((error) => console.error(error));
  }, [id]);

  

  const handleTransferClick = () =>{
    if(customer && customer.currentBalance === 0){
      setErrorMessage('Insufficient Balance..')
    }else{
      navigate(`/transfer/${id}`);
    }
  }
  const handleGoBack = () =>{
    navigate(-1)
  }

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
      <h1 className={styles.title}>Customer Details</h1>
      <p className={styles.info}>Name  &ensp;: &ensp;   {customer.name}</p>
      <p className={styles.info}>Email &ensp;: &ensp;   {customer.email}</p>
      <p className={styles.info}>Current Balance : {customer.currentBalance}</p>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <div className={styles.buttonGroup}>
      <button className={styles.transferLink} onClick={handleGoBack}>
        Back
      </button>
      <button className={styles.transferLink} onClick={handleTransferClick}>
        Transfer Money
      </button>
      </div>
    </div>
  );
};

export default CustomerDetails;
