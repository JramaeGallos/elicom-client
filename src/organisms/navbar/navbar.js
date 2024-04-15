import React ,{useEffect, useState} from "react";
import "./navbar.css";
import {
    AppBar, 
    IconButton, 
    Toolbar, 
    Typography, 
    Box, 
    Button,
    Tooltip
} from '@mui/material'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Sidebar from '../sidebar/sidebar'
import {getUserAuth, userLogout} from '../../auth'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import {LogoutModal} from "../../molecules"
var logo = require('../../assets/logo.png')


const Navbar = ({getStatus}) => {
    const navigate = useNavigate();
    const [enrollmentStatus, setEnrollmentStatus] = useState(false)
    const [transactionStatus, setTransactionStatus] = useState(false)

    const [userData, setUserData]= useState({})

    const [outModal, setLogoutModal] = useState(false)

    // get authenticated user data from the server
    useEffect(()=>{
        const getData = async () => {
            const result = await getUserAuth()

            if (result) {
                setUserData(result)
            }else{
                navigate('/')
            }
        }
        getData()

    }, [navigate, setUserData])

    useEffect(()=>{
        const fetchStatus=async()=>{
            await axios.get("http://localhost:3001/management/get-status")
            .then(function(response){
            setEnrollmentStatus(response.data.isOpenEnrollment)
            setTransactionStatus(response.data.isOpenTransaction)
            getStatus(response.data.isOpenEnrollment, response.data.isOpenTransaction)
            })
            .catch(function(error){
                console.log(error)
            });
        }
        fetchStatus()
    },[getStatus])

    const logout = ()=>{
        setLogoutModal(true)
    }

    const profile=()=>{
        navigate('/profile',
        {
            state:{
                userData: userData
            }
        }
        )
    }

    const handleCloseLogout = async(willLogout) =>{
        if(willLogout){  // remove the jwt from cookie to log out the account
            const result = await userLogout()
            if(result) navigate('/')
        }
        setLogoutModal(false)
    }

    const username= userData.firstName
    const userType= userData.userType

    const [state, setState] = React.useState({
        left: false,
      });
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    return(
        <div> 
            <AppBar position= 'static'> 
                <Toolbar className="navbar-container">
                    <IconButton 
                        size = 'large' 
                        edge='start' 
                        color='inherit' 
                        aria-label="viewButton"
                        onClick={toggleDrawer('left', true)}
                    > 
                        <ViewHeadlineIcon/>
                    </IconButton>
                    <Button className="logo-button" onClick={()=>{navigate('/dashboard')}}>
                        <img className="logo" src={logo} alt="logo" />
                    </Button>
                    <Typography 
                        sx={{ flexGrow:1}} 
                        fontFamily={"Segoe UI"} 
                        fontSize={22}  
                        variant='h6' 
                        align="left"> 
                        Libon Community College
                    </Typography>
                    <Box>
                        <Tooltip title="Profile">
                            <Button color="inherit" onClick={profile}> <AccountCircleIcon /> {username} </Button>
                        </Tooltip>
                        <Tooltip title="Logout Account">
                            <IconButton onClick={logout} color="inherit"> <MoreVertIcon/> </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
            <Sidebar 
                state={state} 
                setState={setState} 
                toggleDrawer={toggleDrawer} 
                userType={userType} 
                enrollmentStatus={enrollmentStatus}
                transactionStatus={transactionStatus}
                > 
            </Sidebar>
            {(outModal) &&
                <LogoutModal handleCloseLogout={handleCloseLogout}/>
            }
        </div>
    );
};

export default Navbar;