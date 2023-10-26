
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    pagination: {
        display: 'flex',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    },

}));


const Patentstable = () => {

    const classes = useStyles();

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
            );
            setUsers(response.data);
        };
        fetchData();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    return (
        <div className="container mx-auto py-4 flex flex-col">
            <div className="flex-grow">

                <table className="table-auto border w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Username</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Phone</th>
                            <th className="px-4 py-2 border">Website</th>
                        </tr>
                    </thead>

                    {/* <tbody>
                    {currentUsers.map((user, rowIndex) => (
                        <tr key={user.id}>
                            {Object.values(user).map((value, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`px-4 py-2 border ${colIndex % 2 === 0 ? "bg-blue-200" : "bg-green-200"}`} // corrected
                                >
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody> */}


                    <tbody>
                        {currentUsers.map((user, rowIndex) => (
                            <tr key={user.id}>
                                {Object.values(user).map((value, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`px-4 py-2 border ${colIndex % 2 === 0 ? "bg-blue-200" : "bg-green-200"}`}
                                    >
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>


                </table>

                <div className="flex justify-center items-center mt-4">
                    <nav className="block">
                        <ul className="pagination flex pl-0 rounded list-none flex-wrap">
                            {pages.map((page) => (
                                <li key={page}>
                                    <button
                                        className={`${currentPage === page
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-blue-500"
                                            } hover:bg-blue-500 hover:text-white px-3 py-2 rounded`}
                                        onClick={handleClick}
                                        id={page}
                                    >
                                        {page}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="flex justify-end items-center mt-4">
                    <p className="text-sm text-gray-600">
                        Showing {indexOfFirstUser + 1} to {indexOfLastUser} of {users.length}{" "}
                        entries
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Patentstable;
