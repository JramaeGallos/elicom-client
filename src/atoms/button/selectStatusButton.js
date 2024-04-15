import React from 'react'
import {
    Select,
    MenuItem
} from "@mui/material";

const SelectStatusButton = ({type, handleTransaction, handleEnrollment, isOpenTransaction, isOpenEnrollment}) =>{
    const status = (type==="enrollment") ? isOpenEnrollment : isOpenTransaction
    return(
        <Select
            value={status}
            onChange={(type==="enrollment") ?  handleEnrollment : handleTransaction }
            size='small'
            style={{
                borderRadius:"10px",
                width: 250, 
                height: 35,
                backgroundColor: (status) ? "#50B154" : "#CF5858", 
                color: 'white',
                marginRight: 5
            }}
            >
            <MenuItem value={status}>
            </MenuItem>
            <MenuItem value={true} color='white'>OPEN {type.toUpperCase()}</MenuItem>
            <MenuItem value={false}> CLOSE {type.toUpperCase()}</MenuItem>
        </Select>
    )
}

export default SelectStatusButton