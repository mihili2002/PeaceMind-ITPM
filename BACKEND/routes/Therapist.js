const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const nodemailer= require('nodemailer');
const Therapist = require('../models/Therapists');
const Medical = require('../models/Medical');
const appointment = require('../models/appointment');
const PDFDocument = require('pdfkit');
const CompletedAppointments = require('../models/CompletedAppointments');
const EmergancyAppoinments = require('../models/EmergancyAppoinments');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken')
const Thought = require('../models/Thought')
const router = require('express').Router();


     
  // Multer configuration
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Set upload directory
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    },
  });
  
  const upload = multer({ storage: storage });
  
  // createprofile route to handle file upload
  router.post('/createprofile', upload.single('file'), (req, res) => {
    const { fullname, address, email, nic, gender, dob, phone, password } = req.body;
    const cvFilePath = req.file ? req.file.path : null; // Get file path from Multer
  
    const newTherapist = new Therapist({
      fullname,
      address,
      email,
      nic,
      gender,
      dob,
      phone,
      password,
      cvFilePath, // Save file path to database
    });
  
    newTherapist.save()
      .then(savedTherapist => {
        res.status(201).json(savedTherapist);
        // Send payment confirmation email
      sendResumeConfirmationEmail(email);
  
      })
      .catch(err => {
        console.error('Error creating therapist profile:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  // createMedical route
  // app.post('/createMedical', (req, res) => {
  //   Medical.create(req.body)
  //     .then(data => {
  //       res.status(201).json(data);
  //     })
  //     .catch(err => {
  //       console.error('Error creating medical user:', err);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     });
  // });
  router.post('/createMedical', (req, res) => {
    const { patientName, email, doctorName, date, medications, refills, instructions } = req.body;
    
    // Create a new document in the Medical collection
    const newMedicalEntry = new Medical({
      patientName,
      email,
      doctorName,
      date,
      medications, // This should be an array of objects
      refills,
      instructions
    });
  
    newMedicalEntry.save()
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        console.error('Error creating medical entry:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  
  // getAppointments route
  router.get('/getAppointments/:fullname', (req, res) => {
    const fullname = req.params.fullname;
  
    appointment.find({ therapist: fullname })
      .then(appointments => {
        res.json(appointments);
      })
      .catch(err => {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  
  // Route to get EmergencyAppointments
  router.get('/getAllEmergencyAppointments/:fullname', (req, res) => {
    const fullname = req.params.fullname;

    EmergancyAppoinments.find({doctor:fullname})
      .then(emergancyAppoinments => {
        console.log('emergancyAppoinments:', emergancyAppoinments);
        res.json(emergancyAppoinments);
      })
      .catch(err => {
        console.error('Error fetching emergency appointments:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  // details route to get all therapists
  router.get('/details', (req, res) => {
    Therapist.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.error('Error fetching therapists:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  // deleteUser route to delete therapist by ID
  router.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    Therapist.findByIdAndDelete(id)
      .then(deletedUser => {
        if (!deletedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(deletedUser);
      })
      .catch(err => {
        console.error('Error deleting therapist:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  // searchByName route to search appointments by name
  router.get("/searchByName", (req, res) => {
    const { name } = req.query;
    appointment.find({ name: { $regex: new RegExp(name, "i") } })
      .then((appointments) => {
        res.json(appointments);
      })
      .catch((err) => {
        console.error("Error searching appointments:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });
  
  // createTherapySession route
  router.post('/createTherapySession', (req, res) => {
    CompletedAppointments.create(req.body)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        console.error('Error creating therapy session:', err); // Log the error message
        res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
      });
  });
  
  
  // Route to fetch user by hardcoded NIC
  router.get('/getUserByNIC', (req, res) => {
    const hardcodedNIC = "345667788"; // Hardcoded NIC number
  
    // Find user by hardcoded NIC in the database
    Therapist.findOne({ nic: hardcodedNIC })
      .then(user => {
        if (!user) {
          console.log('User not found');
          return res.status(404).json({ error: 'User not found' });
        }
        // If user is found, send the user data in the response
        console.log('User found:', user);
        res.json(user);
      })
      .catch(err => {
        console.error('Error fetching user by NIC:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  // Route to handle PUT request for updating user data
  router.put('/updateUser/:id', async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
  
    try {
      const updatedUser = await Therapist.findByIdAndUpdate(userId, userData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  // Route to move confirmed appointment to CompletedAppointments table
  router.post('/completedAppointments', (req, res) => {
    const appointmentData = req.body;
  
    CompletedAppointments.create(appointmentData)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        console.error('Error moving appointment to CompletedAppointments:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  // Route to delete confirmed appointment from Appointments table
  router.delete('/deleteAppointment/:id', (req, res) => {
    const appointmentId = req.params.id;
  
    appointment.findByIdAndDelete(appointmentId)
      .then(deletedAppointment => {
        if (!deletedAppointment) {
          return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json(deletedAppointment);
      })
      .catch(err => {
        console.error('Error deleting appointment:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  router.post('/therapistlogin', async (req, res) => {
    const { email, password } = req.body;
    const user = await Therapist.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email :user.email,id :user.id,fullname :user.fullname}, 'your_secret_key');
    res.json({token});
    });
  //get a single user
  router.get('/gettherapist/:id', (req, res) => {
    const id = req.params.id;
    Therapist.findById({_id: id})       
    .then(Users => res.json(Users))
    .catch(err => res.json(err))
  })
  
  
  // router.get('/getTherapistsFullname', (req, res) => {
  //   Therapist.find({}, 'fullname') // Retrieve only the fullname field from all therapists
  //     .then(therapists => {
  //       const fullnameList = therapists.map(therapist => therapist.fullname);
  //       res.json(fullnameList);
  //     })
  //     .catch(err => {
  //       console.error('Error fetching therapists fullnames:', err);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     });
  // });
  
  //get thought
  router.get('/ViewThought/:email', (req, res) => {
    const email = req.params.email;
    Thought.find({email: email})       
    .then(Users => res.json(Users))
    .catch(err => res.json(err))
  })
  module.exports = router;

  // Function to send payment confirmation email
const sendResumeConfirmationEmail = (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "peacemind1875@gmail.com", // Enter your Gmail email address
      pass: "nvxb zphr fema grvz", // Enter your Gmail password
    },
  });

  // Define email content
  const mailOptions = {
    from: "peacemind1875@gmail.com", // Enter your Gmail email address
    to: email,
    subject: "Resume Upload Confirmation",
    text: "Your resume is submitted successfully.",
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
// Route to handle sending payment confirmation email
router.post('/Therapistsend-email', (req, res) => {
  const { email } = req.body;

  sendResumeConfirmationEmail(email);

  res.status(200).json({ message: "Email sent successfully" });
});
