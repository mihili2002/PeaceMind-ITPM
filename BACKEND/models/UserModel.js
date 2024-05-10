const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    numberOfSessions: {
        type: Number,
        default: 0
    },
    amountPerSession: {
        type: Number,
        default: 0
    },
    salary: {
        type: Number,
        default: function() {
            // Calculate salary only if numberOfSessions and amountPerSession are valid numbers
            if (!isNaN(this.numberOfSessions) && !isNaN(this.amountPerSession)) {
                return this.numberOfSessions * this.amountPerSession;
            } else {
                return 0; // Return default value if either field is not a valid number
            }
        }
    }
});


module.exports = mongoose.model("UserModel", employeeSchema);

/*const validateNIC = (nic) => {
    // Regular expression to match 12 digits followed by a single English letter (capital or simple)
    const nicRegex = /^\d{12}[a-zA-Z]$/;

    // Test the NIC against the regular expression
    return nicRegex.test(nic);
};*/

// const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;