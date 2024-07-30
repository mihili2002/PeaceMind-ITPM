import React, { useState, useEffect } from 'react';
import '../../styles/Paymentcontent.css';
import PaymentContentHeader from './PaymentContentHeader';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentHistory(){

  const{ id } = useParams();
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(()=>{
    function getPayments(){
      axios.get('http://localhost:8070/payment/allpayments')
      .then((res)=> {
          // Initially set status as "Pending"
          const updatedPaymentHistory = res.data.map(payment => ({ ...payment, Status: "Pending" }));
          setPaymentHistory(updatedPaymentHistory);
      }).catch((err)=> {
        alert(err.message);
      })
    }
    getPayments();
  }, []);
 
  const navigate = useNavigate();

  const deletePayment = (id) => {
    console.log("Deleting payment with ID:", id);
    axios.delete(`http://localhost:8070/payment/Paymentdelete/${id}`)
    .then(Response => {
      alert('Payment deleted successfully');
      setPaymentHistory(paymentHistory.filter(payment => payment._id !== id ));
      navigate('/PaymentUser/PaymentPayment_History');
  
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }
  
  const handleRefundRequest = () => {
    navigate('/User/Refund');
  };
  
  // Function to format date in YYYY-MM-DD format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Function to update payment status
  const updatePaymentStatus = (id, status) => {
    console.log("Updating payment status with ID:", id);
    axios.put(`http://localhost:8070/payment/PaymentupdateStatus/${id}`, { status })
    .then(response => {
      alert('Payment status updated successfully');
      // Update status in local state
      setPaymentHistory(paymentHistory.map(payment => {
        if (payment._id === id) {
          return { ...payment, Status: status };
        }
        return payment;
      }));
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }

  return (
    <div className="content">
      <PaymentContentHeader  />
      <div className="table-content">
        <h2 style={{ fontSize: '1.4em', fontWeight: 'bold'  }}>Payment History</h2>
        <div><button className="report-button">Request Refund</button></div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Invoice ID</th>
              <th>Payment Type</th>
              <th>Bank Name</th>
              <th>Paid Amount</th>
              <th>Paid Date</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete </th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, index) => (
              <tr key={payment.id}>
                <td>{index + 1}</td>
                <td>{payment.invoiceID}</td>
                <td>{payment.paymentType}</td>
                <td>{payment.bankName}</td>
                <td>{payment.paidAmount}</td>
                <td>{formatDate(payment.paidDate)}</td> {/* Format date here */}
                <td>{payment.status}</td>
                <td><button className="report-button"><Link to={`/Paymentupdate/${payment._id}`}>Edit</Link></button></td>
                <td><button type="button" onClick={() => deletePayment(payment._id)}  className="report-button"> Delete </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
