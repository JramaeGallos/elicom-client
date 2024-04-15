import React, { useState } from 'react'
import { 
    Box, 
    Typography,
    Modal,
    Button,
    TextField
} from "@mui/material";

const ForgotPassModal = ({handleClose1, handleClose2, type}) =>{
    const [email, setEmail] = useState("")

    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [verificationCode, setVerificationCode] = useState("")

    const [errorConfirm, setErrorConfirm] = useState(false) 
    const [errorPass, setErrorPass] = useState(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        borderRadius: '8px', 
        boxShadow: 24,
        p: 4,
      };


    const handleSubmit =(e)=>{
        e.preventDefault()
        handleClose1(true, email)
    }

    const handleChangePass = (e) =>{
        e.preventDefault()
        handleClose2(true, confirmPass, verificationCode)
    }

    const validatePassword = (e) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        
        if(!regex.test(e.target.value)){
            setErrorPass(true)
        }else{
            setErrorPass(false)
            setNewPass(e.target.value)
        }
    };

    const validateConfirm = (e) =>{
        if(newPass !== e.target.value){
            setErrorConfirm(true)
        }else{
            setErrorConfirm(false)
            setConfirmPass(e.target.value)
        }
    }

    return(
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            { (type ===1) ?
                <Box sx={style}>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                        <Typography id="modal-modal-description" variant="body1" component="h1">
                            To reset your password, a verification code will be sent to your email account.
                            Enter your email account and click proceed to continue.
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}>
                        <TextField
                                required
                                label="Email"
                                type='email'
                                variant="standard"
                                size='small'
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                fullWidth
                            />
                    </Box>

                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"20px" }}>
                        <Button 
                            style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                            variant="contained"
                            type="submit"  >
                            Proceed
                        </Button>
                        <Button 
                            style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                            variant="contained"
                            onClick={()=>handleClose1(false)}  >
                            Cancel
                        </Button>
                    </Box>
                    </form>
            </Box>
            :(type ===2) &&
                                
                <Box sx={style}>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                        <Typography id="modal-modal-description" variant="body1" component="h1">
                            Enter your new password and verification code. Then click proceed to 
                            reset your password.
                        </Typography>
                    </Box>

                    <form onSubmit={handleChangePass}>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", flexDirection:"column"}}>
                        <TextField
                            required
                            label="New Password"
                            type="password"
                            onChange={validatePassword}
                            error={errorPass}
                            helperText={errorPass ? "Password should contain 8 characters with atleast one upper case, one lower case, and a number" : ""}
                            style = {{width: 350, marginBottom: 10, marginTop: 10}}
                        />
                   
                        <TextField
                            required
                            label="Confirm Password"
                            type="password"
                            onChange={validateConfirm}
                            error={errorConfirm}
                            helperText={errorConfirm ? "Passwords do not match" : ""}
                            style = {{width: 350, marginBottom: 10}}
                        />
                   
                        <TextField
                            required
                            label="Verification Code"
                            onChange={(event) => {
                                setVerificationCode(event.target.value);
                            }}
                            style = {{width: 350, marginBottom: 10, marginTop: 10}}
                        />
                    </Box>

                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"20px" }}>
                        <Button 
                            style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                            variant="contained"
                            type="submit" 
                             >
                            Proceed
                        </Button>
                        <Button 
                            style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                            variant="contained"
                            onClick={()=>handleClose2(false)}  >
                            Cancel
                        </Button>
                    </Box>
                    </form>
                    
                </Box>

            }
            
        </Modal>
    )
}

export default ForgotPassModal;
