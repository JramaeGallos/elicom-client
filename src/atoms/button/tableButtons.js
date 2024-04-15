import React from 'react'
import {
    Button
} from "@mui/material";

const TableButtons = ({name, handleClickStatus, handleClickEnroll, handleClickViewMore, handleRemark, id, info, status, disabled}) =>{
    return(
        <Button 
                variant="contained" 
                type="submit"
                size='small'
                disabled={(name==="Enroll") ? !disabled : false}
                style={{
                    backgroundColor: "#28588C", 
                    borderRadius:"15px",
                    maxWidth: '120px', 
                    maxHeight: '30px', 
                    minWidth: '120px', 
                    minHeight: '30px', 
                    fontSize:11}}
                    onClick={()=>
                        (name==="Enroll") ? handleClickEnroll(id, status)
                        : 
                        (name==="View Status") ? handleClickStatus(info) 
                        : 
                        (name === "Add Remark") ? handleRemark(id) 
                        : 
                        handleClickViewMore(info)}
                >
                    {name}
        </Button>
    )
}

export default TableButtons