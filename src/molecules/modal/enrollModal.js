import React from 'react'
import { 
    Box, 
    Typography,
    Modal,
    Button,
} from "@mui/material";
import axios from "axios"

const EnrollModal = ({handleCloseEnroll, id, status}) =>{
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
        handleCloseEnroll()
    }

    const submit =()=>{
        axios.post("http://localhost:3001/update/enroll", {id: id, isEnrolled: true})
        .then(function(response){
            console.log(response.data)
            window.location.reload(false);
            handleCloseEnroll()
        })
        .catch(function(error){
            console.log(error)
        })
    }

    return(
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                    {(status) ? 
                    <Typography id="modal-modal-description" variant="body1" component="h1">
                        Are you sure you want to enroll student {id}?
                    </Typography>
                    : 
                    <Typography id="modal-modal-description" variant="body1" component="h1">
                        Invalid Enrollment! 
                        Student {id} is not eligible for enrollment.
                    </Typography>
                    }
                </Box>
                <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"20px" }}>
                    {(status) ?
                        <>
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
                        </>
                        :
                        <Button 
                            style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                            variant="contained"
                            onClick={cancel}  >
                            Okay
                        </Button>
                    }
                </Box>            
            </Box>
        </Modal>
    )
}

export default EnrollModal;
