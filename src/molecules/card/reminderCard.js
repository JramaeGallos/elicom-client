import React from 'react'
import {
    Typography,
    Container,
    Paper,
    Box
} from "@mui/material";

const ReminderCard = ({title}) =>{
    return(
        <Box style={{boxShadow: 4 }} display="flex" justifyContent="center" alignItems="center">
            <Container 
                style={{width:"1200px", backgroundColor: "#E3ECF5", paddingTop:"10px", paddingBottom:"10px", boxShadow: 2}} 
                sx={{ marginTop: "10px", marginLeft: "20px", marginRight: "20px"}} component={Paper}
            >
                <Typography fontFamily={"Segoe UI"} fontSize={16}  color={"#6D6262"}   >
                    {title}
                </Typography>

            </Container>
        </Box>
    )
}

export default ReminderCard