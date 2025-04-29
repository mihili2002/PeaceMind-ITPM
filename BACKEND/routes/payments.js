const router = require("express").Router();
const nodemailer = require('nodemailer');
const multer = require('multer');
let Payment = require("../models/payment");
const fs = require('fs');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Uploads will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Initialize upload
const upload = multer({ storage: storage });

// Function to send payment confirmation email
const sendPaymentConfirmationEmail = (email) => {
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
    text: "Your payment was submitted successfully.We will let you know when it is verified",
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
router.post('/Paymentsend-email', (req, res) => {
  const { email } = req.body;

  sendPaymentConfirmationEmail(email);

  res.status(200).json({ message: "Email sent successfully" });
});



// Route to handle file upload
router.post('/Paymentupload', upload.single('paymentSlip'), (req, res) => {
  // Here, 'paymentSlip' should match the name attribute of your file input in the frontend form
  res.json({ file: req.file });
});

// Route to add a new payment
router.post("/Paymentadd", upload.single('paymentSlip'), async (req, res) => {
  const {
    paymentType,
    bankName,
    branchName,
    email,
    paidAmount,
    paidDate,
    paidMonth,
    referenceID,
    note,
    invoiceID
  } = req.body;

  // Basic validation for required fields
  if (!paymentType || !bankName || !branchName || !email || !paidAmount || !paidDate || !paidMonth || !referenceID || !invoiceID) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Convert paidAmount to a number
  const parsedPaidAmount = Number(paidAmount);
  if (isNaN(parsedPaidAmount) || parsedPaidAmount <= 0) {
    return res.status(400).json({ error: "Invalid paid amount" });
  }

  // Convert paidDate to a valid date object
  const parsedPaidDate = new Date(paidDate);
  if (isNaN(parsedPaidDate.getTime())) {
    return res.status(400).json({ error: "Invalid paid date" });
  }

  try {
    const newPayment = new Payment({
      paymentType,
      bankName,
      branchName,
      email,
      paidAmount: parsedPaidAmount,
      paidDate: parsedPaidDate,
      paymentSlip: req.file ? req.file.path : '', // Saving file path if uploaded
      paidMonth,
      referenceID,
      note,
      invoiceID
    });

    await newPayment.save();

    // Send payment confirmation email
    sendPaymentConfirmationEmail(email);

    res.status(200).json({ message: "Payment Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read part
router.route("/allpayments").get((req,res)=>{
    Payment.find().then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err)
    })
})

// Update part
router.route("/Paymentupdate/:id").put(upload.single('paymentSlip'), async(req,res)=>{ // Apply upload middleware to handle file uploads
  let id = req.params.id;
  const {paymentType, bankName, branchName, email, paidAmount, paidDate, paidMonth, referenceID, note, invoiceID} = req.body;

  // Convert paidAmount to a number
  const parsedPaidAmount = Number(paidAmount);
  if (isNaN(parsedPaidAmount) || parsedPaidAmount <= 0) {
    return res.status(400).json({ error: "Invalid paid amount" });
  }

  // Convert paidDate to a valid date object
  const parsedPaidDate = new Date(paidDate);
  if (isNaN(parsedPaidDate.getTime())) {
    return res.status(400).json({ error: "Invalid paid date" });
  }

  // Create an object to hold updated payment details
  const updatePayment = {
    paymentType,
    bankName,
    branchName,
    email,
    paidAmount: parsedPaidAmount,
    paidDate: parsedPaidDate,
    paidMonth,
    referenceID,
    note
  };

  // Check if a new payment slip is provided
  if (req.file) {
    // If a new payment slip is provided, update the paymentSlip field
    updatePayment.paymentSlip = req.file.path;

    // Delete the old payment slip file if it exists
    const payment = await Payment.findById(id);
    if (payment.paymentSlip) {
      const filePath = payment.paymentSlip;
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath); // Delete the old payment slip file
          console.log('Old payment slip deleted:', filePath);
        } catch (err) {
          console.error('Error deleting old payment slip:', err);
        }
      } else {
        console.warn('Old payment slip not found at:', filePath);
      }
    }
  }

  try {
    // Update the payment details in the database
    const updatedPayment = await Payment.findByIdAndUpdate(id, updatePayment, { new: true });
    if (!updatedPayment) {
      return res.status(404).json({ status: "Error", error: "Payment not found" });
    }
    res.status(200).json({ status: "Success", message: "Payment updated", payment: updatedPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", error: "Failed to update payment information" });
  }
});

// Payment Status
// router.put("/updateStatus/:id", async (req, res) => {
//   const id = req.params.id;
//   const { status } = req.body; // Ensure that the status is received correctly
  
//   try {
//     // Update the payment status in the database
//     const updatedPayment = await Payment.findByIdAndUpdate(id, { Status: status }, { new: true });
//     if (!updatedPayment) {
//       return res.status(404).json({ status: "Error", error: "Payment not found" });
//     }
//     // Return the updated payment object in the response
//     res.status(200).json({ status: "Success", message: "Payment status updated", payment: updatedPayment });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: "Error", error: "Failed to update payment status" });
//   }
// });
router.put("/PaymentupdateStatus/:id", async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(id, { status: status }, { new: true });
    if (!updatedPayment) {
      return res.status(404).json({ status: "Error", error: "Payment not found" });
    }
    res.status(200).json({ status: "Success", message: "Payment status updated", payment: updatedPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", error: "Failed to update payment status" });
  }
});




// Delete part
router.route("/Paymentdelete/:id").delete(async (req,res)=> {
    let id = req.params.id; // Access the ID from params
    
    await Payment.findByIdAndDelete(id).then(()=> {
        res.status(200).send({status:"Payment deleted"});
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status:"Error with delete user", error:err.message})
    })
});

// Get one data set of a particular payment
router.route("/Paymentget/:id").get(async (req,res)=> {
    let id = req.params.id;
    await Payment.findById(id).then((payment)=> {
        res.status(200).send({status: "Payment fetched", payment})
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with get payment", error: err.message})
    })
});

// Monthly Report
router.get("/Paymentmonthly", async (req, res) => {
    try {
      const { month, year } = req.query;
      const parsedMonth = parseInt(month);
      const parsedYear = parseInt(year);
      
      if (isNaN(parsedMonth) || isNaN(parsedYear)) {
        return res.status(400).json({ error: "Invalid month or year" });
      }
  
      const startDate = new Date(parsedYear, parsedMonth - 1, 1); // Corrected month index
      const endDate = new Date(parsedYear, parsedMonth, 0); // Get the last day of the month
  
      const monthlyReport = await Payment.find({
        paidDate: { $gte: startDate, $lte: endDate }
      });
      
      res.json(monthlyReport);
    } catch (error) {
      console.error("Error fetching monthly report:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});

// Weekly Report
router.get("/Paymentweekly", async (req, res) => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7); // Get date 7 days ago
      const weeklyReport = await Payment.find({
        paidDate: { $gte: startDate }
      });
      res.json(weeklyReport);
    } catch (error) {
      console.error("Error fetching weekly report:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});

// Fetch invoice details by ID for USER
router.route("/Paymentinvoice/:invoiceID").get(async (req, res) => {
    const invoiceID = req.params.invoiceID;
    try {
      const invoice = await Payment.findOne({ invoiceID });
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      res.json(invoice);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});

// Fetch invoice details by ID for ADMIN
router.route("/PaymentAllinvoice/:invoiceID").get(async (req, res) => {
  const invoiceID = req.params.invoiceID;
  try {
    const invoice = await Payment.findOne({ invoiceID });
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
