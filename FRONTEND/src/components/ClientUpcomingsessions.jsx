import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const TABLE_HEAD = ["Therapist","AppointmentDate", "time"];

export function ClientUpcomingsessions() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null; // Decode the token to get user ID

  useEffect(() => {
    if (decodedToken) {
      axios
        .get("http://localhost:8070/client/upcoming-sessions/" + decodedToken.email)
        .then((res) => {
          console.log(res);
          if (Array.isArray(res.data)) {
            setUsers(res.data);
          } else {
            console.error("Invalid data format for users:", res.data);
            setUsers([]); // Set users to an empty array
          }
        })
        .catch((err) => console.error(err));
    }
  }, [decodedToken]);

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-center">
        <table className="w-full md:w-2/3 lg:w-1/2 table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-blue-800 font-bold"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((row, index, array) => {
              const isLast = index === array.length - 1;
              const classes = isLast
                ? "p-4 bg-blue-100"
                : "p-4 border-b border-blue-gray-50 bg-blue-100";
              const formatDate = (dateString) => {
                const date = new Date(dateString);
                return date.toLocaleDateString();
              };
              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-blue-700"
                    >
                      {row.therapist}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-blue-700"
                    >
                      {formatDate(row.AppointmentDate)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-blue-700"
                    >
                      {row.time}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
