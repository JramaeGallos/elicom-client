import React, {useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const AddUserModal =({OnSubmitData, userType}) => {
    const [open, setOpen] = useState(true);
    const [positionVal, setPositionVal] = useState("");
    // const [password, setPassword] = useState("")

    const handleClose = () => {
        setOpen(false);
        OnSubmitData({cancel:""})
    };

    const handlePosition = (event) => {
        setPositionVal(event.target.value)
    }

    const generatePassword = () => {
        let charset = "";
        let newPassword = "";
        const passwordLength=8;

        charset += "!@#$%^&*()";
        charset += "0123456789";
        charset += "abcdefghijklmnopqrstuvwxyz";
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < passwordLength; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        return newPassword
    };

  

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const password = generatePassword()
                    // const password = "password123"
                    setOpen(false)
                    console.log(userType)
                    OnSubmitData({success:formJson, password: password} )
                },
                }}
            >
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add user account details.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="firstName"
                        label="First Name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        variant="standard"
                    />
                    { (userType === "student") ?
                    <TextField
                        autoFocus
                        required
                        type='number'
                        margin="dense"
                        name= "studentNumber"
                        label="Student Number"
                        fullWidth
                        variant="standard"
                    />
                    :
                    <TextField
                        autoFocus
                        required
                        type='number'
                        margin="dense"
                        name= "employeeNumber"
                        label="Employee Number"
                        fullWidth
                        variant="standard"
                    />
                    }

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    { (userType === "clearanceSign") &&
                            <Select
                            required
                            fullWidth
                            name= "position"
                            value={positionVal}
                            onChange={handlePosition}
                            displayEmpty
                            renderValue={positionVal !== "" ? undefined : () => "Position"}
                            style={{marginTop: "5px"}}
                            >
                            <MenuItem value={positionVal}>
                            </MenuItem>
                            <MenuItem value={"librarian"}>Librarian</MenuItem>
                            <MenuItem value={"nurse"}>College Nurse</MenuItem>
                            <MenuItem value={"guidance"}>Guidance Councilor</MenuItem>
                            <MenuItem value={"records"}>Record - FIC </MenuItem>
                            </Select>
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" style = {{borderRadius:"15px"}}  onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" style = {{borderRadius:"15px"}} type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AddUserModal
