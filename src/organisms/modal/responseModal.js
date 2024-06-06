// src/Modal.js
import React from 'react';
import './responseModal.css';
import { 
    Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';

const ResponseModal = ({ show, handleClose, message, csvUserCnt }) => {
    const success = csvUserCnt - message.length
   
    return (
        <div className={`modal ${show ? 'display-block' : 'display-none'}`}>
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>

                {(csvUserCnt===0) ?
                    <Typography id="modal-modal-description" variant="body1" component="h1" style={{ fontWeight: 'bold' }} >
                        <DangerousOutlinedIcon sx={{color:"red"}}/> The file has no stored user information.
                    </Typography>
                    :
                    (message.length === csvUserCnt) ?
                    <Typography id="modal-modal-description" variant="body1" component="h1" style={{ fontWeight: 'bold' }} >
                        <DangerousOutlinedIcon sx={{color:"red"}}/> No user was added.
                    </Typography>
                    : (message.length===0) ?
                    <Typography id="modal-modal-description" variant="body1" component="h1" style={{ fontWeight: 'bold' }} >
                        <CheckCircleOutlineIcon sx={{color:"green"}}/> All users were successfully added.
                    </Typography>
                    :
                    <Typography id="modal-modal-description" variant="body1" component="h1" style={{ fontWeight: 'bold' }} >
                        <CheckCircleOutlineIcon sx={{color:"green"}}/>  {success} user/s were successfully added.
                    </Typography>
                }
              
                {message.map((item, index) => (
                    <Typography key={index} id="modal-modal-description" variant="body1" component="h1" style={{ fontStyle: 'italic' }} >
                     {item}
                    </Typography>
                ))}
               
            </div>
        </div>
    );
};

export default ResponseModal;
