import React from 'react'
import { 
    Box, 
    Typography,
    Modal,
    Button,
} from "@mui/material";
import axios from "axios"

const EnrollAllModal = ({handleCloseEnrollAll, selectedRows, data, validEnrollment}) =>{
    const selectedRowId =[]
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
        handleCloseEnrollAll()
    }

    const submit =()=>{
        for (const row of selectedRows){
            selectedRowId.push(data[row].id)
        }

        for (const id of selectedRowId){
            axios.post("http://localhost:3001/update/enroll", {id: id, isEnrolled: true})
            .then(function(response){
                console.log(response.data)
            })
            .catch(function(error){
                console.log(error)
            })
        }
        window.location.reload(false);
        handleCloseEnrollAll()
    }

    

    return(
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                        {(!validEnrollment) ?
                            ((selectedRows.length === 0) ? 
                                <Typography id="modal-modal-description" variant="body1" component="h1">
                                    The are no selected students.
                                </Typography>
                                :
                                <Typography id="modal-modal-description" variant="body1" component="h1">
                                    Invalid Enrollment! Selected student/s not eligible for enrollment.
                                </Typography>
                            )
                            :
                            <Typography id="modal-modal-description" variant="body1" component="h1">
                                Are you sure you want to enroll student/s?
                            </Typography>
                        }
                    </Box>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"20px" }}>
                        {(validEnrollment) ?
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

export default EnrollAllModal;
