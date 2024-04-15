import React, {useState} from 'react'
import { 
    Box, 
    Modal,
    Button,
    TextField
} from "@mui/material";

const AddInstRemarkModal = ({handleCloseAddRemark, id, submitRemark}) =>{
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

    const [textValue, setTextValue] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 50) {
          setTextValue(inputValue);
        }
    };

    const close =() =>{
        handleCloseAddRemark()
    }

    const submit = () =>{
        handleCloseAddRemark()
        submitRemark(id, textValue)
    }

    return(
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            value={textValue}
                            onChange={handleChange}
                            label="Write Remark"
                            helperText={`${textValue.length}/50`}
                            variant="outlined"
                        />
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
                            Submit
                        </Button>
                    </Box>
            </Box>
        </Modal>
    )
}

export default AddInstRemarkModal;
