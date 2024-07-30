const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const PDFDocument = require('pdfkit');
const app = express();
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Destination folder for file uploads
const jwt = require('jsonwebtoken');
//const router = require("./Routes/UserRoutes");

dotenv.config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
 // useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!");
});

const paymentRouter = require("./routes/payments.js");
app.use("/payment", paymentRouter);

const ClientRouter = require("./routes/Client.js");
app.use("/client", ClientRouter);

const appointmentRouter = require("./routes/appointments.js");
app.use("/appointment", appointmentRouter);

const drugRouter = require("./routes/drug.js");
app.use("/drug", drugRouter);

const medicalRouter = require("./routes/medical.js");
app.use("/medical", medicalRouter);

const TherapistRouter = require("./routes/Therapist.js");
app.use("/therapist", TherapistRouter);

const emeRoutes = require("./routes/emergency");
app.use(emeRoutes);

const avDocRoutes = require("./routes/avdoctors");
app.use(avDocRoutes);

const deemergencyRoutes = require("./routes/deleteemeapo");
app.use(deemergencyRoutes);

const presemeRoutes = require("./routes/emeprescription");
app.use(presemeRoutes);

const SalaryRouter = require("./routes/UserRoutes.js");
app.use("/users", SalaryRouter);

const waitlistRouter = require("./routes/waitlists.js");
app.use("/waitlist",waitlistRouter);


// Update your route to handle file upload
router.route("/payment/update/:id").put(upload.single('paymentSlip'), async (req, res) => {
  let id = req.params.id;
  const { paymentType, bankName, branchName, email, paidAmount, paidDate, paidMonth, referenceID, note } = req.body;

  const updatePayment = {
    paymentType,
    bankName,
    branchName,
    email,
    paidAmount,
    paidDate,
    paidMonth,
    referenceID,
    note,
    invoiceID,
    paymentSlip: req.file ? req.file.path : null // Store file path in DB
  };

  try {
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


app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
