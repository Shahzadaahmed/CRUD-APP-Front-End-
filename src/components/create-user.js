// Note: CreateUserScreen component...!

import React, { useState } from 'react';
import {
    Button,
    Grid,
    IconButton,
    Paper,
    Typography,
    FormControl,
    Input,
    InputLabel,
    InputAdornment,
    useTheme,
    useMediaQuery,
    makeStyles
} from '@material-ui/core';
import { AccountCircle, Email, Visibility, VisibilityOff } from '@material-ui/icons';
import axios from "axios";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import crudLogo from "../assets/CRUD.png";
import "../index.css";

// Note: Handeling Material UI styling here...!
const useStyle = makeStyles((theme) => ({
    Paper: {
        width: '520px',
        [theme.breakpoints.down('sm')]: {
            width: "auto"
        },
        color: '#f6f6f6',
        borderRadius: '17px',
        padding: '2em',
        backgroundColor: "white"
    },

    Heading: {
        marginTop: '1em',
        fontSize: '1.3em',
        fontFamily: 'sans-serif',
        color: `#212943`,
    },

    Button: {
        borderRadius: '20px',
        padding: '13px',
        backgroundColor: `#299371`,
        color: '#fff',
        '&:hover': {
            backgroundColor: '#4CD3A8',
        },
    }
}));

const CreateUserScreen = () => {

    // Note: To access Material UI...!
    const classes = useStyle();

    // Note: To control responsiveness...!
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    // Note: Handeling states here...!
    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [enablePassword, setEnablePassword] = useState(false);

    const { name, email, password } = formData;

    // Note: Function to handle form...!
    const onChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    // Note: Function to submit form data...!
    const onSubmit = () => {

        let validEmailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (name.trim().length < 1) {
            swal({
                title: "Name is Required",
                text: "Name field should not be empty!",
                icon: "error",
                button: "Try Again",
            });
        }

        else if (!email.match(validEmailFormat)) {
            swal({
                title: "Email is Required",
                text: "Email field should not be empty or Inavlid Email Address!",
                icon: "error",
                button: "Try Again",
            });
        }

        else if (password.length < 6) {
            swal({
                title: "Password is Required",
                text: "Password field should not be empty or Password length should be greater than six!",
                icon: "error",
                button: "Try Again",
            });
        }

        else {
            // console.log(formData);
            registeredUser(formData);
            clearAll();
        }
    };

    // Note: Function to clear all input fields...!
    const clearAll = () => {
        setformData({
            name: '',
            email: '',
            password: ''
        });
    }

    /***** Note: Function to reset password through API *****/
    const registeredUser = async (data) => {
        console.log(data, 'Form data recieved!');
        setIsButtonDisabled(true);

        // let api = "http://localhost:3001/user";
        let api = "https://crud-app-back-end.herokuapp.com/user";

        try {
            let response = await axios.post(api, data);
            console.log(response);

            if (response.status === 200) {
                swal({
                    title: response.data,
                    text: "Account has been created succesfully!",
                    icon: "success",
                    button: "Ok!",
                });
                setIsButtonDisabled(false);
            }
        }

        catch (error) {
            console.log(error.response.data);
            setIsButtonDisabled(false);
        }
    }

    /***** Note: UI *****/
    return (
        <div id="custom-body">
            <Grid item container style={{ display: "flex", justifyContent: "center" }}>
                <Grid item container component={Paper} elevation={3} className={classes.Paper} justify='center' alignItems='center'>

                    {/* Note: Logo container */}
                    <Grid item container justify='center'>
                        <img
                            alt="Lock-Icon"
                            src={crudLogo}
                            style={{
                                objectFit: "contain",
                                resize: "horizontal"
                            }}
                        />
                    </Grid>

                    {/* Note: Header */}
                    <Grid item container justify='center' className={classes.Heading}>
                        <Typography variant={(matchesSM || matchesXS) ? ('h5') : ('h4')} style={{ textAlign: "center" }}>
                            MERN CRUD APP
                        </Typography>
                    </Grid>

                    <Grid item container direction='row' justify='center' alignItems='center' style={{ marginTop: '2em' }}>

                        {/* Note: Name field container */}
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type="text"
                                name="name"
                                inputProps={{
                                    style: {
                                        fontSize: '1.1rem',
                                        color: "black"
                                    },
                                }}
                                value={name || ""}
                                onChange={onChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility">
                                            <AccountCircle />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        {/* Note: Email field container */}
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard" style={{ marginTop: '0.5em' }}>
                            <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type="email"
                                name="email"
                                inputProps={{
                                    style: {
                                        fontSize: '1.1rem',
                                        color: "black"
                                    },
                                }}
                                value={email || ""}
                                onChange={onChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility">
                                            <Email />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        {/* Note: Password field container */}
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard" style={{ marginTop: '0.5em' }}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={enablePassword ? 'text' : 'password'}
                                name="password"
                                inputProps={{
                                    style: {
                                        fontSize: '1.1rem',
                                        color: "black"
                                    },
                                }}
                                value={password || ""}
                                onChange={onChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setEnablePassword(!enablePassword)}
                                        >
                                            {enablePassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        {/* Note: Submit button field container */}
                        <Grid item container justify='center' style={{ marginTop: '2em' }}>
                            <Button
                                onClick={onSubmit}
                                fullWidth
                                variant='contained'
                                className={classes.Button}
                                disabled={(isButtonDisabled) ? (true) : (false)}
                            >
                                Submit
                            </Button>
                        </Grid>

                        {/* Note: Submit button field container */}
                        <Grid item container justify='center' style={{ marginTop: '2em' }}>
                            <Link to="/users-list" style={{ color: "#299371" }}>
                                See All Users
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default CreateUserScreen;