import React from 'react'
import { 
    Box, 
    Typography,
    Modal,
    Button,
} from "@mui/material";

const ManagementStatusModal = ({type, handCloseEnrollModal, handleCloseTransactModal, value}) =>{
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

    const close =() =>{
        (type === "enrollment" ? 
            handCloseEnrollModal(!value)
            :
            handleCloseTransactModal(!value)
        )
    }

    const submit =()=>{
        (type === "enrollment" ? 
            handCloseEnrollModal(value)
            :
            handleCloseTransactModal(value)
        )
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
                            Are you sure you want to {(value) ? "open" : "close"} {type}?
                        </Typography>
                    </Box>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"20px" }}>
                        <Button 
                            style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                            variant="contained"
                            onClick={close}  >
                            Cancel
                        </Button>
                        <Button 
                            style={{borderRadius:"15px",backgroundColor: "#28588C" }} 
                            variant="contained"
                            onClick={submit} >
                            Proceed
                        </Button>
                    </Box>
            </Box>
        </Modal>
    )
}

export default ManagementStatusModal;
