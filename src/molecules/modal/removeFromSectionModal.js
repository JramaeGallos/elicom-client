import React from 'react'
import { 
    Box, 
    Typography,
    Modal,
    Button,
} from "@mui/material";
import axios from "axios"

const RemoveFromSectionModal = ({handleCloseRemove, userId, sectionId, type}) =>{
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
        handleCloseRemove()
    }

    const submit =()=>{
        if(type===1){ //student
            const url = "http://localhost:3001/enroll/remove"

            const data = {SectionListId: sectionId, StudentAccountId: userId}

            axios.post(url, data)
                .then(function(response){
                    console.log(response.data)
                    window.location.reload(false);
                })
                .catch(function(error){
                    console.log(error)
                })
        }else if(type===2){ //instructor
            const url = "http://localhost:3001/instructor-section/remove"

            const data = {SectionListId: sectionId, InstructorAccountId: userId}

            axios.post(url, data)
                .then(function(response){
                    console.log(response.data)
                    window.location.reload(false);
                })
                .catch(function(error){
                    console.log(error)
                })
        }
    
        handleCloseRemove()
    }

    return(
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                        <Typography id="modal-modal-description" variant="body1" component="h1">
                            Are you sure you want to remove {type===1 ? "student": "instructor"} from the section?
                        </Typography>
                    </Box>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"20px" }}>
                        <Button 
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
                        </Button>
                    </Box>
            </Box>
        </Modal>
    )
}

export default RemoveFromSectionModal;
