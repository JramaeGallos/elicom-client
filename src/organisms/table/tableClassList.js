import React, {useState} from 'react'
import { 
    Typography,
    TableContainer,
    Table,
    TableRow,
    TableHead, 
    TableBody,
    TableCell, tableCellClasses,
    Paper,
    styled,
    Button,
    IconButton
} from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {ViewMoreModal, RemoveFromSectionModal} from "../../molecules"
import { TableButtons } from '../../atoms';

const TableClassList =({
        classList,
        instructorList, 
        type, 
        yearLevel, 
        sectionCode, 
        sectionId, 
        handleButtonClick, 
        activeButton,
        isOpenTransaction
    })=>{
    const [viewMoreModal, setViewMoreModal] = useState(false);
    const [removeUserModal, setRemoveUserModal] = useState(false);

    const [userInfo, setUserInfo] = useState({})
    const [userId, setUserId] = useState()

    //functions for styling the table
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
    
    //function for removing the student from the section
    const handleRemove=(userId)=>{
        setRemoveUserModal(true)
        setUserId(userId)
    }

    const handleCloseRemove=()=>{
        setRemoveUserModal(false)
    }
    
    //function for view more modal
    const handleClickViewMore = (info)=>{
        setViewMoreModal(true)
        setUserInfo(info)
    }

    const handleCloseViewMore = () => {
        setViewMoreModal(false)
    }

    const toTitleCase = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      };


    return(
        <div>
        <TableContainer elevation={2} style={{width:"1200px", marginTop: "20px"}} component={Paper}>
        <Typography 
            fontFamily={"Segoe UI"} 
            fontSize={16} 
            fontWeight={"bold"}
            color={"#6D6262"} 
            style={{marginLeft:10, marginTop:10, marginBottom:10}}
        >
            {yearLevel.toUpperCase()}-{sectionCode}
        </Typography>
            <Button
                variant={activeButton === 1 ? 'contained' : 'text'}
                onClick={() => handleButtonClick(1)}
                sx={{
                    borderTopLeftRadius: '20px', 
                    borderTopRightRadius: '20px', 
                    borderBottomLeftRadius: '0px', 
                    borderBottomRightRadius: '0px',
                    backgroundColor:  activeButton === 1 && "#859BAA",
                    color: activeButton !==1 && "#6D6262",
                    '&:hover': {
                        backgroundColor: "#859BAA",
                        color: "white"
                    },
                    width: 220, 
                }}
                disableElevation
                >
                    Student 
            </Button>
            <Button
                variant={activeButton === 2 ? 'contained' : 'text'}
                onClick={() => handleButtonClick(2)}
                sx={{
                    borderTopLeftRadius: '20px', 
                    borderTopRightRadius: '20px', 
                    borderBottomLeftRadius: '0px', 
                    borderBottomRightRadius: '0px',
                    backgroundColor:  activeButton === 2 && "#859BAA",
                    color: activeButton !==2 && "#6D6262",
                    '&:hover': {
                        backgroundColor: "#859BAA",
                        color: "white"
                    },
                    width: 220
                }}
                disableElevation
            >
                Instructor
            </Button>
            <Table size="small">
                <TableHead>
                    <TableRow >
                        <StyledTableCell align="center"> </StyledTableCell>
                        <StyledTableCell align="center"> </StyledTableCell>
                        <StyledTableCell align="center"> {type === 1 ? "Student Number": "Employee Number"}</StyledTableCell>
                        {(type===1) &&
                            <StyledTableCell align="center"> Status </StyledTableCell>    
                        }
                        <StyledTableCell align="center"> Name </StyledTableCell>
                        <StyledTableCell align="center"> User Information</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { (type===1) ? 
                        ((classList.length !== 0) ?
                            (classList).map((student, index) => (
                                <StyledTableRow key={index} align="center"> 
                                    <StyledTableCell align="left" style={{width:"10px"}}> 
                                        {(isOpenTransaction) ?
                                            <> </>
                                            :
                                            <IconButton onClick={()=>{handleRemove(student.id)}}> 
                                                <RemoveCircleIcon></RemoveCircleIcon>
                                            </IconButton>
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align="left"> {index+1} </StyledTableCell>
                                    <StyledTableCell align="center"> {student.studentNumber} </StyledTableCell>
                                    <StyledTableCell align="center"> 
                                        {(student.isRegular) ?
                                            "Regular"
                                            :
                                            "Irregular"
                                        } 
                                    </StyledTableCell>
                                    <StyledTableCell align='center'> {toTitleCase(student.firstName)
                                         + " " + toTitleCase(student.lastName)} </StyledTableCell>
                                    <StyledTableCell align='center'>  
                                        <TableButtons handleClickViewMore={handleClickViewMore} name={"View More"} info={student}/> 
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                            :
                            (<StyledTableRow > 
                                <StyledTableCell align="center" colSpan={6}>No Class List</StyledTableCell>
                            </StyledTableRow>)
                        )
                    :
                        ((instructorList.length !== 0) ?
                        (instructorList).map((instructor, index) => (
                            <StyledTableRow key={index} align="center"> 
                                <StyledTableCell align="left" style={{width:"10px"}}> 
                                    {(isOpenTransaction) ?
                                        <> </>
                                        :
                                        <IconButton onClick={()=>{handleRemove(instructor.id)}}> 
                                            <RemoveCircleIcon></RemoveCircleIcon>
                                        </IconButton>
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="left"> {index+1} </StyledTableCell>
                                <StyledTableCell align="center"> {instructor.employeeNumber} </StyledTableCell>
                                <StyledTableCell align='center'> {instructor.firstName + " " + instructor.lastName} </StyledTableCell>
                                <StyledTableCell align='center'>  
                                    <TableButtons handleClickViewMore={handleClickViewMore} name={"View More"} info={instructor}/> 
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                        :
                        (<StyledTableRow > 
                            <StyledTableCell align="center" colSpan={6}>No Class List</StyledTableCell>
                        </StyledTableRow>)
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
        {(viewMoreModal) &&
            <ViewMoreModal
                handleCloseViewMore={handleCloseViewMore}
                info = {userInfo}
            />
        }
        {(removeUserModal) &&
            <RemoveFromSectionModal
             handleCloseRemove={handleCloseRemove}
             userId={userId}
             sectionId={sectionId}
             type={type}
            />

        }
        </div>
    )
}

export default TableClassList;