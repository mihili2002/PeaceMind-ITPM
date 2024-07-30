import React, { useEffect, useRef, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from "axios";
import User from '../User/User';
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:8070/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users() {
  const [users, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Salary Report",
    onAfterPrint: () => ("Salary Report Successfully Download"),
  });

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  };

  return (
    <div>
      <Nav/>
      <div style={styles.searchContainer}>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Employess Salary Details"
          style={styles.searchBar}
        />
        <button onClick={handleSearch} style={styles.searchButton}>Search</button>
      </div>
      {noResults ? (
        <div>
          <p> No Users Found</p>
        </div>
      ) : (
        <div style={styles.container}>
          {users && users.map((user, i) => (
            <div key={i} ref={ComponentsRef}>
              <User user={user} />
              <button onClick={handlePrint} style={styles.button}><center>Download Report</center></button>
              <br />
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
    marginLeft: '100px', // Move the button to the right
    marginRight: '50px', 
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Align items horizontally in the center
    marginTop: '10px', // Move the container slightly down
  },
  searchBar: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
    marginRight: '10px',
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Users;
