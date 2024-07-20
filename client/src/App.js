import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import TransferMoney from "./components/TransferMoney";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<CustomerList />} />
          <Route exact path="/customer/:id" element={<CustomerDetails />} />
          <Route exact path="/transfer/:id" element={<TransferMoney />} />
        </Routes>
        <Footer />
      </div>
    </Router>

  );
}

export default App;
