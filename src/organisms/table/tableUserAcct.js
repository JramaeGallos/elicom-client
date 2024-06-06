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
    IconButton,
    TextField,
    InputAdornment,
    Box,
    Button
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import DeleteUserModal from "../../molecules/modal/deleteModal"
import { AddUserButton } from '../../atoms';
import { Container, Row, Col, Pagination } from 'react-bootstrap';

const TableUserAcct = ({data, userType, addUser, addUserByCSV}) =>{
    const tableHeadersInst = ["Name", "Employee Number", "Email"]
    const tableHeadersClear = ["Name", "Employee Number", "Position", "Email"]
    const [modalState, setModalState] = useState(false);
    const [rowId, setRowId] = useState("")

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const pageCount = Math.ceil(data.length / rowsPerPage);
    const paginationItems = [];

    const [filteredData, setFilteredData] = useState(data)

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

    const handleRowClick = (id) => {
        setModalState(true);
        setRowId(id)
    }
    
    const handleClose = () => {
        setModalState(false)
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    for (let number = 0; number < Math.min(pageCount, 20); number++) {
        paginationItems.push(
        <Pagination.Item key={number} active={number === page} onClick={() => handleChangePage(null, number)}>
            {number + 1}
        </Pagination.Item>,
        );
    }

    const requestSearch = (searched) => {
      setFilteredData(data.filter((item) => item.employeeNumber.toString().includes(searched)))
    }

    const toTitleCase = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      };

    return(
        <div>
            <Box style={{boxShadow: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: '10px',
            }} >
            <Box sx={{justifyContent: 'center',  display: 'flex', flexDirection: 'row'}}>
                <Container style={{width:"1200px"}}>
                <TextField
                    variant='outlined'
                    placeholder='Search by Employee Number ...'
                    type='number'
                    onInput={(e) => requestSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment>
                            <IconButton>
                            <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                    style={{width:"400px", marginRight: 5}}
                    size='small'
                />
                <AddUserButton addUser={addUser} />
                <Button 
                        variant="contained" 
                        type="submit"
                        style = {{
                            width: 250, 
                            backgroundColor: "#28588C",  
                            borderRadius:"10px",
                            marginLeft: 5
                        }}
                        onClick={addUserByCSV}
                        >
                            Add User by CSV  
                    </Button>
                </Container>
            </Box>
            <Box style={{display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                }}> 
            <TableContainer elevation={2} style={{width:"1200px", marginTop: "20px"}} component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <StyledTableCell key={"1"}></StyledTableCell>
                        <StyledTableCell key={"2"} ><b>ID</b></StyledTableCell>
                        {(userType === "instructor") ?
                            (tableHeadersInst.map((header, index) => {
                                return <StyledTableCell key={index} align="center"> <b>{header}</b></StyledTableCell>
                            }))
                        : 
                            (tableHeadersClear.map((header, index) => {
                                return <StyledTableCell key={index} align="center"> <b>{header}</b></StyledTableCell>
                            }))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data.length !== 0) ?
                        (filteredData.length > 0 ? filteredData : data).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((listOfUser) => (
                            <StyledTableRow key={listOfUser.id}>
                            <StyledTableCell align="center" style={{width:"10px"}}>
                                <IconButton onClick={()=>handleRowClick(listOfUser.id)}>
                                     <DeleteIcon></DeleteIcon> 
                                </IconButton>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">{listOfUser.id}</StyledTableCell>
                            <StyledTableCell align="center">{toTitleCase(listOfUser.firstName) + " " + 
                                toTitleCase(listOfUser.lastName)}</StyledTableCell>
                            <StyledTableCell align="center">{listOfUser.employeeNumber}</StyledTableCell>
                            {(userType === "clearanceSign") &&
                                <StyledTableCell align="center">{toTitleCase(listOfUser.position)}</StyledTableCell>    
                            }
                            <StyledTableCell align="center">{listOfUser.email}</StyledTableCell>
                            </StyledTableRow>
                        ))
                        :
                        (<StyledTableRow > 
                            <StyledTableCell align="center" colSpan={(userType === "clearanceSign")? 6: 5}> No User Account </StyledTableCell>
                        </StyledTableRow>)
                    }
                </TableBody>
            </Table>
            </TableContainer>
            {/* table pagination */}
            <Container style={{marginTop:"10px", width:"1200px"}} >
                <Row >
                    <Col>
                    <div >
                        <span >Rows per page:  </span>
                        <select className="form-select" style={{width:"15%"}} onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        </select>
                    </div>
                    </Col>
                    <Col>
                    <Pagination className="custom-pagination" style={{marginTop:"15px"}} >
                        {paginationItems}
                    </Pagination>
                    </Col>
                </Row>
            </Container>
            </Box>
            </Box>
            {(modalState) && 
                <DeleteUserModal handleClose={handleClose} id={rowId} userType={userType} />
            }
        </div>

    )
}

export default TableUserAcct;