import React from 'react'
import {
    Typography,
    Container,
    Paper,
    Box
} from "@mui/material";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const OpenStatusCard = ({title}) =>{
    return(
        <Box style={{boxShadow: 4 }} display="flex" justifyContent="center" alignItems="center">
            <Container 
                style={{width:"1200px", backgroundColor:"#BBE6C2", paddingTop:"10px", paddingBottom:"10px", boxShadow: 2}} 
                sx={{ marginTop: "20px",}} component={Paper}
            >
                
                <Typography fontFamily={"Segoe UI"} fontSize={16}  fontWeight={"bold"} color={"#6D6262"}  >
                    <PriorityHighIcon/>
                    {" "}
                    {title}
                </Typography>

            </Container>
        </Box>
    )
}

export default OpenStatusCard