import React from 'react'
import {
    Typography,
    Box
} from "@mui/material";

const PageHeader = ({title}) => {
    return(
        <Box sx={{justifyContent: 'flex-start',  display: 'flex', flexDirection: 'row'}}>
           
            <Typography 
                fontFamily={"Segoe UI"} 
                fontSize={18} 
                fontWeight={"bold"}
                color={"#6D6262"} 
                style={{marginTop: 30, position: 'relative', marginLeft: "10%"}}
            >
                {title}
            </Typography>
          
        </Box>
    )
}

export default PageHeader