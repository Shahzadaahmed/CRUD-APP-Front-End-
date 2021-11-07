// Note: UsersList component...!

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

// Note: Importing required API's from Material UI...!
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import { makeStyles } from '@material-ui/core';

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

    // Note: Function to fetch users from an API...!
    const fetchUsers = async () => {
        let api = "http://localhost:3001/users";

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
        // console.log(data, key);

        let api = `http://localhost:3001/user/${key}`;

        try {
            let response = await axios.delete(api);
            // let response = axios({
            //     method: 'DELETE',
            //     url: `http://localhost:3001/user/1`,
            //     headers: { 'Content-Type': 'application/json' },
            // });
            console.log(response);
        }

        catch (error) {
            console.log(error.response);
        }
    }

    return (
        <React.Fragment>
            {
                (usersList.length > 0)
                    ?
                    (
                        <div className={classes.mainContainer}>
                            <h1 className={classes.heading}>
                                Users List!
                            </h1>

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