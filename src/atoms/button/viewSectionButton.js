import React from 'react'
import {
    Button
} from "@mui/material";

const ViewSectionButton = ({handleClickButton, index}) =>{
    return(
        <Button 
            variant="contained" 
            type="submit"
            size='small'
            style={{
                backgroundColor: "#28588C", 
                borderRadius:"15px",
                maxWidth: '120px', 
                maxHeight: '30px', 
                minWidth: '120px', 
                minHeight: '30px', 
                fontSize:11}}
                onClick={()=>handleClickButton(index)}
            >
                View Section
        </Button>
    )
}

export default ViewSectionButton