import React, { useState, useEffect } from 'react';
import '../../styles/Paymentcontent.css';
import PaymentAContentHeader from './PaymentAContentHeader';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ManagePayments() {
  const { id } = useParams();
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    function getPayments() {
      axios
        .get('http://localhost:8070/payment/allpayments')
        .then((res) => {
          setPaymentHistory(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getPayments();
  }, []);

  const navigate = useNavigate();

  const [buttonStates, setButtonStates] = useState({});

  const updatePaymentStatus = (id, status) => {
    axios
      .put(`http://localhost:8070/payment/PaymentupdateStatus/${id}`, { status: status })
      .then((response) => {
        // Update local state with the updated payment object from the response
        const updatedPayment = response.data.payment;
        setPaymentHistory((prevPaymentHistory) => {
          return prevPaymentHistory.map((payment) => {
            if (payment._id === updatedPayment._id) {
              return updatedPayment;
            }
            return payment;
          });
        });
        setButtonStates((prevButtonStates) => ({
          ...prevButtonStates,
          [id]: status,
        }));
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  // Function to format date in YYYY-MM-DD format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="content">
      <PaymentAContentHeader />
      <div className="table-content">
        <h2>Payment History</h2>

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
              <th>Accept</th>
              <th>Decline</th>
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
                <td>
                  <button
                    type="button"
                    className="report-button"
                    style={{
                      backgroundColor: buttonStates[payment._id] === 'Accepted' ? 'darkblue' : '',
                    }}
                    onClick={() => {
                      updatePaymentStatus(payment._id, 'Accepted');
                    }}
                    disabled={buttonStates[payment._id] === 'Accepted' || buttonStates[payment._id] === 'Declined'}
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="report-button"
                    style={{
                      backgroundColor: buttonStates[payment._id] === 'Declined' ? 'red' : '',
                    }}
                    onClick={() => {
                      updatePaymentStatus(payment._id, 'Declined');
                    }}
                    disabled={buttonStates[payment._id] === 'Accepted' || buttonStates[payment._id] === 'Declined'}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
