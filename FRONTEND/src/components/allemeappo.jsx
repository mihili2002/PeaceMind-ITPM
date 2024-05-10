//import logo from './logo.svg';
import '../styles/emeinsert.css';
import {useState, useEffect} from "react" ;
import axios from "axios";
import '../styles/allemeappo.css';
import Navbar from "../components/navBar";
//axios.defaults.baseURL = "http://localhost:8070/Emergency/"
export default function AllApp() {

const [Emergency, setEmergency] = useState([]);

   // const {petid} = useParams();

   useEffect(() => {
    getEmergency();
}, []);

function getEmergency() {
    axios.get(`http://localhost:8070/Emergency/`)
        .then((res) => {
            setEmergency(res.data.existingProject);
        })
        .catch((err) => {
            alert(err.message);
        });
}

       //delete the somthin page is reffesh
       function refreshPage(){
        window.location.reload(false);
      }

//delete funtion
   
    const deleteData = (id) => {
      const dataToDelete = Emergency.find((e) => e._id === id);
      saveDataToAnotherTable(dataToDelete);

      axios.delete(`http://localhost:8070/Emergency/delete/${id}`)
          .then(() => {
              getEmergency();
          })
          .catch((error) => {
              alert(error.message);
          });
  };
    
    const saveDataToAnotherTable = (data) => {
      // Ensure that the data being sent does not contain functions
      const cleanData = removeFunctions(data);

      axios.post(`http://localhost:8070/DeEmergency/save`, cleanData)
          .then(() => {
              console.log("Data saved to another table successfully");
          })
          .catch((error) => {
              alert(error.message);
          });
  };
  
    const removeFunctions = (data) => {
      // Recursive function to remove functions from nested objects
      if (typeof data === "object" && data !== null) {
          const cleanObject = {};
          for (let key in data) {
              if (typeof data[key] !== "function") {
                  cleanObject[key] = removeFunctions(data[key]);
              }
          }
          return cleanObject;
      } else {
          return data;
      }
  };
  
    const [serQuary,setSerQuary]=useState("");
  
    const searchAppointment = (event) => {
      setSerQuary(event.target.value);
  };

  return(


<div className= 'tableContainer'>

   
    <Navbar />
<div className="order-section-one-right">
    
                      <input onChange={searchAppointment} type="search" placeholder="Search" className="search-box" />
                  </div>
    <table id="t1">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Doctor</th>
                <th>category</th>
                <th>Reason</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            
               
                   {Emergency && Emergency.filter(Emergency => 
  
                    Emergency.name.includes(serQuary)||
                    Emergency.doctor.includes(serQuary)||
                    Emergency.name.toLowerCase().includes(serQuary)
                   

                    ).map((el, index) =>(
                        <tr>
                            <td>{el.name}</td>
                            <td>{el.email}</td>
                            <td>{el.age}</td>
                            <td>{el.gender}</td>
                            <td>{el.doctor}</td>
                            <td>{el.category}</td>
                            <td>{el.reason}</td>
                            <td><a href={"/Updateeme/"+el._id} >
                                <button id="table-button" className="btn btn-outline-primary btn-sm" >
                                    <i className="fas fa-edit" ></i>&nbsp;Edit
                                </button>
                              </a>&nbsp;
                              <a href="#">
                                <button id="table-button" className="btn btn-outline-danger btn-sm" onClick={() => {deleteData(el._id)}}>
                                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                </button>
                              </a>
                              </td>
                        </tr>
                  

                ))
            }
        </tbody>
    </table>
   
</div>
  );
}
