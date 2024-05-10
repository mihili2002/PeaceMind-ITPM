const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    paymentType :{
        type:String,
        required: true}, 
    bankName:{
        type : String,
        required: true},
    branchName:{
        type: String,
        required: true},
    email:{
        type: String,
        required: true },
    paidAmount:{
        type: Number,
        required: true },
    paidDate:{
        type: Date,
        required: true},
    paidMonth:{
        type:String,
        required: true},
    paymentSlip:{
        type:Schema.Types.Mixed },
    referenceID: {
        type: String},
    note:{
        type: String},
    invoiceID : {
        type: String},
    status: {
            type: String
            
          }
})
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;