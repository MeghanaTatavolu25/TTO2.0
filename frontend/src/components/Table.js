import React from 'react';

import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        backgroundColor: '#e7f2fb',
        padding: theme.spacing(2),
        minHeight: '100vh',
        padding: ' 0 2em'
    },
    filterGroup: {
        marginTop: theme.spacing(2),
    },


    pagination: {
        display: 'flex',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    },

    heading: {
        fontFamily: 'Hahmlet',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '22px',
        lineHeight: '45px',
        letterSpacing: '-0.04em',
        color: '#084D9C'
    },

    eachitem: {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 500,
        color: '#4591C5',
        lineHeight: '5px',

    },



    tableitem: {
        fontFamily: 'Hahmlet',
        fontStyle: 'normal',
        fontWeight: 500,
        color: '#2C2C2C',
        lineHeight: '2em',
        fontSize: '19px',

    }
    ,
    checkbox: {
        color: '#4591C5  ', // set the color to blue
        '&$checked': {
            color: '#0E66AC          ', // set the color of the checked state to blue
        },
        // border: '1px solid #0E66AC',

        borderRadius: '4px'
    },

    checked: {},
}));


const MyTable = ({users}) => {
    const classes = useStyles();

    return (
        <div style={{ flex: "1"}}>
            {/* to adjust spacing between filters tab and table */}
            <table className="table-auto " style={{ width: "100%" }}>
        {console.log(users)}
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th className={classNames(classes.heading, 'px-4', 'py-2')} >SI No</th>

                        <th className={classNames(classes.heading, 'px-4', 'py-2')}  >Title</th>
                        <th className={classNames(classes.heading, 'px-4', 'py-2')} >Research Lab</th>

                        <th className={classNames(classes.heading, 'px-4', 'py-2')}  >Inventor List</th>
                        <th className={classNames(classes.heading, 'px-4', 'py-2')} >Application/Patent No</th>

                        <th className={classNames(classes.heading, 'px-4', 'py-2')}  >Patent Status</th>
                    </tr>
                </thead>


                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} style={{ textAlign: "center" }} >
                            <td  className={classNames(classes.tableitem, 'px-4', 'py-2')}>{user.id}</td>
                            <td  className={classNames(classes.tableitem, 'px-4', 'py-2')}>{user.name}</td>
                            <td  className={classNames(classes.tableitem, 'px-4', 'py-2')}>{user.username}</td>
                            <td  className={classNames(classes.tableitem, 'px-4', 'py-2')}>{user.email}</td>
                            <td  className={classNames(classes.tableitem, 'px-4', 'py-2')}>{user.phone}</td>
                            <td  className={classNames(classes.tableitem, 'px-4', 'py-2')}>{user.website}</td>
                        </tr>
                    ))}
                </tbody>


            </table>
        </div>
    );
};

export default MyTable;

