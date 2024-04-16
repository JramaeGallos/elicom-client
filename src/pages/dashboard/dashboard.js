import React, {useEffect, useState} from "react";
import { Navbar} from "../../organisms";
import {Container, 
        Paper, 
        Box,
        Typography
    } 
    from  "@mui/material";
import {getUserAuth} from '../../auth'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import axios from "axios"
import { LoadingComponent } from "../../atoms";

const DashboardPage = () => {

    const [userData, setUserData] = useState()
    const [enrollmentStatus, setEnrollmentStatus] = useState(undefined)
    const [transactionStatus, setTransactionStatus] = useState()


    useEffect(()=>{
        const getData = async () => {
            const result = await getUserAuth()
            
            if (result) {
               console.log(result) 
               setUserData(result)
            }
        }
        getData()

        const fetchStatus=async()=>{
            await axios.get("https://elicom-server-5013ed31e994.herokuapp.com/management/get-status")
            .then(function(response){
                setEnrollmentStatus(response.data.isOpenEnrollment)
                setTransactionStatus(response.data.isOpenTransaction)
            })
            .catch(function(error){
                console.log(error)
            });
        }
        fetchStatus()
    }, [])

  
    

    return(
        <div > 
            <Navbar />
            <Box style={{boxShadow: 4, paddingTop:20}} display="flex" justifyContent="center" alignItems="center">
                <Container 
                    style={{width:"1200px", backgroundColor: "#E3ECF5", paddingTop:"10px", paddingBottom:"10px", boxShadow: 2}} 
                    sx={{ marginTop: "10px",}} component={Paper}
                >
                    { (userData) ?
                        <>
                       <Typography  fontWeight="bold" color={"#6D6262"}  fontSize={18}  >
                            Welcome, {userData.firstName.toUpperCase()}!
                        </Typography> 
                        <br></br>
                        <Typography  color={"#6D6262"}   >
                            Welcome to the Pre-Registration Management System of LICOM!  
                            eLICOM is a web application designed to improve your registration experience with just a click through
                            virtual transactions. This application is currently in ALPHA phase.
                        </Typography> 
                        </>
                        :
                        <LoadingComponent/>
                    }
                </Container>
            </Box>
            <Box style={{boxShadow: 4, paddingTop:10}} display="flex" justifyContent="center" alignItems="center">
                <Container 
                    style={{width:"1200px", backgroundColor: "#E3ECF5", paddingTop:"10px", paddingBottom:"10px", boxShadow: 2}} 
                    sx={{ marginTop: "10px",}} component={Paper}
                >
                    <Typography color={"#6D6262"}  fontSize={16}  >
                            ANNOUNCEMENT!
                    </Typography> 
                    <br></br>
                    { (enrollmentStatus !== undefined && transactionStatus!==undefined) ?
                        <>
                        <Typography  color={"#6D6262"}   >
                            { (enrollmentStatus) ?
                                <>
                                <RadioButtonUncheckedIcon  style={{ fontSize: "small"}}/> {" "}
                                <>Enrollment is open.</>
                                </>
                                :
                                <>
                                <RadioButtonUncheckedIcon style={{ fontSize: "small"}}/> {" "}
                                <>Enrollment is close.</>
                                </>
                            }
                        </Typography> 

                        <Typography  color={"#6D6262"}   >
                            { (transactionStatus) ?
                                <>
                                <RadioButtonUncheckedIcon  style={{ fontSize: "small"}}/> {" "}
                                <>Record Transaction is open.</>
                                </>
                                :
                                <>
                                <RadioButtonUncheckedIcon style={{ fontSize: "small"}}/> {" "}
                                <>Record Transaction is close.</>
                                </>
                            }
                        </Typography> 
                        </>
                        :
                        <LoadingComponent/>
                    }
                </Container>
            </Box>
        </div>
    )

    
    }

export default DashboardPage;
