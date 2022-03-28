const express = require("express");
const router = express.Router();
const Rent = require("../../models/Rent");
const jwt = require("jsonwebtoken");

const validateRentalInput = require("../../validation/rentals");

// get all info
router.get("/rents", async (req, res) => {
  try {
    const rents = await Rent.find();
    return res.status(200).json(rents);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// create rental request
router.post("/rents", async (req, res) => {
  try {
    // Form Validation
    const { errors, isValid } = validateRentalInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { authorization } = req.headers;
    const token = authorization
      ? authorization.split("Bearer ").length
        ? authorization.split("Bearer ")[1]
        : null
      : null;
    console.log(token);
    if (token) {
      //verify token
      const user = jwt.verify(token, process.env.secretOrKey);
      if (user) {
        const {
          accomodationStatus,
          rentRequestAmount,
          monthlySalary,
          monthlyPaymentPlan
        } = req.body;
        const createdBy = user.id;
        const rent = await Rent.create({
          user: createdBy,
          accomodationStatus,
          rentRequestAmount,
          monthlySalary,
          monthlyPaymentPlan,
          createdBy
        });
        return res.status(201).json(rent);
      } else {
        return res.status(500).json({ error: "Verification failed!" });
      }
    } else {
      return res.status(500).json({ error: "Token not found!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
