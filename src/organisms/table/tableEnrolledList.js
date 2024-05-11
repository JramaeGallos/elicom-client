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
    Checkbox,
    Box,
    Button
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {ViewMoreModal} from "../../molecules"
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { TableButtons } from '../../atoms';

const TableEnrolledList = ({data, selectedRows, setSelectedRows, type, back, handleAddToSect, sectionCode}) =>{
  
    const [userInfo, setUserInfo] = useState({})
    const [viewMoreModal, setViewMoreModal] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const pageCount = Math.ceil(data.length / rowsPerPage);
    const paginationItems = [];

    const [filteredData, setFilteredData] = useState(data)

    // const [selectedRows, setSelectedRows] = useState([]);

    // function for styling the table
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
    

    //function for view more modal
    const handleClickViewMore = (info)=>{
        setViewMoreModal(true)
        setUserInfo(info)
    }

    const handleCloseViewMore = () => {
        setViewMoreModal(false)
    }

    //function for paginaton
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

    //function for table search function
    const requestSearch = (searched) => {
      setFilteredData(data.filter((item) => item.studentNumber.toString().includes(searched)))
    }

    //function for 'select row' 
    const handleRowClick = (id) => {
      const selectedIndex = selectedRows.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = [...selectedRows, id];
      } else {
        newSelected = selectedRows.filter((rowId) => rowId !== id);
      }
  
      setSelectedRows(newSelected);
    };
  
    const handleSelectAllClick = () => {
      if (selectedRows.length === data.length) {
        setSelectedRows([]);
      } else {
        const allRowIds = data.map((row, index) => index);
        setSelectedRows(allRowIds);
      }
    };
  
    const isSelected = (id) => selectedRows.indexOf(id) !== -1;

    const toTitleCase = (str) => {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };
  

    return(
        <div>
          <Box sx={{justifyContent: 'center',  display: 'flex', flexDirection: 'row'}}>
          <Container style={{width:"1200px"}}>
            <TextField
                variant='outlined'
                placeholder={type === 1 ? 'Search by Student Number ...' : 'Search by Employee Number ...'}
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
            <Button 
                variant="contained" 
                type="submit"
                style = {{
                    width: 250, 
                    backgroundColor: "#28588C",  
                    borderRadius:"10px",
                    marginRight: 5,
                    position: 'relative',
                    left: 250
                }}
                onClick={handleAddToSect}
                >
                    Add to {sectionCode}
            </Button>

            <Button 
                variant="contained" 
                type="submit"
                style = {{
                    width: 250, 
                    backgroundColor: "#28588C",  
                    borderRadius:"10px",
                    marginRight: 5,
                    position: 'relative',
                    left: 250
                }}
                onClick={back}
                >
                    Back
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
                        {(data.length !==0) &&
                          <StyledTableCell padding="checkbox">
                          <Checkbox
                              indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                              checked={selectedRows.length === data.length}
                              onChange={handleSelectAllClick}
                          />
                          </StyledTableCell>
                        }
                        <StyledTableCell align="center"> <b>ID</b></StyledTableCell>
                        <StyledTableCell align="center"> 
                          <b>{type===1 ? "Student Number" : "Employee Number"}</b>
                        </StyledTableCell>
                        {(type ===1) &&
                          <StyledTableCell align="center"> <b>Status</b></StyledTableCell>
                        }
                        <StyledTableCell align="center"> <b>Name</b></StyledTableCell>
                        <StyledTableCell align="center"> <b>User Information</b></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data.length !== 0) ?
                        (filteredData.length > 0 ? filteredData : data).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((listOfUser, index) => (
                            <StyledTableRow 
                                key={index} 
                            >
                            <StyledTableCell padding="checkbox">
                                <Checkbox checked={isSelected(index)}  onClick={() => handleRowClick(index)} />
                            </StyledTableCell>
                            <StyledTableCell align="center">{listOfUser.id}</StyledTableCell>
                            <StyledTableCell align="center">{type===1 ? listOfUser.studentNumber : listOfUser.employeeNumber}</StyledTableCell>
                            { (type ===1) &&
                                <StyledTableCell align="center">
                                  { (listOfUser.isRegular) ?
                                      "Regular"
                                      :
                                      "Irregular"
                                  }
                                </StyledTableCell>  
                            }
                            <StyledTableCell align="center">{toTitleCase(listOfUser.firstName) +
                               " " + toTitleCase(listOfUser.lastName)}</StyledTableCell>
                            <StyledTableCell align="center">
                                    <TableButtons name={"View More"} handleClickViewMore={handleClickViewMore} info={listOfUser}/>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                        :
                        (<StyledTableRow > 
                            <StyledTableCell align="center" colSpan={7}>No User Account</StyledTableCell>
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
            {(viewMoreModal) &&
                <ViewMoreModal
                    handleCloseViewMore={handleCloseViewMore}
                    info={userInfo}
                />
            }
        </div>

    )
}

export default TableEnrolledList;