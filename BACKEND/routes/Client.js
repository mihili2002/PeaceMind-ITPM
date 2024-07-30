const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const UserModel = require('../models/Users');
const Adminlogin = require('../models/Adminlogin');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const CompletedAppointment = require('../models/CompletedAppointments');
const Appointment = require('../models/Upcomingsessions');
const Thought = require('../models/Thought');
const router = require("express").Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id :user._id,email :user.email,name :user.name}, 'your_secret_key');
    res.json({ token });
  });
// // admin login
// app.post("/adminlogin", async (req, res) => {
//     const { username, password } = req.body;
  
//     // Find admin in database
//     const admin = await Admin.findOne({ username });
//     if (!admin) {
//       return res.status(404).json({ message: "Admin not found" });
//     }
  
//     // Validate password
//     const validPassword = await bcrypt.compare(password, admin.password);
//     if (!validPassword) {
//       return res.status(401).json({ message: "Invalid password" });
//     }
  
//     // Generate JWT
//     const token = jwt.sign({ role: admin.role }, "secret");
  
//     res.json({ token });
//   });
  
  // Middleware to verify JWT
  function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
  
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      req.adminRole = decoded.role;
      next();
    });
  }
  
  // Protected route for client dashboard
  router.get("/client-dashboard", verifyToken, (req, res) => {
    if (req.adminRole !== "Client Manager") {
      return res.status(403).json({ message: "Unauthorized" });
    }
  
    res.json({ message: "Welcome to the client dashboard" });
  });
  
  // Protected route for therapist dashboard
  router.get("/therapist-dashboard", verifyToken, (req, res) => {
    if (req.adminRole !== "Therapist Manager") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    res.json({ message: "Welcome to the client dashboard" });
  });

  // Protected route for payment dashboard
  router.get("/payment-dashboard", verifyToken, (req, res) => {
    if (req.adminRole !== "Financial Manager") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    res.json({ message: "Welcome to the payment portal" });
  });

  // Protected route for Appointment dashboard
  router.get("/appointment-dashboard", verifyToken, (req, res) => {
    if (req.adminRole !== "Appointment Manager") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    res.json({ message: "Welcome to the appointment dashboard" });
  });

  // Protected route for waitlist dashboard
  router.get("/waitlist-dashboard", verifyToken, (req, res) => {
    if (req.adminRole !== "Waitlist Manager") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    res.json({ message: "Welcome to the waitlist dashboard" });
  });

  // Protected route for pharmacy dashboard
  router.get("/pharmacy-dashboard", verifyToken, (req, res) => {
    if (req.adminRole !== "Pharmacy Manager") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    res.json({ message: "Welcome to the pharmacy dashboard" });
  });

  // Protected route for emergency dashboard
  router.get("/emergency-dashboard", verifyToken, (req, res) => {
    if (req.adminRole !== "Emergency Manager") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    res.json({ message: "Welcome to the emergency dashboard" });
  });

    // Protected route for salary dashboard
    router.get("/salary-dashboard", verifyToken, (req, res) => {
      if (req.adminRole !== "Salary Manager") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      res.json({ message: "Welcome to the salary dashboard" });
    });

//search
router.get('/searchUserByName', async (req, res) => {
  const { name } = req.query;
  let users = await UserModel.find({ name: { $regex: new RegExp(name, 'i') } });
  res.json(users);
});
//report generation
router.get('/generatePDF', async (req, res) => {
    const users = await UserModel.find();
  
    // Create a PDF document in memory
    const doc = new PDFDocument();
    doc.fontSize(20).text('User Details Report', { align: 'center' }).moveDown();
  
    // Define table headers
    const headers = ['Name', 'Email', 'Age', 'Address', 'NIC', 'Gender', 'Password'];
    const headerHeight = 20;
    const rowHeight = 15;
    const colWidth = 100;
    const startY = doc.y + 2 * doc.currentLineHeight();
  
    // Draw table headers
    doc.font('Helvetica-Bold').text(headers.join(' | '), { align: 'center' });
  
    // Draw table rows
    users.forEach((user) => {
      doc.text(user.name, { width: colWidth, continued: true })
        .text(user.email, { width: colWidth, continued: true })
        .text(user.age.toString(), { width: colWidth, continued: true })
        .text(user.address, { width: colWidth, continued: true })
        .text(user.nic, { width: colWidth, continued: true })
        .text(user.gender, { width: colWidth, continued: true })
        .text(user.password, { width: colWidth })
        .moveDown();
    });
  
    // Stream the PDF document to the client for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=user_details.pdf');
    doc.pipe(res);
    doc.end();
  });
  
  
//get all users
router.get('/User', (req, res) =>{
    UserModel.find()
    .then(Users => res.json(Users))
    .catch(err => res.json(err));
})

router.put('/updateUser/:id', (req, res) =>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {name: req.body.name,email: req.body.email,age: req.body.age,address: req.body.address,nic: req.body.nic,gender: req.body.gender,password: req.body.password})
  .then(Users => res.json(Users))
  .catch(err => res.json(err))
})

//delete users
router.delete('/deleteUser/:id', (req, res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(Users => res.json(Users))
    .catch(err => res.json(err))
});

//create account
router.post('/Createacc',(req, res) =>{
    UserModel.create(req.body)
    .then((data) =>{
        res.json(data);
    })
    .catch((err) =>{
        res.json(err);
    });
});

//get user details
router.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id: id})       
    .then(Users => res.json(Users))
    .catch(err => res.json(err))
})

//get completed sessions//mihili's database
router.get('/completed-appointments/:email', (req, res) =>{
    const email = req.params.email;
    CompletedAppointment.find({email: email})
    .then(Appointments => res.json(Appointments))
    .catch(err => res.json(err))
})

  //get Upcoming sessions//Amanda's database
  router.get('/upcoming-sessions/:email', (req, res) => {
    const email = req.params.email;
    Appointment.find({email: email})
    .then(Appointments => res.json(Appointments))
    .catch(err => res.json(err))
})
//get user ID
router.get('/getUserId', (req, res) => {
    const userId = req.user.id; 
    res.json({ userId });
});

router.get('/thoughtlog/:email', (req, res) => {
    const email = req.params.email;
    Thought.find({email: email})
    .then(Thoughts => res.json(Thoughts))
    .catch(err => res.json(err))
})

router.post('/addthought',(req, res) =>{
    Thought.create(req.body)
    .then((data) =>{
        res.json(data);
    })
    .catch((err) =>{
        res.json(err);
    });
});

// logout
// app.post("/logout", (req, res) => {
//     res.status(200).send("Logout successful");
//   });

router.post("/adminlogin", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Adminlogin.findOne({ email, password });
  
      if (user) {
        // Creating a simplified user object to send in the response
        const temp = {
          email: user.email,
          role: user.role,
          password:user.password,
          // username:user.username,
        };
        return res.status(200).json({ success: true,message: "User login successful",temp });
      } else {
        // If no user is found with the provided credentials
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      // If an error occurs during the database query
      return res.status(500).json({ success: false, message: "Something went wrong", error });
    }
  });
  module.exports = router;