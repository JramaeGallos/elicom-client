import React ,{useEffect, useState} from "react";
import "./navbar.css";
import {
    AppBar, 
    IconButton, 
    Toolbar, 
    Typography, 
    Box, 
    Button,
    Tooltip,
    ThemeProvider
} from '@mui/material'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Sidebar from '../sidebar/sidebar'
import {getAccessToken, userLogout, getUserAuth} from '../../auth'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import {LogoutModal} from "../../molecules"
import { createTheme } from '@mui/material/styles';

var logo = require('../../assets/logo.png')



const Navbar = ({getStatus}) => {
    const navigate = useNavigate();
    const [enrollmentStatus, setEnrollmentStatus] = useState(false)
    const [transactionStatus, setTransactionStatus] = useState(false)

    const [userData, setUserData]= useState({})

    const [outModal, setLogoutModal] = useState(false)

    const [username, setUsername] = useState()
    const [userType, setUsertype] = useState()


    useEffect(()=>{
        const getData = async () => {
            const accesstoken = await getAccessToken()

            if (accesstoken) {
                const data = await getUserAuth(accesstoken)
                setUserData(data)
                setUsername(data.firstName)
                setUsertype(data.userType)
            }else{
                navigate('/')
            }
        }
        getData()
    }, [navigate, setUserData])

    useEffect(()=>{
        const fetchStatus=async()=>{
            await axios.get("https://elicom-server-5013ed31e994.herokuapp.com/management/get-status")
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


    const [state, setState] = React.useState({
        left: false,
      });
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    }; 

    
    // const theme = createTheme({
    //     typography: {
    //       h6: {
    //         fontSize: 22, // Default font size
    //         '@media (max-width:600px)': {
    //           fontSize: 18, // Adjust font size for screens smaller than 600px
    //         },
    //         '@media (max-width:400px)': {
    //           fontSize: 14, // Adjust font size for screens smaller than 400px
    //         },
    //       },
    //     },
    //   });

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

                    <Box display="flex" flexDirection="row" alignItems="center" sx={{ flexGrow:1}} >
                        <Button className="logo-button" onClick={()=>{navigate('/dashboard')}}>
                            <img className="logo" src={logo} alt="logo" />
                        </Button>
                        {/* <ThemeProvider theme={theme}> */}
                            <Typography  
                                fontFamily={"Segoe UI"} 
                                fontSize={22}  
                                // variantMapping={variantMapping}
                                variant='h6' 
                                align="left"> 
                                eLICOM
                            </Typography>
                        {/* </ThemeProvider> */}
                    </Box>

                    <Box display="flex" flexDirection="row" alignItems="center">
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