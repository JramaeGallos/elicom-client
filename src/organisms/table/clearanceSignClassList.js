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
    Typography,
    Tooltip,
    Box,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import axios from "axios"
import { TableButtons } from '../../atoms';
import { AddInstRemarkModal } from "../../molecules"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ClearanceSignClassList = ({data, ClearanceSignAccountId, handleSectVal}) =>{
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const pageCount = Math.ceil(data.length / rowsPerPage);
    const paginationItems = [];

    const [filteredData, setFilteredData] = useState(data)

    const [remarkModal, setRemarkModal] = useState(false)
    const [id, setId] = useState()

    const studentIdArray = data.map(obj => obj.dataValues.id);
    
    const recordStatusArray = data.map(obj => obj.isClearedRecord);
    const allTrueRecord =  (recordStatusArray.length !==0) ? recordStatusArray.every(value => value === true) : false;

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
      setFilteredData(data.filter((item) => item.studentNumber.toString().includes(searched)))
    }

    const handleRecord = (studentId) =>{
        axios.post("http://localhost:3001/clearance-remark/update-record",
        {
            StudentAccountId: studentId,
            ClearanceSignAccountId: ClearanceSignAccountId,
        }
        )
        .then(function(response){
            handleSectVal()
        })
        .catch(function(error){
            console.log(error)
        })
    }

    const handleRemark = (id) =>{
        setId(id)
        setRemarkModal(true)
        
    }

    const handleCloseAddRemark = () =>{
        setRemarkModal(false)
    }

    const submitRemark = (studentId, remark) =>{
        axios.post("http://localhost:3001/clearance-remark/update-remark",
            {
                StudentAccountId: studentId,
                ClearanceSignAccountId: ClearanceSignAccountId,
                remark: remark
            }
        )
        .then(function(response){
            handleSectVal()
        })
        .catch(function(error){
            console.log(error)
        })
    }

      //function for 'select all row' 
    const handleCheckAllRecord=()=>{
        axios.post("http://localhost:3001/clearance-remark/update-all-record",
        {
            studentIdList: studentIdArray,
            ClearanceSignAccountId: ClearanceSignAccountId
        }
        )
        .then(function(response){
            handleSectVal()
        })
        .catch(function(error){
            console.log(error)
        })
    }

    const toTitleCase = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      };

    return(
        <div>
            <Box sx={{justifyContent: 'center',  display: 'flex', flexDirection: 'row'}}>
            <Container style={{width:"1200px"}}>
            <TextField
                variant='outlined'
                placeholder='Search by Student Number ...'
                type='number'
                onInput={(e) => requestSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                }}
                style={{width:"400px"}}
                size='small'
            />
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
                        <StyledTableCell align="center"> <b>Student Number</b></StyledTableCell>
                        <StyledTableCell align="center"> <b>Name</b></StyledTableCell>
                        <StyledTableCell align="center"> 
                            {(data.length !==0 ) ?
                                (allTrueRecord)?
                                    <CheckCircleOutlineIcon sx={{color:"green"}}/>
                                    :
                                    <Checkbox 
                                        checked={allTrueRecord}  
                                        onChange={handleCheckAllRecord} 
                                    />
                                :
                                <></>
                            }
                            <b>{" "}Status</b>
                        </StyledTableCell>
                        <StyledTableCell align="center"> <b>Remarks</b></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data.length !== 0) ?
                        (filteredData.length > 0 ? filteredData : data).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((listOfUser) => (
                            <StyledTableRow key={listOfUser.dataValues.id}>
                            <StyledTableCell align='center'>{listOfUser.dataValues.studentNumber}</StyledTableCell>
                            <StyledTableCell align="center">{toTitleCase(listOfUser.dataValues.firstName)
                                 + " " + toTitleCase(listOfUser.dataValues.lastName)}</StyledTableCell>
                            <StyledTableCell align="center">
                                {(listOfUser.isClearedRecord) ?
                                   <CheckCircleOutlineIcon sx={{color:"green"}}/>
                                   :
                                   <Checkbox checked={listOfUser.isClearedRecord}  
                                   onClick={() => handleRecord(listOfUser.dataValues.id)} 
                                    />
                                }
                            </StyledTableCell>
                            <StyledTableCell width={"400px"} align="center">
                                { (listOfUser.isClearedRecord) ?
                                    <Typography style={{ color: 'green' }}>
                                        COMPLETE
                                    </Typography>
                                    :
                                    ((listOfUser.remark === "") ?
                                        <TableButtons name={"Add Remark"} handleRemark={handleRemark} id={listOfUser.dataValues.id}/>
                                        : 
                                        (<>
                                            {listOfUser.remark}
                                            <Tooltip title="Clear Remark">
                                            <IconButton onClick={()=>submitRemark(listOfUser.dataValues.id, "")} >
                                                <CancelPresentationIcon fontSize='small'/>
                                            </IconButton>
                                            </Tooltip>
                                        </>
                                        )
                                    )
                                }
                            </StyledTableCell>
                            </StyledTableRow>
                        ))
                        :
                        (<StyledTableRow > 
                            <StyledTableCell align="center" colSpan={5}> No Class List </StyledTableCell>
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

            {(remarkModal) &&
                <AddInstRemarkModal handleCloseAddRemark={handleCloseAddRemark} id={id} submitRemark={submitRemark}/>
            }
        </div>

    )
}

export default ClearanceSignClassList;