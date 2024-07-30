

// import { Card, Typography} from "@material-tailwind/react";
 
// const TABLE_HEAD = ["Name", "Age","Gender","Doctor","Currently","Category","Reason" ];
 
// const TABLE_ROWS = [
//   {
//     Name: "John Michael",
//     Age: "21",
//     Gender:"Male",
//     Doctor:"Malith Perera",
//     Currently:"In Patient",
//     Category:"Dental",
//     Reason:"I need a dental appointment",
//   },
// ];
 
// export default function Etable() {
//   return (
//     <Card className="h-full w-full overflow-scroll">
//       <table className="w-full min-w-max table-auto text-left">
//         <thead>
//           <tr>
//             {TABLE_HEAD.map((head) => (
//               <th
//                 key={head}
//                 className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   {head}
//                 </Typography>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {TABLE_ROWS.map(({ Name, Age, Gender,Doctor,Currently,Category,Reason}, index) => {
//             const isLast = index === TABLE_ROWS.length - 1;
//             const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
//             return (
//               <tr key={Name}>
//                 <td className={classes}>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal"
//                   >
//                     {Name}
//                   </Typography>
//                 </td>
//                 <td className={classes}>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal"
//                   >
//                     {Age}
//                   </Typography>
//                 </td>
//                 <td className={classes}>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal"
//                   >
//                     {Gender}
//                   </Typography>
//                 </td>
//                 <td className={classes}>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal"
//                   >
//                     {Doctor}
//                   </Typography>
//                 </td>
//                 <td className={classes}>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal"
//                   >
//                     {Currently}
//                   </Typography>
//                 </td>
//                 <td className={classes}>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal"
//                   >
//                     {Category}
//                   </Typography>
//                 </td>
//                 <td className={classes}>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal"
//                   >
//                     {Reason}
//                   </Typography>
//                 </td>
                
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </Card>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";

export default function EmergencyAppointments() {
  const [emergencyAppointments, setEmergencyAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/therapist/getEmergencyAppointments")
      .then((res) => {
        console.log(res);
        setEmergencyAppointments(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {emergencyAppointments.map((appointment) => (
          <div key={appointment._id} className="bg-white shadow-md rounded-md p-4">
            <Typography variant="h6" color="blue-gray" className="font-bold mb-2">
              {appointment.name}
            </Typography>
            <Typography variant="subtitle1" color="blue-gray" className="mb-2">
              Address: {appointment.address}
            </Typography>
            <Typography variant="subtitle1" color="blue-gray" className="mb-2">
              Contact No: {appointment.ContactNo}
            </Typography>
            <Typography variant="subtitle1" color="blue-gray" className="mb-2">
              Email: {appointment.email}
            </Typography>
            <Typography variant="subtitle1" color="blue-gray" className="mb-2">
              Time: {appointment.time}
            </Typography>
            <Typography variant="subtitle1" color="blue-gray" className="mb-2">
              Date: {new Date(appointment.AppointmentDate).toLocaleDateString()}
            </Typography>
          </div>
        ))}
      </div>
    </Card>
  );
}
