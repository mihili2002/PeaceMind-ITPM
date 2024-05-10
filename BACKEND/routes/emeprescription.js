const express = require('express');
const Emergency = require('../models/emeprescription');
const router = express.Router();
const path = require("path");
const fs =require("fs")



router.post('/EmergencyPre/save', (req, res) => {
    let newPro = new Emergency(req.body);

    newPro.save()
        .then(() => {
            return res.status(200).json({
                success: "Prescription successfully saved"
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});

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
router.get('/EmergencyPre', (req, res) => {
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

router.get("/EmergencyPre/:id", (req, res) => {
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

router.put('/EmergencyPre/update/:id', (req, res) => {
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
 //read name


 router.get("/EmergencyPre/get/:names", (req, res) => {
    let emeId = req.params.names;

    Emergency.find({ names: emeId })
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

//delete
router.delete('/EmergencyPre/delete/:id', (req, res) => {
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