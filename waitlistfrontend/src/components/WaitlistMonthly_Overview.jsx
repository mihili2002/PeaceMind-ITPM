import React, { useState, useEffect } from 'react';
import '../styles/Waitlistcontent.css';
import ContentHeader from './WaitlistContentHeader';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontSize: 12,
    lineHeight: 1.5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  table: {
    width: '100%',
    border: '2px solid #000', // Add thicker border around the table
    borderCollapse: 'collapse', // Add border collapse
    marginTop: 20,
  },
  tableHeaderRow: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row', // Align headers horizontally
    borderBottom: '2px solid #000', // Add thicker bottom border to header row
  },
  tableRow: {
    flexDirection: 'row', // Align rows horizontally
    borderBottom: '1px solid #000', // Add border between rows
  },
  tableHeaderCell: {
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flex: 1, // Let the header cell take the full available width
    borderRight: '1px solid #000', // Add border between cells
  },
  tableCell: {
    padding: '10px 15px',
    textAlign: 'left',
    verticalAlign: 'top',
    flex: 1, // Let the cell take the full available width
    borderRight: '1px solid #000', // Add border between cells
  },
});


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { timeZone: 'UTC' }); // Change 'en-US' as per your locale
};

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Waitlist Patient Report</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.tableHeaderCell}>Name</Text>
            <Text style={styles.tableHeaderCell}>Address</Text>
            <Text style={styles.tableHeaderCell}>Email</Text>
            <Text style={styles.tableHeaderCell}>Contact Number</Text>
            <Text style={styles.tableHeaderCell}>Preferred Doctor</Text>
            <Text style={styles.tableHeaderCell}>Date</Text>
            <Text style={styles.tableHeaderCell}>Session Time</Text>
          </View>
          {data.map((waitlist, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{waitlist.name}</Text>
              <Text style={styles.tableCell}>{waitlist.address}</Text>
              <Text style={styles.tableCell}>{waitlist.email}</Text>
              <Text style={styles.tableCell}>{waitlist.contact_number}</Text>
              <Text style={styles.tableCell}>{waitlist.Preferred_Doctor}</Text>
              <Text style={styles.tableCell}>{formatDate(waitlist.waitlistDate)}</Text>
              <Text style={styles.tableCell}>{waitlist.Session_Time}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);




const WaitlistMonthlyOverview = () => {
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(1); // Default to January
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  const fetchMonthlyReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8070/waitlist/monthly', {
        params: {
          month: selectedMonth,
          year: selectedYear
        }
      });
      console.log('Monthly report response:', response.data);
      setMonthlyReport(response.data);
    } catch (error) {
      console.error('Error fetching monthly report:', error);
      setError('Error fetching monthly report. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value)); // Parse month value to integer
  };

  useEffect(() => {
    fetchMonthlyReport(); // Fetch data on component mount
  }, []); // Empty dependency array to run only once on mount

  


  return (
    <div className="content">
      <ContentHeader/>
      <div>
        <h2>Monthly Overview</h2>
        <div>
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
          <button className="report-button" onClick={fetchMonthlyReport}>
            Generate Monthly Report
          </button>
          <button className="report-button">
            <PDFDownloadLink document={<MyDocument data={monthlyReport} />} fileName="monthly_report.pdf">
              {({ loading }) =>
                loading ? 'Loading document...' : 'Download PDF'
              }
            </PDFDownloadLink>
          </button>
        </div>
        {error && <p>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Preferred Doctor</th>
                <th>Date</th>
                <th>Session Time</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReport.map((waitlist, index) => (
                <tr key={index}>
                  <td>{waitlist.name}</td>
                  <td>{waitlist.address}</td>
                  <td>{waitlist.email}</td>
                  <td>{waitlist.contact_number}</td>
                  <td>{waitlist.Preferred_Doctor}</td>
                  <td>{waitlist.waitlistDate}</td>
                  <td>{waitlist.Session_Time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WaitlistMonthlyOverview;
