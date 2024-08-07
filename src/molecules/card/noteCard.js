import React from 'react'
import {
    Typography,
    Container,
    Paper,
    Box
} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NoteCard = ({title}) =>{
    return(
        <Box style={{boxShadow: 4,  position: 'absolute', top: 50, right: 5,}} display="flex" justifyContent="center" alignItems="center" >
            <Container 
                style={{width:"300px", backgroundColor:"#F56464", paddingTop:"10px", paddingBottom:"10px", boxShadow: 2}} 
                sx={{ marginTop: "20px",}} component={Paper}
            >
                
                <Typography fontFamily={"Segoe UI"} fontSize={16}  fontWeight={"bold"}  >
                    <ErrorOutlineIcon/>
                    {"   "} 
                    {title}
                </Typography>

            </Container>
        </Box>
    )
}

export default NoteCard