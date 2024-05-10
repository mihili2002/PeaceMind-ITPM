const router = require("express").Router();
const { body, validationResult, param, query } = require("express-validator");
let Drug = require("../models/Drug");

// POST /add - Add a new drug
router.post("/Pharmacyadd", [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('type').trim().not().isEmpty().withMessage('Type is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('ExDate').isISO8601().toDate().withMessage('Expiration Date must be a valid date'),
    body('supplierName').trim().not().isEmpty().withMessage('Supplier Name is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('invoiceID').trim().not().isEmpty().withMessage('Invoice ID is required'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, type, price, ExDate, supplierName, quantity, invoiceID } = req.body;

    const newDrug = new Drug({
        name, type, price, ExDate, supplierName, quantity, invoiceID
    });

    newDrug.save()
        .then(() => res.json("Drug Added"))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET / - Get all drugs
router.get("/Pharmacy", (req, res) => {
    Drug.find()
        .then(drug => res.json(drug))
        .catch(err => res.status(400).json('Error: ' + err));
});

// PUT /update/:id - Update a specific drug
router.put("/Pharmacyupdate/:id", [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('name').optional().trim(),
    body('type').optional().trim(),
    body('price').optional().toFloat(),
    body('ExDate').optional().isISO8601().toDate(),
    body('supplierName').optional().trim(),
    body('quantity').optional().isInt({ min: 1 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let userId = req.params.id;
    const updateDrug = req.body;

    Drug.findByIdAndUpdate(userId, updateDrug, { new: true })
        .then(() => res.status(200).json({ status: "Drug updated" }))
        .catch(err => res.status(500).json({ status: "Error updating drug", error: err.message }));
});

// DELETE /delete/:id - Delete a specific drug
router.delete("/Pharmacydelete/:id", [
    param('id').isMongoId().withMessage('Invalid user ID')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let userId = req.params.id;
    Drug.findByIdAndDelete(userId)
        .then(() => res.status(200).json({ status: "Drug deleted" }))
        .catch(err => res.status(500).json({ status: "Error deleting drug", error: err.message }));
});

// GET /get/:id - Get a specific drug
router.get("/Pharmacyget/:id", [
    param('id').isMongoId().withMessage('Invalid user ID')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let userId = req.params.id;
    Drug.findById(userId)
        .then(drug => res.status(200).json(drug))
        .catch(err => res.status(500).json({ status: "Error fetching drug", error: err.message }));
});

router.route("/Pharmacyinvoice/:invoiceID").get(async (req, res) => {
  const invoiceID = req.params.invoiceID;
  try {
    const invoice = await Drug.findOne({ invoiceID });
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Monthly Report
router.get("/Pharmacymonthly", async (req, res) => {
  try {
    const { month, year } = req.query;
    const parsedMonth = parseInt(month);
    const parsedYear = parseInt(year);
    
    if (isNaN(parsedMonth) || isNaN(parsedYear)) {
      return res.status(400).json({ error: "Invalid month or year" });
    }

    const startDate = new Date(parsedYear, parsedMonth - 1, 1); // Corrected month index
    const endDate = new Date(parsedYear, parsedMonth, 0); // Get the last day of the month

    const monthlyReport = await Drug.find({
      ExDate: { $gte: startDate, $lte: endDate }
    });
    
    res.json(monthlyReport);
  } catch (error) {
    console.error("Error fetching monthly report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Weekly Report
router.get("/Pharmacyweekly", async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Get date 7 days ago
    const weeklyReport = await Drug.find({
      ExDate: { $gte: startDate }
    });
    res.json(weeklyReport);
  } catch (error) {
    console.error("Error fetching weekly report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Drug status route
router.put("/PharmacyupdateStatus/:id", async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  try {
    const updatedDrug = await Drug.findByIdAndUpdate(id, { Status: status }, { new: true });
    if (!updatedDrug) {
      return res.status(404).json({ status: "Error", error: "Drug not found" });
    }
    res.status(200).json({ status: "Success", message: "Drug status updated", Drug: updatedDrug });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", error: "Failed to update Drug status" });
  }
});


module.exports = router;
