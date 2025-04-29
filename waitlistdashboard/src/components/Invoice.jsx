import React from 'react';
import ContentHeader from './ContentHeader';

const Invoice = ({ invoiceID, amountPaid, paidDate, paymentType, bankName }) => {
    return (
      <div className="content">
        <ContentHeader/>
        <div className="invoice-content">
            <h2>Invoice Details</h2>
            <p>Invoice ID: {invoiceID}</p>
            <p>Amount Paid: {amountPaid}</p>
            <p>Paid Date: {paidDate}</p>
            <p>Payment Type: {paymentType}</p>
            <p>Bank Name: {bankName}</p>
        </div>
        </div>
    );
};

export default Invoice;
