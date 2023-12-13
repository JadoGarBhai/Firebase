// routes/appointmentRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const Router = express.Router();
const Appointment = require("../models/appointment");

// POST DATA
Router.post("/addAppointment", async (req, res) => {
  try {
    const newAppointment = new Appointment({
      _id: new mongoose.Types.ObjectId(),
      doctorName: req.body.doctorName,
      specialization: req.body.specialization,
      timing: req.body.timing,
      patientName: req.body.patientName,
      number: req.body.number,
      date: req.body.date,
    });
    const result = await newAppointment.save();
    res.json(result);
    console.log(result);
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error");
  }
});

// GET DATA
Router.get("/Appointment", async (req, res) => {
  try {
    const allAppointments = await Appointment.find();
    res.json(allAppointments);
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error");
  }
});

// DELETE DATA
Router.delete("/delAppointment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Appointment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json("Appointment Not Found");
    } else {
      res.json(deleted);
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error");
  }
});

// UPDATE DATA
Router.put("/updAppointment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAppointment = {
      doctorName: req.body.doctorName,
      specialization: req.body.specialization,
      timing: req.body.timing,
      patientName: req.body.patientName,
      number: req.body.number,
      date: req.body.date,
    };
    const result = await Appointment.findByIdAndUpdate(id, updatedAppointment, {
      new: true,
    });
    if (!result) {
      return res.status(404).json("Appointment Not Found");
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error");
  }
});

module.exports = Router;
