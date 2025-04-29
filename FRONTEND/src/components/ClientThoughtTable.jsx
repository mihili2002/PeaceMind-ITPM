import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["Date", "Thought", "Reason"];

export function ClientThoughtTable() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null; // Decode the token to get user ID

  useEffect(() => {
    if (decodedToken) {
      axios
        .get("http://localhost:8070/client/thoughtlog/" + decodedToken.email)
        .then((res) => {
          console.log(res);
          if (Array.isArray(res.data)) {
            setUsers(res.data);
          } else {
            console.error("Invalid data format for users:", res.data);
            setUsers([]);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [decodedToken]);

  return (
    <Card className="h-full w-full overflow-scroll">
      <Link to="/ClientThoughtForm">
        <button>Add Thought</button>
      </Link>
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
                      {formatDate(row.date)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-blue-700"
                    >
                      {row.thought}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-blue-700"
                    >
                      {row.reason}
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
