import React from 'react'
import { 
    Box, 
    Typography,
    Modal,
    Button,
} from "@mui/material";
import axios from "axios"

const ChangeStudTypeModal = ({handleClose, typeStatus, id}) =>{
    const type = (typeStatus) ? "regular" : "irregular"

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
        handleClose()
    }

    const submit =()=>{
        const url = "http://localhost:3001/update/change-type"

        axios.post(url, {id: id, isRegular: typeStatus})
            .then(function(response){
                window.location.reload(false);
                handleClose()
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
                        <Typography id="modal-modal-description" variant="body1" component="h1">
                            Are you sure you want to change type of user {id} to {type}?
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

export default ChangeStudTypeModal;
