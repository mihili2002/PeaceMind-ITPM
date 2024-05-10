const express = require('express');
const Emergency = require('../models/emergency');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'smmaster1234@outlook.com',
        pass: '123smmaster#'
    }
});

router.post('/Emergency/save', async (req, res) => {
    try {
        // Save emergency data
        const newPro = new Emergency(req.body);
        await newPro.save();

        // Send email notification
        await transporter.sendMail({
            from: 'smmaster1234@outlook.com',
            to: 'it22913210@my.sliit.lk', 
            subject: 'New Emergency Appoinment Added',
            html: '<p>New emergency Appoinment has been added to the system.</p>'
        });

        return res.status(200).json({
            success: "Emergency data successfully saved and email sent"
        });
    } catch (error) {
        console.error('Error saving emergency data and sending email:', error);
        return res.status(500).json({
            error: error.message || 'Internal Server Error'
        });
    }
});

// router.post('/Emergency/save', (req, res) => {
//     let newPro = new Emergency(req.body);

//     newPro.save()
//         .then(() => {
//             return res.status(200).json({
//                 success: "Project successfully saved"
//             });
//         })
//         .catch(err => {
//             return res.status(400).json({
//                 error: err
//             });
//         });
// });

// router.post('/Emergency/save', async (req, res) => {
//     try {
//         let Newpro = new Emergency(req.body);
//         await Newpro.save();
//         return res.status(200).json({
//             success: "Project successfully saved"
//         });
//     } catch (err) {
//         return res.status(400).json({
//             error: err.message
//         });
//     }
// });

//read
router.get('/Emergency', (req, res) => {
    Emergency.find().exec()
        .then(emergency => {
            return res.status(200).json({
                success: true,
                existingProject: emergency
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});
// router.get('/Emergency', async (req, res) => {
//     try {
//         const emergency = await Emergency.find().exec();
//         return res.status(200).json({
//             success: true,
//             existingProject: emergency
//         });
//     } catch (err) {
//         return res.status(400).json({
//             error: err
//         });
//     }
// });



//get specific details

router.get("/Emergency/:id", (req, res) => {
    let preId = req.params.id;

    Emergency.findById(preId)
        .then(emergency => {
            if (!emergency) {
                return res.status(404).json({ success: false, error: 'Emergency not found' });
            }
            return res.status(200).json({
                success: true,
                Emergency: emergency
            });
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err });
        });
});

router.get("/Emergency/get/:name", (req, res) => {
    let emeId = req.params.name;

    Emergency.find({ name: emeId })
        .then(Emergency => {
            return res.status(200).json({
                success: true,
                Emergency: Emergency
            });
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err });
        });
});


// router.get("/Emergency/:id", async (req, res) => {
//     try {
//         let preId = req.params.id;
//         const emergency = await Emergency.findById(preId);
//         if (!emergency) {
//             return res.status(404).json({ success: false, error: 'Emergency not found' });
//         }
//         return res.status(200).json({
//             success: true,
//             Emergency: emergency
//         });
//     } catch (err) {
//         return res.status(400).json({ success: false, error: err });
//     }
// });





 
//update

router.put('/Emergency/update/:id', (req, res) => {
    Emergency.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(() => {
            return res.status(200).json({ success: "Emergency Updated Successfully" });
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });
});
// router.put('/Emergency/update/:id', async (req, res) => {
//     try {
//         await Emergency.findByIdAndUpdate(req.params.id, { $set: req.body });
//         return res.status(200).json({ success: "Emergency Updated Successfully" });
//     } catch (err) {
//         return res.status(400).json({ error: err });
//     }
// });


//delete
router.delete('/Emergency/delete/:id', (req, res) => {
    Emergency.findByIdAndDelete(req.params.id)
        .then(deletedProject => {
            if (!deletedProject) {
                return res.status(404).json({ message: "Delete unsuccessful - Emergency not found" });
            }
            return res.json({ message: "Delete successful", deletedProject });
        })
        .catch(err => {
            return res.status(400).json({ message: "Delete unsuccessful", error: err });
        });
});

// router.delete('/Emergency/delete/:id', async (req, res) => {
//     try {
//         const deletedProject = await Emergency.findByIdAndRemove(req.params.id);
//         if (!deletedProject) {
//             return res.status(404).json({ message: "Delete unsuccessful - Emergency not found" });
//         }
//         return res.json({ message: "Delete successful", deletedProject });
//     } catch (err) {
//         return res.status(400).json({ message: "Delete unsuccessful", error: err });
//     }
// });









module.exports = router;