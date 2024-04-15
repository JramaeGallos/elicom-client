import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "./login.css";
import axios from "axios"
import {
	TextField,
    Button,
    Grid, 
    Container,
    Box
    // Typography
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import {ForgotPassModal, SnackbarComp} from "../../organisms"
import { LoadingComponent } from '../../atoms';
var logo = require('../../assets/logo.png')



const Login =()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage]= useState("")
    const navigate = useNavigate();

    const [verified, setVerified] = useState(true)
    const [verificationToken, setVerificationToken] = useState("")
    const [userType, setUserType] = useState("")

    const [forgotPassModalState, setForgotPassModalState] = useState(false)
    const [forgotPassModalType, setForgotPassModalType] = useState()
    
    const [snackbarState, setSnackbarState] = useState(false)
    const [responseMessage, setResponseMessage] = useState("")
    const [responseState, setResponseState] = useState(false)

    const [loading, setLoading] = useState(false)
    const [emailForChange, setEmailForChange] = useState("")
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = {password: password, email: email}

        axios.post("http://localhost:3001/login", data)
            .then(function(response){
                if (response.data.error){
                    setErrorMessage(response.data.error)
                }else{
                    setErrorMessage("")
                    console.log(response.data)
                    setVerified(response.data.success.verified)
                    setUserType(response.data.success.userType)

                    if(response.data.success.verified){
                        console.log("Log in")
                        navigate('/dashboard')
                    }
                }
            })
            .catch(function(error){
                console.log(error)
            });
    };

    const verifyCode = () =>{
        const data = {email: email, verificationToken: verificationToken, userType: userType}

        axios.post("http://localhost:3001/email/verify", data)
            .then(function(response){
                if (response.data.error){
                    setErrorMessage(response.data.error)
                    
                }else{
                    setErrorMessage("")
                    console.log("Log in")
                    navigate('/dashboard')
                }
            })
            .catch(function(error){
                console.log(error)
            });
    }

    const forgotPass = () =>{
        setForgotPassModalType(1)
        setForgotPassModalState(true)
    }

    const handleClose1 = (status, emailToChange) =>{
        setForgotPassModalState(false)

        if (status){ //proceed password reset
            setLoading(true)
            setEmailForChange(emailToChange)

            axios.post("http://localhost:3001/email/forgot-pass", {email: emailToChange})
            .then(function(response){
                setSnackbarState(true)
                setLoading(false)
                if (response.data.error){
                    setResponseMessage(response.data.error)
                    setResponseState(false)
                }else{
                    setResponseState(true)
                    setResponseMessage("An email for the verification code was sent to your account")
                    setForgotPassModalType(2)
                    setForgotPassModalState(true)
                }
            })
            .catch(function(error){
                console.log(error)
            });
        }
    }

    const handleClose2 = (status, newPass, verification) =>{
        setForgotPassModalState(false)

        if(status){
            setLoading(true)

            axios.post("http://localhost:3001/email/reset-pass", {
                email: emailForChange,
                password: newPass,
                verificationToken: verification
            })
            .then(function(response){
                setSnackbarState(true)
                setLoading(false)

                if (response.data.error){
                    setResponseMessage(response.data.error)
                    setResponseState(false)
                }else{
                    setResponseState(true)
                    setResponseMessage("You have successfully changed your password.")
                }
            })
            .catch(function(error){
                console.log(error)
            });
        }
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarState(false);
      };
 
    return(
        <>
        { (loading) ?
            <LoadingComponent/>
            :
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#FAF9F6', // semi-transparent black background
                    minHeight: '100vh'
                }}
                >

                <Box>
                    <div className='img-logo'>
                        <img className="logo" src={logo} alt="logo" />
                    </div>
                </Box>
                <Container>
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={6}>

                    <form onSubmit={handleSubmit}>
                    <Box>
                    <TextField
                        required
                        type='email'
                        id="outlined-required"
                        label="Email"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        style = {{marginBottom: 10, marginTop: 10}}
                        fullWidth
                    />
                    </Box>
                    
                    <Box>
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        style = {{ marginBottom: 10}}
                        fullWidth
                    />
                    </Box>
                    
                    <Box>
                    <Button 
                        variant="contained" 
                        type="submit"
                        style = {{backgroundColor: "#075EBD"}}
                        fullWidth
                        >
                            Login
                    </Button>
                    </Box>
                </form>
 
                </Grid>
                </Grid>
                </Container>

                <Box>
                    <Button 
                        size='small'
                        variant='text'
                        onClick={forgotPass}
                        >
                        Forgot Password
                    </Button>
                </Box>
                    
                    { (!verified) &&
                        <Box style={{marginTop:40}} display="flex" justifyContent="center"> 
                            <TextField
                                required
                                label="Verification Code"
                                variant="standard"
                                size='small'
                                onChange={(event) => {
                                    setVerificationToken(event.target.value);
                                }}
                                style = {{width: 250}}
                            />

                            <Button 
                                size='small'
                                variant='text'
                                onClick={verifyCode}
                                >
                                    Submit 
                            </Button>
                        </Box>
                    }

                    <Box>
                    { (errorMessage !== "") &&
                        <p className="error"> <i>{ errorMessage } </i> </p> }
                    </Box>
                </Box>
        }
        
        {(forgotPassModalState) &&
            <ForgotPassModal 
                handleClose1={handleClose1} 
                handleClose2={handleClose2}
                type={forgotPassModalType} 
            />
        }
        {(snackbarState) &&
                <SnackbarComp 
                handleCloseResponse={handleCloseSnackBar} 
                snackbarState={snackbarState} 
                responseState={responseState}
                responseMessage={responseMessage}
                />
            }
        </>
    )
}

export default Login

