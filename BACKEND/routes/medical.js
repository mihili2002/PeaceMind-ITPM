const router = require("express").Router();
const nodemailer= require('nodemailer')
let Medical = require("../models/Medical");
let Drug = require("../models/Drug");


router.get("/prescriptions", (req, res) => {
    Medical.find()
        .then(medical => res.json(medical))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/prescriptions/:id", async (req, res) => {
  try {
      const medical = await Medical.findById(req.params.id);
      if (!medical) return res.status(404).json({ status: "Prescription not found" });

      const drugNames = medical.medications.map(med => med.medicationName);
      const drugs = await Drug.find({ name: { $in: drugNames } });

      const medicationsWithTotal = medical.medications.map(med => {
          const drugDetails = drugs.find(drug => drug.name.toLowerCase() === med.medicationName.toLowerCase());
          const totalAmount = drugDetails ? drugDetails.price * med.quantityPerDay * medical.refills : 0;
          return { ...med._doc, totalAmount };  // Spread existing med and append totalAmount
      });

      const updatedMedical = { ...medical._doc, medications: medicationsWithTotal };
      res.json(updatedMedical);
  } catch (err) {
      res.status(500).json({ status: "Error fetching prescription", error: err.message });
  }
});

// Function to send prescription confirmation email
const sendPrescriptionConfirmationEmail = (email) => {
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
      subject: "Payment Confirmation",
      text: "Your prescription list is ready.",
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
  router.post('/send-email', (req, res) => {
    const { email } = req.body;
  
    sendPrescriptionConfirmationEmail(email);
  
    res.status(200).json({ message: "Email sent successfully" });
  });
  
  
  router.get('/your-api-endpoint', (req, res) => {
    res.json({ message: 'Hello from API' });
  });
 

module.exports = router;
