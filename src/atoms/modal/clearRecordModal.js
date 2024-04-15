import React from 'react'
import { 
    Box, 
    Typography,
    Modal,
    Button,
} from "@mui/material";


const ClearRecordModal =({handleCloseClearModal, title})=>{

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'background.paper',
        borderRadius: '8px', 
        boxShadow: 24,
        p: 4,
      };

    const cancel =() =>{
        handleCloseClearModal(false)
    }

    const submit =() =>{
        handleCloseClearModal(true, title)
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
                            Are you sure you want to clear {title} records of student?
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

export default ClearRecordModal;