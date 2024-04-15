import React from 'react'
import { 
    Box, 
    Typography,
    Modal,
    Button,
} from "@mui/material";
import axios from "axios"

const AddToSectModal = ({handleCloseModal, valid, classToBeAdded, sectionId, yearLevel, type}) =>{
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

    const cancel =() =>{
        handleCloseModal(false)
    }

    const submit =()=>{
        if(type===1){
            const url = "https://elicom-server-5013ed31e994.herokuapp.com/enroll/add"
        
            for (const StudentAccountId of classToBeAdded){
                const data= {SectionListId: sectionId, StudentAccountId: StudentAccountId}
                    
                axios.post(url, data)
                .then(function(response){
                    console.log(response.data)
                })
                .catch(function(error){
                    console.log(error)
                })
            }
        }else if(type===2){
            const url = "https://elicom-server-5013ed31e994.herokuapp.com/instructor-section/add"
        
            for (const InstructorAccountId of classToBeAdded){
                const data= {SectionListId: sectionId, InstructorAccountId: InstructorAccountId}
                    
                axios.post(url, data)
                .then(function(response){
                    console.log(response.data)
                })
                .catch(function(error){
                    console.log(error)
                })
            }
        }

        handleCloseModal(true)
    }

    

    return(
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                        {(classToBeAdded.length === 0) ?
                                <Typography id="modal-modal-description" variant="body1" component="h1">
                                    The are no selected {type===1 ? "student/s" : "instructor/s"} to be added.
                                </Typography>
                            :
                            ((!valid) ?
                                <Typography id="modal-modal-description" variant="body1" component="h1">
                                    Invalid! {type===1 ? "Student/s" : "Instructor/s"}  already added in the section.
                                </Typography>
                            
                            :
                            <Typography id="modal-modal-description" variant="body1" component="h1">
                                Are you sure you want to add {type===1 ? "student/s" : "instructor/s"} ?
                            </Typography>
                            )
                        }
                    </Box>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"20px" }}>
                        {(valid) ?
                            (<><Button 
                            style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                            variant="contained"
                            onClick={cancel}  >
                            Cancel
                            </Button>
                            <Button 
                                style={{borderRadius:"15px",backgroundColor: "#28588C" }} 
                                variant="contained"
                                onClick={submit} >
                                Continue
                            </Button></>)
                            :
                            (<Button 
                                style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                                variant="contained"
                                onClick={cancel}  >
                                Okay
                                </Button>
                            )
                        }
                    </Box>
            </Box>
        </Modal>
    )
}

export default AddToSectModal;
