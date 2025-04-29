const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
let Waitlist = require("../models/waitlist"); // Assuming waitlistp.js defines the Waitlist model

router.route("/add").post((req, res) => {
  const { name, address, email, contact_number, Preferred_Doctor, waitlistDate, Session_Time } = req.body;

  // Check if waitlistDate is provided
  if (!waitlistDate) {
    return res.status(400).json({ error: "waitlistDate is required" });
  }

  const newWaitlist = new Waitlist({
    name,
    address,
    email,
    contact_number,
    Preferred_Doctor,
    waitlistDate,
    Session_Time
  });

  newWaitlist.save()
  
    .then(() => {
      // Send payment confirmation email
    //sendPaymentConfirmationEmail(email);

      res.json("Waitlist Patient Added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error adding Waitlist Patient" });
    });
});







router.route("/").get((req,res)=>{

    Waitlist.find().then((waitlists)=>{ //read
        res.json(waitlists)
    }).catch((err)=>{
        console.log(err)
    })

})





router.route("/update/:id").put(async(req,res)=>{ //update
    let userId = req.params.id;
    const{name,address,email,contact_number,Preferred_Doctor,waitlistDate,Session_Time} = req.body;

    const updateWaitlist = {
      name,
      address,
      email,
      contact_number,
      Preferred_Doctor,
      waitlistDate,
      Session_Time
    }

    const update = await Waitlist.findByIdAndUpdate(userId,updateWaitlist).then(()=>{

        res.status(200).send({status:"User updated"})
    }).catch((err)=>{
        console.log.apply(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})



router.route("/delete/:id").delete(async(req,res)=>{  //delete
    let userId = req.params.id;

    await Waitlist.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({sttaus: "User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete  waitlist patient", error: err.message});

    })
})

router.route("/get/:id").get(async(req,res) => {
  try {
      let userId = req.params.id;
      const user = await Waitlist.findById(userId)
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
})

//monthly report
router.get("/monthly", async (req, res) => {
  try {
    const { month, year } = req.query;
    const parsedMonth = parseInt(month);
    const parsedYear = parseInt(year);
    
    if (isNaN(parsedMonth) || isNaN(parsedYear)) {
      return res.status(400).json({ error: "Invalid month or year" });
    }

    const startDate = new Date(parsedYear, parsedMonth - 1, 1); // Corrected month index
    const endDate = new Date(parsedYear, parsedMonth, 0); // Get the last day of the month

    const monthlyReport = await Waitlist.find({
      waitlistDate: { $gte: startDate, $lte: endDate }
    });
    
    res.json(monthlyReport);
  } catch (error) {
    console.error("Error fetching monthly report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Generate Weekly Report
router.get("/weekly", async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Get date 7 days ago
    const weeklyReport = await Waitlist.find({
      waitlistDate: { $gte: startDate }
    });
    res.json(weeklyReport);
  } catch (error) {
    console.error("Error fetching weekly report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/").get(async (req, res) => {
  try {
    const { name } = req.query;
    let query = {};
    if (name) {
      // Case-insensitive search by name
      query = { name: { $regex: new RegExp(name, "i") } };
    }
    const waitlists = await Waitlist.find(query);
    res.json(waitlists);
  } catch (error) {
    console.error("Error fetching waitlists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const sendEmailConfirmationEmail = (email) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
   port: 465,
   secure: true,
    auth: {
      user: "peacemind1875@gmail.com", // Enter your Gmail email address
      pass: "nvxb zphr fema grvz", // Enter your Gmail password
    },
    tls: {
      rejectUnauthorized: false // Trust self-signed certificate
    }
  });

  // Define email content
  const mailOptions = {
    from: "peacemind1875@gmail.com", // Enter your Gmail email address
    to: email,
    subject: "Waitlist Confirmation",
    text: "Added to waitlist successfully.",
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

// Route to handle sending waitlist confirmation email
router.post('/send-email', (req, res) => {
  const { email } = req.body;

  sendEmailConfirmationEmail(email);

  res.status(200).json({ message: "Email sent successfully" });
});



module.exports = router;

