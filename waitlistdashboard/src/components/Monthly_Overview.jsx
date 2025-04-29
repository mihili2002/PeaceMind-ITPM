import React, { useState, useEffect } from 'react';
import '../styles/content.css';
import ContentHeader from './ContentHeader';

const MonthlyOverview = () => {
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMonthlyReport = async () => {
    try {
      // Replace 'YOUR_MONTHLY_REPORT_API_ENDPOINT' with the actual endpoint to fetch monthly report data
      const response = await fetch('YOUR_MONTHLY_REPORT_API_ENDPOINT');
      if (!response.ok) {
        throw new Error('Failed to fetch monthly report');
      }
      const data = await response.json();
      setMonthlyReport(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching monthly report:', error);
      setLoading(false);
    }
  };

  const fetchWeeklyReport = async () => {
    try {
      // Replace 'YOUR_WEEKLY_REPORT_API_ENDPOINT' with the actual endpoint to fetch weekly report data
      const response = await fetch('YOUR_WEEKLY_REPORT_API_ENDPOINT');
      if (!response.ok) {
        throw new Error('Failed to fetch weekly report');
      }
      const data = await response.json();
      setMonthlyReport(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weekly report:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyReport();
  }, []);

  return (
    <div className="content">
        <ContentHeader/>
    <div>
      <h2>Monthly Overview</h2>
      <div>
      <button onClick={fetchMonthlyReport} className="report-button">Monthly Report</button>
      <button onClick={fetchWeeklyReport} className="report-button">Weekly Report</button>

      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Payment Type</th>
              <th>Paid Date</th>
              <th>Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {monthlyReport.map((invoice) => (
              <tr key={invoice.invoiceID}>
                <td>{invoice.invoiceID}</td>
                <td>{invoice.paymentType}</td>
                <td>{invoice.paidDate}</td>
                <td>{invoice.paidAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default MonthlyOverview;
