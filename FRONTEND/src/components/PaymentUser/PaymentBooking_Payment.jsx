
import React, { useState } from 'react';
import PaymentContentHeader from './PaymentContentHeader';
import '../../styles/Paymentcontent.css';
import '../../styles/Paymentpaymentform.css';
import PaymentPaymentForm from './PaymentPaymentForm';

const BookingPayment = () => {
    const [formData, setFormData] = useState({
      CouponCode: '',
      AmountPayable: 2500, // Set default amount payable
      Discount: 0, // Initialize discount to 0
      Delivery: '',
      TotalAmount: 2500, // Set default total amount
    });

    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
        // You can perform further actions like submitting the data to a server

        // Show PaymentForm component
        setShowPaymentForm(true);
    };

    const applyCouponCode = () => {
        
    const { CouponCode, AmountPayable } = formData;
    // Check if the entered coupon code is valid
    switch (CouponCode) {
      case 'WEEKEND10':
        setFormData({
          ...formData,
          Discount: 0.1 * AmountPayable, 
          TotalAmount: AmountPayable * 0.9 
        });
        break;
      case 'FRIDAY20':
        setFormData({
          ...formData,
          Discount: 0.2 * AmountPayable, 
          TotalAmount: AmountPayable * 0.8 
        });
        break;
        case 'NEW30':
        setFormData({
          ...formData,
          Discount: 0.3 * AmountPayable, 
          TotalAmount: AmountPayable * 0.7 
        });
        break;
        case 'HEALTHY10':
        setFormData({
          ...formData,
          Discount: 0.1 * AmountPayable, 
          TotalAmount: AmountPayable * 0.9
        });
        break;
        case 'NEWYEAR50':
        setFormData({
          ...formData,
          Discount: 0.5 * AmountPayable, 
          TotalAmount: AmountPayable * 0.5
        });
        break;
      // Add more cases for other coupon codes
      default:

        break;
    }
      
    };

    return (
        <div className="content">
            <PaymentContentHeader />
            <div className="payment-form-container"></div>
            {!showPaymentForm && (
                <div className="payment-form">
                    <form onSubmit={handleSubmit}>
                        <label className="payment-form-label">Coupon Code:</label>
                        <input type="text" name="CouponCode" value={formData.CouponCode} onChange={handleChange} className="payment-form-input"/>
                        <label className="payment-form-label">Amount Payable:</label>
                        <input type="text" name="AmountPayable" value={formData.AmountPayable} onChange={handleChange} className="payment-form-input" />
                        <label className="payment-form-label">Discount:</label>
                        <input type="text" name="Discount" value={formData.Discount} onChange={handleChange}className="payment-form-input"/>
                        <label className="payment-form-label">Total Amount:</label>
                        <input type="text" name="TotalAmount" value={formData.TotalAmount} onChange={handleChange} className="payment-form-input" />
                        <button type="button" className="payment-form-button" onClick={applyCouponCode}>Apply Coupon</button> {/* Change type to button */}
                        <button type="submit" className="payment-form-button" >Next</button>
                    </form>
                </div>
            )}
            {showPaymentForm && <PaymentPaymentForm formData={formData} />}
        </div>
    );
};

export default BookingPayment;
