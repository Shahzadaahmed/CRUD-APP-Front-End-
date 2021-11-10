// Note: FormDialog component...!

import React, { useState } from 'react';
import axios from 'axios';

// Note: Importing required API's of Material UI...!
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// Note: Component to slide the dialog box...!
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialog = (props) => {
    console.log(props);
    let { dialogStatus, close, updatingStatus } = props;

    // Note: Handeling states here...!
    const [name, setName] = useState((props.user != null) ? (props.user.name) : (""));
    const [email, setEmail] = useState((props.user != null) ? (props.user.email) : (""));
    const [password, setPassword] = useState((props.user != null) ? (props.user.password) : (""));

    // Note: Function to clear form...!
    const clearForm = () => {
        setName("");
        setEmail("");
        setPassword("");
    }

    // Note: Function to close dialog box...!
    const closeDialogBox = () => {
        close('Cancel');
        clearForm();
    }

    // Note: Function to update user data...!
    const updateUser = async () => {
        let userObj = {
            name,
            email,
            password
        }

        console.log(userObj);

        let api = "http://localhost:3001/user/update";

        try {
            let response = await axios.post(api, {
                email: props.user.email,
                updateUser: userObj
            });
            console.log(response);

            if (response.status === 200) {
                updatingStatus(response);
            }
        }

        catch (error) {
            console.log(error.response);
        }

        close('Cancel');
        clearForm();
    }

    return (
        <React.Fragment>
            <div>
                <Dialog open={dialogStatus} TransitionComponent={Transition}>

                    <DialogTitle>
                        Edit Form
                    </DialogTitle>

                    <DialogContent dividers>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

                        <TextField
                            margin="dense"
                            id="enail"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </DialogContent>

                    <DialogActions style={{ marginTop: 5 }}>
                        <Button
                            style={{ textTransform: "capitalize", fontWeight: "bold" }}
                            onClick={closeDialogBox}
                        >
                            Cancel
                        </Button>

                        <Button
                            style={{ textTransform: "capitalize", fontWeight: "bold" }}
                            onClick={updateUser}
                        >
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </React.Fragment>
    );
}

export default FormDialog;