import React from 'react'
import { 
    Box, 
    Typography,
    Modal,
    Button,
    Grid,
    Container
} from "@mui/material";

const ViewMoreModal = ({handleCloseViewMore, info}) =>{
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: (info.employeeNumber) ? 500 : 800,
        bgcolor: 'background.paper',
        borderRadius: '8px', 
        boxShadow: 24,
        p: 4,
      };

    const close =() =>{
        handleCloseViewMore()
    }

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

    console.log(info)

    return(
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {(info.employeeNumber) ?
                    <>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"10px"}}> 
                        <Typography id="modal-modal-description" variant="body1" component="h1" fontWeight="bold" fontStyle={"italic"}>
                            Instructor Information
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1">
                        <b>Name: </b> {toTitleCase(info.firstName) + " " + toTitleCase(info.lastName)} <br/>
                        <b>Employee Number: </b> {info.employeeNumber} <br/>
                        <b>Email: </b> {info.email} <br/>
                    </Typography>
                    </>
                    :
            
                    <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Container maxWidth="sm">
                            <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                                <Typography id="modal-modal-description" variant="body1" component="h1" fontWeight="bold" fontStyle={"italic"}>
                                    Student Information
                                </Typography>
                            </Box>
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
                                    Parent Information
                                </Typography>
                            </Box> 

                        <Typography variant="subtitle1">
                            <b>Mother's Name: </b> {toTitleCase(info.motherName)} <br/>
                            <b>Occupation: </b> {toTitleCase(info.motherOccupation)} <br/>
                            <b>Father's Name: </b> {toTitleCase(info.fatherName)} <br/>
                            <b>Occupation: </b> {toTitleCase(info.fatherOccupation)} <br/>
                        
                        </Typography>

                        </Container>
                    </Grid>
                    <Grid item xs={6}>
                        <Container maxWidth="sm">
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
                        </Container>
                    </Grid>
                    </Grid> 
                }
                    
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"20px" }}>
                        <Button 
                            style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                            variant="contained"
                            onClick={close}  >
                            Close
                        </Button>
                    </Box>
            </Box>
        </Modal>
    )
}

export default ViewMoreModal;
