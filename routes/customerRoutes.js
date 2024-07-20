const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/transfer", async (req, res) => {
  const { fromCustomerId, toCustomerId, amount } = req.body;

  try {
    const fromCustomer = await Customer.findById(fromCustomerId);
    const toCustomer = await Customer.findById(toCustomerId);
    const parsedAmount = parseFloat(amount);

    if (!fromCustomer || !toCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    if (fromCustomer.currentBalance < amount) {
      return res.status(400).json({ error: "Insufficient Balance" });
    }

    fromCustomer.currentBalance -= parsedAmount;
    toCustomer.currentBalance += parsedAmount;
    await fromCustomer.save();
    await toCustomer.save();
    res.status(200).json({ msg: "Transfer Successfull" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, currentBalance } = req.body;
    const newCustomer = new Customer({ name, email, currentBalance });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add customer', error });
  }
});

module.exports = router;
