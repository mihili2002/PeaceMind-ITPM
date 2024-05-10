const express = require('express');
const Avdoctor = require('../models/avdoctors');
const router = express.Router();


router.post('/Avdoctor/save', (req, res) => {
    let newst = new Avdoctor(req.body);

    newst.save()
        .then(() => {
            return res.status(200).json({
                success: "Doctor successfully saved"
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});

router.get('/Avdoctor', (req, res) => {
    Avdoctor.find().exec()
        .then(avdoctor => {
            return res.status(200).json({
                success: true,
                existingDoc: avdoctor
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});
module.exports = router;