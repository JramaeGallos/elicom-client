import React from 'react'
import {
    Button
} from "@mui/material";

const AddUserButton = ({addUser}) =>{
    return(
        <Button 
                variant="contained" 
                type="submit"
                style = {{
                    width: 250, 
                    backgroundColor: "#28588C",  
                    borderRadius:"10px",
                }}
                onClick={addUser}
                >
                    Add User
        </Button>
    )
}

export default AddUserButton