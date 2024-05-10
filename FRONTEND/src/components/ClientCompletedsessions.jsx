import { Card, Typography } from "@material-tailwind/react";
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
const TABLE_HEAD = ["AppointmentDate", "time"];


export function ClientCompletedsessions() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    useEffect(() => {
      axios.get('http://localhost:8070/client/completed-appointments/' + decodedToken.email)
        .then(res => {
          console.log(res);
          setUsers(res.data); 
        })
        .catch(err => console.error(err));
    }, [decodedToken]);
  
    return (
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
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
              const classes = isLast ? "p-4 bg-blue-100" : "p-4 border-b border-blue-gray-50 bg-blue-100";
              const formatDate = (dateString) => {
                const date = new Date(dateString);
                return date.toLocaleDateString();
              };
              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal text-blue-700">
                      {formatDate(row.AppointmentDate)}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-100/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal text-blue-700">
                      {row.time}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    );
  }