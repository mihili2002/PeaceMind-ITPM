import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Typography } from "@material-tailwind/react";
import theracover from "../images/theracover.jpg";

const TABLE_HEAD = ["Date", "Thought", "Reason"];

const ViewThought = () => {
    const { email } = useParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8070/therapist/ViewThought/" + email)
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
    }, []);

    return (
        <Card className="h-full w-full flex justify-center items-center" style={{ backgroundImage: `url(${theracover})`, backgroundSize: 'cover' }}>
            <div className="flex justify-center">
                <table className="table-auto text-left mt-60 mb-60">
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
};

export default ViewThought;
