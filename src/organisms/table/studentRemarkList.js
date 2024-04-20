import React, {useState}from 'react'
import "./tableUserAcct.css"
import { 
    Table,
    TableBody,
    TableCell, tableCellClasses,
    styled, 
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box
} from "@mui/material";
import { Container } from 'react-bootstrap';

const StudentRemarkList = ({clearanceRemark, InstructorRemark, registrarRemark}) =>{
    const tableHeaders = ["Position", "Name", "Remarks"]

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#859BAA",
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 13,
        },
      }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));


    const toTitleCase = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      };
    

    return(
        <div>
            <Box style={{display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                }}> 
            <Container style={{boxShadow: 2, maxWidth: '85%',  marginTop: "10px", marginLeft: "20px", marginRight: "20px"}} 
            elevation={2} >
            <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {
                            (tableHeaders.map((header, index) => {
                                return <StyledTableCell key={index} align="center"> 
                                <Typography>
                                    <b>{header}</b>
                                </Typography>
                                </StyledTableCell>
                            }))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(InstructorRemark.length === 0 && clearanceRemark.length ===0 && registrarRemark.length === 0) &&  
                        <StyledTableRow > 
                            <StyledTableCell align="center" colSpan={3}>
                                <Typography color={"#6D6262"} > No Record </Typography>
                            </StyledTableCell>
                        </StyledTableRow>
                    }
                    {(InstructorRemark.length !== 0) &&
                        InstructorRemark.map((remark) => (
                            <StyledTableRow key={remark.dataValues.id}>
                            <StyledTableCell align='center'>
                                <Typography color={"#6D6262"} >{toTitleCase(remark.position)} </Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Typography color={"#6D6262"} >
                                    {toTitleCase(remark.firstName) + 
                                    " " + toTitleCase(remark.lastName)}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                               {(remark.dataValues.isClearedMT && remark.dataValues.isClearedFinal) ?
                                    <Typography style={{ color: 'green' }}>
                                     complete
                                    </Typography>
                                    :
                                    (remark.dataValues.remark === "") ?
                                    <Typography  color={"#6D6262"} >
                                        incomplete
                                    </Typography>
                                    :
                                    <Typography  color={"#6D6262"}>
                                     {remark.dataValues.remark.toLowerCase()}
                                    </Typography>
                               }
                            </StyledTableCell>
                            </StyledTableRow>
                        ))
                    }
                    {(clearanceRemark.length !==0) &&
                            clearanceRemark.map((remark) => (
                                <StyledTableRow key={remark.dataValues.id}>
                                <StyledTableCell align='center'>
                                    <Typography  color={"#6D6262"}>
                                        {toTitleCase(toTitleCase(remark.position))}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Typography  color={"#6D6262"}>
                                    {toTitleCase(remark.firstName) + " " + 
                                    toTitleCase(remark.lastName)}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                   {(remark.dataValues.isClearedRecord) ?
                                        <Typography color={"#6D6262"}  style={{ color: 'green' }}>
                                         complete
                                        </Typography>
                                        :
                                        (remark.dataValues.remark === "") ?
                                        <Typography color={"#6D6262"} >
                                         incomplete
                                        </Typography>
                                        :
                                        <Typography color={"#6D6262"} >
                                         {remark.dataValues.remark.toLowerCase()}
                                        </Typography>
                                   }
                                </StyledTableCell>
                                </StyledTableRow>
                            ))
                    }
                    {(registrarRemark.length !== 0) &&
                            registrarRemark.map((remark) => (
                                <StyledTableRow key={remark.dataValues.id}>
                                <StyledTableCell align='center'>
                                    <Typography  color={"#6D6262"}>
                                        {toTitleCase(remark.position)}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Typography  color={"#6D6262"}>
                                        {toTitleCase(remark.firstName) + " " +
                                        toTitleCase(remark.lastName)}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                   {(remark.dataValues.remark === "") ?
                                        <Typography color={"#6D6262"} >
                                            no remark
                                        </Typography>
                                        :
                                        <Typography color={"#6D6262"} >
                                         {remark.dataValues.remark.toLowerCase()}
                                        </Typography>
                                   }
                                </StyledTableCell>
                                </StyledTableRow>
                            ))
                    }
                </TableBody>
            </Table>
            </TableContainer>
            </Container>
            </Box>
        </div>

    )
}

export default StudentRemarkList;