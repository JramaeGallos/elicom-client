import React, {useEffect, useState} from 'react'
import { Navbar} from "../../organisms";
import {
    Typography,
    Container,
    Paper,
    Box,
    Grid
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LoadingComponent } from '../../atoms';
import axios from "axios"

const UserProfile = () =>{
    const { state } = useLocation();
    const userData = state.userData

    const [loading, setLoading] = useState(true)

    const [info, setInfo] = useState()
    
    const toTitleCase = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      };

    const formatSubjects =() =>{
        let subject = ""
        Array.from(info.subjects).forEach(char => {
            if(char !== "$"){
                subject = subject + char
            }else{
                subject = subject + " , "
            }
          });
        return subject.slice(0, -2)
    }

    useEffect(()=>{
        const getData = async () => {
            
            if (userData.userType === "student") {
                axios.post("http://localhost:3001/update/data",{id: userData.id})
                .then(function(response){
                    console.log(response.data)
                    setInfo(response.data)
                    setLoading(false)
                })  
                .catch(function(error){
                    console.log(error)
                })
            }
            else if(userData.userType === "clearanceSign"){
                axios.post("http://localhost:3001/getUser/clearanceSign-dataById",{id: userData.id})
                .then(function(response){
                    console.log(response.data)
                    setInfo(response.data)
                    setLoading(false)
                })  
                .catch(function(error){
                    console.log(error)
                })
            }
            else if(userData.userType === "instructor"){
                axios.post("http://localhost:3001/getUser/instructor-dataById",{id: userData.id})
                .then(function(response){
                    console.log(response.data)
                    setInfo(response.data)
                    setLoading(false)
                })  
                .catch(function(error){
                    console.log(error)
                })
            }else if(userData.userType === "registrar"){
                axios.post("http://localhost:3001/getUser/registrar-dataById",{id: userData.id})
                .then(function(response){
                    console.log(response.data)
                    setInfo(response.data)
                    setLoading(false)
                })  
                .catch(function(error){
                    console.log(error)
                })
            }
        }
        getData()
    }, [userData])

    return(
        <div>
            <Navbar/>
            { (loading) ?
                <LoadingComponent/>
                :
                <Box style={{boxShadow: 4,  paddingTop:20}} display="flex" justifyContent="center" alignItems="center">
                    <Container 
                        style={{width:"1200px", backgroundColor: "#E3ECF5", paddingTop:"10px", paddingBottom:"10px", boxShadow: 2}} 
                        sx={{ marginTop: "10px",}} component={Paper}
                    >
                    <Grid container spacing={2}>
                        <Grid  item xs={12} sm={6} md={2}>
                            <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                                <AccountCircleIcon style={{ fontSize: '6rem', color:"#6D6262" }}/>
                            </Box>
                        </Grid>
                
                        <Grid  item xs={12} sm={6} md={5}>
                            { (info) &&
                                <>
                                { (userData.userType=== "student") && //student account
                                    <>
                                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                                    <Typography id="modal-modal-description" variant="body1" component="h1" fontWeight="bold" fontStyle={"italic"}>
                                        Student Information
                                    </Typography>
                                    </Box>
                                    {(!info.isNewStudent) ? // not new student
                                    <>
                                        <Typography variant="subtitle1">
                                            <b>Name: </b> {toTitleCase(info.firstName) + " " + toTitleCase(info.middleName) + " " + toTitleCase(info.lastName)} <br/>
                                            <b>Age: </b> {info.age} <br/>
                                            <b>Sex: </b> {info.sex} <br/>
                                            <b>Birthdate: </b> {info.birthDate} <br/>
                                            <b>Place of Birth: </b> {toTitleCase(info.birthPlace)} <br/>
                                            <b>Civil Status: </b> {info.civilStatus} <br/>
                                            <b>Contact Number: </b> {info.contactNumber} <br/>
                                            <b>Email: </b> {info.email} <br/>
                                            <b>Temporary Address: </b> {toTitleCase(info.temporaryAddress)} <br/>
                                            <b>Permanent Address: </b> {toTitleCase(info.permanentAddress)} <br/>
                                        </Typography>

                                        <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"10px"}}> 
                                        <Typography id="modal-modal-description" variant="body1" component="h1" fontWeight="bold" fontStyle={"italic"}>
                                            Academic Information
                                        </Typography>
                                        </Box> 

                                        <Typography variant="subtitle1">
                                            <b>Student Number: </b> {info.studentNumber} <br/>
                                            <b>LRN: </b> {info.lrn} <br/>
                                            <b>Year Level: </b> {info.yearLevel} <br/>
                                            <b>Course: </b> {(info.specialization === "") ? (info.course) : (info.specialization)} <br/>
                                            <b>Subjects Enrolled: </b> {toTitleCase(formatSubjects())} <br/>
                                        </Typography>
                                    </>
                                    : // new student
                                    <> 
                                        <Typography variant="subtitle1">
                                            <b>Name: </b> {toTitleCase(info.firstName) + " " + toTitleCase(info.lastName)} <br/>
                                            <b>Email: </b> {info.email} <br/>
                                        </Typography>
                                    </>
                                    }
                                    </>
                                }
                                { (userData.userType === "instructor" || userData.userType === "registrar" || userData.userType === "clearanceSign") &&
                                    <>
                                        <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                                        <Typography id="modal-modal-description" variant="body1" component="h1" fontWeight="bold" fontStyle={"italic"}>
                                            User Information
                                        </Typography>
                                        </Box>

                                        <Typography variant="subtitle1">
                                            <b>Name: </b> {toTitleCase(info.firstName) + " " + toTitleCase(info.lastName)} <br/>
                                            <b>Email: </b> {info.email} <br/>
                                            <b>Employee Number: </b> {info.employeeNumber} <br/>
                                            {(userData.userType === "clearanceSign") && 
                                                <><b>Position: </b> {toTitleCase(info.position)} <br/></>
                                            }
                                        </Typography>

                                    </>
                                }
                                </>
                            }
                        </Grid>

                        <Grid  item xs={12} sm={6} md={4}>
                            { (info) && 
                                (userData.userType === "student" && !info.isNewStudent) && // not new student
                                <>
                                <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"10px"}}> 
                                    <Typography id="modal-modal-description" variant="body1" component="h1" fontWeight="bold" fontStyle={"italic"}>
                                        Guardian Information
                                    </Typography>
                                </Box> 

                                <Typography variant="subtitle1">
                                    <b>Guardian's Name: </b> {toTitleCase(info.guardianName)} <br/> 
                                    <b>Relationship: </b> {toTitleCase(info.guardianRelationship)} <br/>
                                    <b>Address: </b> {toTitleCase(info.guardianAddress)} <br/>
                                    <b>Contact Number: </b> {info.guardianContact} <br/>
                                    <b>Family Annual Income: </b> {info.annualIncome} <br/>    
                                
                                </Typography>

                                <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"10px"}}> 
                                    <Typography id="modal-modal-description" variant="body1" component="h1" fontWeight="bold" fontStyle={"italic"}>
                                        Parent Information
                                    </Typography>
                                </Box> 

                                <Typography variant="subtitle1">
                                    <b>Mother's Name: </b> {toTitleCase(info.motherName)} <br/>
                                    <b>Occupation: </b> {toTitleCase(info.motherOccupation)} <br/>
                                    <b>Father's Name: </b> {toTitleCase(info.fatherName)} <br/>
                                    <b>Occupation: </b> {toTitleCase(info.fatherOccupation)} <br/>
                                
                                </Typography>

                                </>
                            }
                        
                        </Grid>
                    </Grid>
                    </Container>
            </Box>
        }
        </div>
    )
}

export default UserProfile;