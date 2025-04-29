import React, { useState, useEffect } from 'react';
import '../styles/Pharmacycontent.css';
import PharmacyContentHeader from './PharmacyContentHeader';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer'; // Import PDFDownloadLink
import { Document, Page, Text, View } from '@react-pdf/renderer'; // Import Document, Page, Text, and View from react-pdf

// Define PDF document component

// Define CSS styles object
const styles = {
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header: {
    fontSize: 20,
    marginBottom: 10
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf'
  },
  tableRow: {
    marginVertical: 5, // Adjust the margin as needed
    flexDirection: 'row'
  },
  tableCell: {
    marginVertical: 5, // Adjust the margin as needed
    flexGrow: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 8
  }
};


const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Monthly Report</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Drug Name</Text>
            <Text style={styles.tableHeader}>Drug Type</Text>
            <Text style={styles.tableHeader}>Drug Price</Text>
            <Text style={styles.tableHeader}>Expire Date</Text>
            <Text style={styles.tableHeader}>Supplier Name</Text>
            <Text style={styles.tableHeader}>Quantity</Text>
          </View>
          {data.map((drug, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{drug.name}</Text>
              <Text style={styles.tableCell}>{drug.type}</Text>
              <Text style={styles.tableCell}>{drug.price}</Text>
              <Text style={styles.tableCell}>{new Date(drug.ExDate).toLocaleDateString()}</Text>
              <Text style={styles.tableCell}>{drug.supplierName}</Text>
              <Text style={styles.tableCell}>{drug.quantity}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);



const MonthlyOverview = () => {
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(1); // Default to January
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  const fetchMonthlyReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8070/drug/Pharmacymonthly', {
        params: {
          month: selectedMonth, // Using selectedMonth directly
          year: selectedYear
        }
      });
      console.log('Monthly report response:', response.data); // Add this line to log the response data
      setMonthlyReport(response.data);
    } catch (error) {
      console.error('Error fetching monthly report:', error);
      setError('Error fetching monthly report. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8070/drug/Pharmacyweekly');
      setMonthlyReport(response.data);
    } catch (error) {
      console.error('Error fetching weekly report:', error);
      setError('Error fetching weekly report. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value)); // Parse month value to integer
  };
   
  // Function to format date in YYYY-MM-DD format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="content">
        <PharmacyContentHeader/>
        <div>
        <h2 style={{ fontSize: '1.4em', fontWeight: 'bold' }}>Monthly Overview</h2>
        <div>
          {/* Month selector dropdown */}
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
          {/* Button to fetch monthly report */}
          <button className="report-button" onClick={fetchMonthlyReport}>
            Generate Monthly Report
          </button>
          <button className="report-button" onClick={fetchWeeklyReport}>
            Weekly Report
          </button>
          {/* PDF download link */}
          <button className="report-button">
          <PDFDownloadLink document={<MyDocument data={monthlyReport} />} fileName="monthly_report.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download PDF'
            }
          </PDFDownloadLink></button>
        </div>
        {error && <p>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Drug Name</th>
                <th>Drug Type</th>
                <th>Drug Price</th>
                <th>Expire Date</th>
                <th>Supplier Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReport.map((drug) => (
                <tr key={drug.id}>
                  <td>{drug.name}</td>
                  <td>{drug.type}</td>
                  <td>{drug.price}</td>
                  <td>{formatDate(drug.ExDate)}</td>
                  <td>{drug.supplierName}</td>
                  <td>{drug.quantity}</td>


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