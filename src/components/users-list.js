// Note: UsersList component...!

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

// Note: Importing required API's from Material UI...!
import { makeStyles } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Note: Importing required components...!
import FormDialog from './dialog-form/dialog-form';

// Note: Handeling Material UI styling here...!
const useStyles = makeStyles((theme) => ({
    mainContainer: {
        height: '100vh',
        // backgroundColor: "whitesmoke",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
    },

    listContainer: {
        backgroundColor: "#299371",
        width: '100%',
        borderRadius: 5
    },

    heading: {
        marginTop: '1em',
        marginBottom: '0.5em',
        fontSize: '2em',
        fontFamily: 'sans-serif',
    },

    listItemStyle: {
        borderBottomColor: "white",
        borderBottomWidth: 2,
        borderBottomStyle: "solid"
    },

    listItemText: {
        fontSize: '1.2em',
        fontFamily: 'sans-serif',
        color: "white"
    },

    iconBtn: {
        color: "white"
    }
}));

const UsersList = () => {

    // Note: To access material ui css...!
    const classes = useStyles();

    // Note: Handeling states here...!
    const [usersList, setUsersList] = useState([]);
    const [openDialogForm, setOpenDialogForm] = useState(false);
    const [userData, setUserData] = useState(null);

    // Note: Function to fetch users from an API...!
    const fetchUsers = async () => {
        // let api = "http://localhost:3001/users";
        let api = "https://crud-app-back-end.herokuapp.com/users";

        try {
            let response = await axios.get(api);
            console.log(response);

            let requiredData = response.data;
            setUsersList(requiredData);
        }

        catch (error) {
            console.log(error);
        }
    }

    // Note: When this component rendered successfully then this hook will run...!
    useEffect(() => fetchUsers(), []);

    // Note: When this component unmounted then this hook will run...!
    // Note: returned function will be called on component unmount...!
    useEffect(() => {
        return () => {
            console.log('Component unmounted successfully!');
            setUsersList([]);
        }
    }, []);

    // Note: Function to view user data...!
    const viewUserData = (data) => {
        // console.log(data);

        swal({
            title: "User Information",
            text: `His name is ${data.name}, and his email address is ${data.email}`,
            icon: "success",
            button: "Ok!",
        });
    }

    // Note: Function to delete user...!
    const deleteUser = async (data, key) => {
        console.log(data, key);

        // let api = "http://localhost:3001/user/delete";
        let api = "https://crud-app-back-end.herokuapp.com/user/delete";

        try {
            let response = await axios.post(api, {
                email: data.email
            });
            console.log(response);

            if (response.status === 200) {
                setUsersList([...response.data]);
                swal({
                    title: "User Deleted",
                    text: `The user with the email id ${data.email} has been deleted successfully!`,
                    icon: "success",
                    button: "Ok!",
                });
            }
        }

        catch (error) {
            console.log(error.response);
        }
    }

    // Note: Function to edit user...!
    const editUser = (data, key) => {
        console.log(data, key);
        setUserData(data);
        setOpenDialogForm(true)

        // setTimeout(() => setOpenDialogForm(true), 2000);
    }

    // Note: Function to close dialog form...!
    const closeHandler = (status) => {
        // console.log(status);

        if (status === "Cancel") {
            setOpenDialogForm(false);
            setUserData(null);
        }
    }

    // Note: Function to check user status for updating users list...!
    const userStatus = (response) => {
        console.log('Response recieved in users list screen: ', response);
        setUsersList([...response.data]);
    }

    // Note: Function to delete all users...!
    const deleteAllUsers = async () => {

        // let api = "http://localhost:3001/user/deleteAll";
        let api = "https://crud-app-back-end.herokuapp.com/user/deleteAll";

        try {
            let response = await axios({
                method: "DELETE",
                url: api,
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response);

            if (response.status === 200) {
                setUsersList([...response.data]);

                swal({
                    title: "All Users Deleted",
                    text: "All users has been deleted successfully!",
                    icon: "success",
                    button: "Ok!",
                });
            }
        }

        catch (error) {
            console.log(error.response);
        }
    }

    return (
        <React.Fragment>
            <FormDialog
                dialogStatus={openDialogForm}
                close={closeHandler}
                user={userData}
                updatingStatus={userStatus}
            />

            {
                (usersList.length > 0)
                    ?
                    (
                        <div className={classes.mainContainer}>
                            <h1 className={classes.heading}>
                                Users List!
                            </h1>

                            <Button
                                variant="contained"
                                disableElevation
                                style={{ marginBottom: 10, backgroundColor: "red" }}
                                onClick={deleteAllUsers}
                            >
                                Delete All Users
                            </Button>

                            <Grid item xs={12} md={6} className={classes.listContainer}>
                                <List>
                                    {
                                        usersList.map((item, index) => {
                                            return (
                                                <ListItem
                                                    key={index}
                                                    className={classes.listItemStyle}
                                                    secondaryAction={
                                                        <div>
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="folder"
                                                                style={{ marginRight: 1 }}
                                                                onClick={() => { viewUserData(item) }}
                                                            >
                                                                <FolderIcon
                                                                    className={classes.iconBtn}
                                                                />
                                                            </IconButton>

                                                            <IconButton
                                                                edge="end"
                                                                aria-label="edit"
                                                                style={{ marginRight: 1 }}
                                                                onClick={() => { editUser(item, index) }}
                                                            >
                                                                <EditIcon
                                                                    className={classes.iconBtn}
                                                                />
                                                            </IconButton>

                                                            <IconButton
                                                                edge="end"
                                                                aria-label="delete"
                                                                onClick={() => { deleteUser(item, index) }}
                                                            >
                                                                <DeleteIcon
                                                                    className={classes.iconBtn}
                                                                />
                                                            </IconButton>
                                                        </div>
                                                    }
                                                >
                                                    <ListItemText
                                                        primary={item.name}
                                                        className={classes.listItemText}
                                                    />
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </Grid>
                        </div>
                    )
                    :
                    (
                        <div className={classes.mainContainer}>
                            <h1 className={classes.heading}>
                                Sorry! No User Found! 😢
                            </h1>
                        </div>
                    )
            }
        </React.Fragment>
    );
}

export default UsersList;