
const router = require("express").Router();
const nodemailer = require('nodemailer');
const Appointment = require("../models/appointment");
const moment = require('moment');
const Therapist = require("../models/Therapists")


// Endpoint to get appointments count by date
router.get("/appointmentsByDate", async (req, res) => {
  try {
    const appointmentsByDate = await Appointment.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$AppointmentDate" } },
          count: { $sum: 1 }
        }
      }
    ]);
    const appointmentsCountMap = {};
    appointmentsByDate.forEach(item => {
      appointmentsCountMap[item._id] = item.count;
    });
    res.json(appointmentsCountMap);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});




// Create appointment
router.post("/Appointmentadd", async (req, res) => {
  const {
    name,
    address,
    ContactNo,
    email,
    therapist,
    time,
    AppointmentDate
  } = req.body;

  // Validate date format using moment.js
  if (!moment(AppointmentDate, 'YYYY-MM-DD', true).isValid()) {
    return res.status(400).json({ error: "Invalid date format. Please use YYYY-MM-DD format." });
  }

  try {
    const newAppointment = new Appointment({
      name,
     address,
      ContactNo,
      email,
      therapist,
      time,
      AppointmentDate
    });

    // Save the new appointment
    await newAppointment.save();

    // Send appointment confirmation email
    sendAppointmentConfirmationEmail(email);

    return res.status(200).json(newAppointment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});




// Read part
router.route("/Appointment").get((req,res)=>{
    Appointment.find().then((appointments)=>{
        res.json(appointments)
    }).catch((err)=>{
        console.log(err)
    })
})
//update part
router.route("/Appointmentupdate/:id").put(async (req, res) => {
  let id = req.params.id;
  const { name,address, ContactNo, email,therapist, AppointmentDate, time } = req.body;

  // Create an object to hold updated appointment details
  const updateAppointment = {
    name,
    address,
    ContactNo,
    email,
    therapist,
    AppointmentDate,
    time
  };

  try {
    // Update the appointment details in the database
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateAppointment, { new: true });
    if (!updatedAppointment) {
      return res.status(404).json({ status: "Error", error: "Appointment not found" });
    }
    res.status(200).json({ status: "Success", message: "Appointment updated", appointment: updatedAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", error: "Failed to update appointment information" });
  }
});

//delete part
router.route("/Appointmentdelete/:id").delete(async (req,res)=> {
    let id = req.params.id; // Access the ID from params
    
    await Appointment.findByIdAndDelete(id).then(()=> {
        res.status(200).send({status:"Appointment deleted"});
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status:"Error with delete user", error:err.message})
    })
})

//get one data set of a particular Appoinment
router.route("/Appointmentget/:id").get(async (req,res)=> {
    let id = req.params.id;
    await Appointment.findById(id).then((appointment)=> {
        res.status(200).send({status: "Appointment fetched", appointment})
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with get appointment", error: err.message})
    })
})



  // Backend API to fetch appointment data
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to send payment confirmation email
const sendAppointmentConfirmationEmail = (email) => {
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
    subject: "Appointment Confirmation",
    text: "Your appointment was done successfully.",
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
router.post('/Appointmentsend-email', (req, res) => {
  const { email } = req.body;

  sendAppointmentConfirmationEmail(email);

  res.status(200).json({ message: "Email sent successfully" });
});

router.get('/AppointmentgetTherapistsFullname', (req, res) => {
  Therapist.find({}, 'fullname') // Retrieve only the fullname field from all therapists
    .then(therapists => {
      const fullnameList = therapists.map(therapist => therapist.fullname);
      res.json(fullnameList);
    })
    .catch(err => {
      console.error('Error fetching therapists fullnames:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});



module.exports = router;