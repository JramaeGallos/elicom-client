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
    Typography,
    Checkbox,
    Button,
    Select,
    MenuItem,
    Tooltip,
    Box,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import {DeleteUserModal, 
        ViewStatusModal, 
        EnrollModal, 
        EnrollAllModal, 
        ViewMoreModal, 
        ChangeStudTypeModal} 
from "../../molecules"
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { TableButtons, AddUserButton } from '../../atoms';

const TableStudentUserAcct = ({
        data, 
        enrolled, 
        registrarId, 
        enrollmentStatus, 
        viewEnrolled,
        addUser,
        back
    })=>{
    const userType="student"
    const tableHeaders = ["ID","Name", "Student Number", "Pre-Enrollment Status", ""]
    const tableHeadersEnrolled = ["ID","Name", "Student Number", "Status", "Student Information"]

    const [rowId, setRowId] = useState("")
    const [typeStatus, setTypeStatus] = useState(true)
    const [studentInfo, setStudentInfo] = useState({})

    const [delModalState, setDelModalState] = useState(false);
    const [typeModalState, setTypeModalState] = useState(false);
    const [statusModalState, setStatusModalState] = useState(false);
    const [enrollModalState, setEnrollModalState] = useState(false);
    const [enrollAllModal, setEnrollAllModal] = useState(false);
    const [viewMoreModal, setViewMoreModal] = useState(false);

    const [preEnrollStatus, setPreEnrollStatus] = useState(false)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const pageCount = Math.ceil(data.length / rowsPerPage);
    const paginationItems = [];

    const [searchedData, setSearchedData] = useState([])

    const [selectedRows, setSelectedRows] = useState([]);
    const [validEnrollment, setValidEnrollment] = useState(false)

    const [statusData, setStatusData] = useState()

    const [searchStatus, setSearchStatus] = useState(false)
    const [yearLevelVal, setYearLevelVal] = useState("");
    const yearLevels = ["Freshman", "Sophomore", "Junior", "Senior"]
    const [degProgVal, setDegProgVal] = useState("")
    const degreeList ={
        "BEED":"Bachelor of Elementary Education",
        "BECED":"Bachelor of Early Childhood Education",
        "BSAB":"Bachelor of Science in Agribusiness",
        "BSED":"Bachelor of Secondary Education",
        "BTVTED":"Bachelor of Technical Vocational Teacher Education"
    }
    const degreeCodeList = Object.keys(degreeList)

    const handleYearLevel = (event) => {
        setYearLevelVal(event.target.value)
        setDegProgVal("")
    }

    const handleDegProg = (event) =>{
        setDegProgVal(event.target.value) 
    }

    const filteredData = data.filter((item) => 
        (!yearLevelVal || item.yearLevel.includes(yearLevelVal)) &&
        (!degProgVal || item.course.includes(degProgVal)) 
    )

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
    
    // functions for delete user button
    const handleClickDel = (id) => {
        setDelModalState(true);
        setRowId(id)
    }
    
    const handleCloseDel = () => {
        setDelModalState(false)
    };

    //handle change type button
    const handleChangeType = (id, isRegular) =>{
        setTypeModalState(true)
        setTypeStatus(isRegular)
        setRowId(id)
    }

    const handleCloseType = () =>{
        setTypeModalState(false)
    }

    // functions for click remark button
    const handleClickStatus = (info) => {
        setStatusModalState(true);
        setStatusData(info)
    }

    const handCloseStatus = () =>{
        setStatusModalState(false);
    }

    //functions for click enroll button
    const handleClickEnroll = (id, status) =>{
        setEnrollModalState(true)
        setPreEnrollStatus(status)
        setRowId(id)
    }

    const handleCloseEnroll = () =>{
        setEnrollModalState(false)
    }

    //function for view more modal
    const handleClickViewMore = (info)=>{
        setViewMoreModal(true)
        setStudentInfo(info)
    }

    const handleCloseViewMore = () => {
        setViewMoreModal(false)
    }

    //functions for click enroll all button
    const handleClickEnrollAll = () =>{
        setEnrollAllModal(true)
        if(selectedRows.length!==0){
            let initValidation = true
            for (const index of selectedRows){
                let rowVal = data[index]
                if( !( ( ((rowVal.isClearRecordInst && rowVal.isClearRecordClear) 
                    || rowVal.isNewStudent) && rowVal.isPreregistered))){
                        initValidation = false
                }
            }
            setValidEnrollment(initValidation)
        }
    }

    const handleCloseEnrollAll = () =>{
        setEnrollAllModal(false)
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
      setSearchedData(data.filter((item) => item.studentNumber.toString().includes(searched)))
      if(searched !== ""){
        setSearchStatus(true)
        setYearLevelVal("")
        setDegProgVal("")
      }else{
        setSearchStatus(false)
      }
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
                    placeholder='Search by Student Number ...'
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
                    style={{width:"400px",  marginRight: 5}}
                    size='small'
                />
                { (enrollmentStatus) &&
                    <Button 
                        variant="contained" 
                        type="submit"
                        style = {{
                            width: 250, 
                            backgroundColor: "#28588C",  
                            borderRadius:"10px",
                            marginRight: 5,
                        }}
                        onClick={viewEnrolled}
                        >
                            View Enrolled Student
                    </Button>
                }

                { (enrolled) ?
                    <>
                    <Select
                        required
                        value={yearLevelVal}
                        onChange={handleYearLevel}
                        disabled = {searchStatus}
                        displayEmpty
                        renderValue={yearLevelVal !== "" ? undefined : () => "Year Level"}
                        size='small'
                        style={{
                            borderRadius:"10px",
                            width: 250, 
                            height: 35,
                            marginRight: 5
                        }}
                        >
                        <MenuItem value={yearLevelVal}></MenuItem>
                        <MenuItem value={""}>All Student</MenuItem>
                        {
                            (yearLevels).map((level, index) => (
                                <MenuItem key={index} value={level}>{level}</MenuItem>
                            ))
                        }
                    </Select>
                    <Select
                        required
                        disabled ={(searchStatus) || yearLevelVal==="" ? true : false}
                        value={degProgVal}
                        onChange={handleDegProg} 
                        displayEmpty
                        renderValue={degProgVal !== "" ? undefined : () => "Degree Program"}
                        size='small'
                        style={{
                            borderRadius:"10px",
                            width: 250, 
                            height: 35,
                            marginRight: 5
                        }}
                        >
                        <MenuItem value={degProgVal}></MenuItem>
                        {
                            (degreeCodeList).map((degCode, index) => (
                                <MenuItem key={index} value={degCode}>{degCode}</MenuItem>
                            ))
                        }
                    </Select>

                    <Button 
                        variant="contained" 
                        type="submit"
                        style = {{
                            width: 250, 
                            backgroundColor: "#28588C",  
                            borderRadius:"10px",
                        }}
                        onClick={back}
                        >
                            Back
                    </Button>   
                    </>
                    :
                    <AddUserButton addUser={addUser} />
                }
                </Container>
            </Box>
            <Box style={{display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
            <TableContainer elevation={2} style={{width:"1200px", marginTop: "20px"}} component={Paper}>
            {(!enrolled) &&
                <Button 
                    type="submit"
                    size='small'
                    style={{
                        color: "#28588C", 
                    }}
                    onClick={handleClickEnrollAll}
                    >
                        Enroll All
                </Button>
            }
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {(!enrolled && data.length !==0) && 
                            <StyledTableCell padding="checkbox">
                            <Checkbox
                                indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                                checked={selectedRows.length === data.length}
                                onChange={handleSelectAllClick}
                            />
                            </StyledTableCell>
                        }
                        <StyledTableCell key={"0"}></StyledTableCell>
                        { (!enrolled) ? 
                            tableHeaders.map((header, index) => {
                                return <StyledTableCell key={index} align="center"> <b>{header}</b></StyledTableCell>
                            })
                            :
                            tableHeadersEnrolled.map((header, index) => {
                                return <StyledTableCell key={index} align="center"> <b>{header}</b></StyledTableCell>
                            })
                        }
                        <StyledTableCell key={"1"}></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data.length !==0 && filteredData.length !== 0) ?
                        (searchedData.length > 0 ? searchedData : filteredData)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((listOfUser, index) => (
                            <StyledTableRow 
                                key={index} 
                            >
                            {(!enrolled) &&
                                <StyledTableCell padding="checkbox">
                                    <Checkbox checked={isSelected(index)}  onClick={() => handleRowClick(index)} />
                                </StyledTableCell>
                            }
                            <StyledTableCell align="center" style={{width:"10px"}}> 
                                <Tooltip title={"Delete User"}>
                                    <IconButton onClick={()=>handleClickDel(listOfUser.id)}> 
                                        <DeleteIcon></DeleteIcon> 
                                    </IconButton>
                                </Tooltip>
                            </StyledTableCell>
                            <StyledTableCell align="center">{listOfUser.id}</StyledTableCell>
                            <StyledTableCell align="center">{toTitleCase(listOfUser.firstName) + " " + 
                                    toTitleCase(listOfUser.lastName)}</StyledTableCell>
                            <StyledTableCell align="center">{listOfUser.studentNumber}</StyledTableCell>
                            { (enrolled) &&
                                <StyledTableCell align="center"> 
                                    {(listOfUser.isRegular) ? 
                                        <> 
                                            Regular
                                            <Tooltip title={"Change type to irregular"}>
                                                <IconButton onClick={() => handleChangeType(listOfUser.id, !listOfUser.isRegular)} size='small'>
                                                    <ModeEditIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                        : 
                                        <> 
                                            Irregular
                                            <Tooltip  title={"Change type to regular"}>
                                                <IconButton onClick={() => handleChangeType(listOfUser.id, !listOfUser.isRegular)} size='small'>
                                                    <ModeEditIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    }
                                </StyledTableCell>
                            }
                            { (!enrolled) ? 
                                <><StyledTableCell align="center">
                                { 
                                (((listOfUser.isClearRecordInst && listOfUser.isClearRecordClear) 
                                    || listOfUser.isNewStudent)&& listOfUser.isPreregistered)? 
                                    (<><CheckIcon style={{ color: 'green' }}/></>)
                                    :
                                    (<><DangerousOutlinedIcon sx={{color:"red"}}/></>)
                                }
                                </StyledTableCell>
                                <StyledTableCell>
                                    <TableButtons name={"View Status"} handleClickStatus={handleClickStatus} info={listOfUser}/>
                                </StyledTableCell>
                                </>
                                :
                                <StyledTableCell align="center">
                                    <TableButtons name={"View More"} handleClickViewMore={handleClickViewMore} info={listOfUser}/>
                                </StyledTableCell>
                            }
                            <StyledTableCell align="center">{(listOfUser.isEnrolled)? 
                                (<Typography color={"green"}>ENROLLED</Typography>)
                                :
                                 ( (((listOfUser.isClearRecordInst && listOfUser.isClearRecordClear) 
                                    || listOfUser.isNewStudent)&& listOfUser.isPreregistered) ? 
                                    (<TableButtons name={"Enroll"} 
                                        disabled={enrollmentStatus}
                                        handleClickEnroll={handleClickEnroll}
                                        id={listOfUser.id} status={true}/>)
                                    :
                                    (<TableButtons name={"Enroll"} 
                                        handleClickEnroll={handleClickEnroll} 
                                        disabled={enrollmentStatus}
                                        id={listOfUser.id} 
                                        status={false}/>)
                                )}
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
            </Box>
            {(delModalState) && 
                <DeleteUserModal 
                    handleClose={handleCloseDel} 
                    id={rowId} 
                    userType={userType} 
                />
            }
            {(statusModalState) &&
                <ViewStatusModal 
                    handCloseStatus={handCloseStatus} 
                    id={rowId}
                    statusData={statusData}
                    registrarId={registrarId}
                    enrollmentStatus={enrollmentStatus}
                />
            }
            {(enrollModalState) &&
                <EnrollModal 
                    handleCloseEnroll={handleCloseEnroll} 
                    id={rowId} 
                    status={preEnrollStatus}
                />
            }
            {(enrollAllModal) &&
                <EnrollAllModal 
                    handleCloseEnrollAll={handleCloseEnrollAll} 
                    selectedRows={selectedRows} 
                    data={data} 
                    validEnrollment={validEnrollment}/>
            }
            {(viewMoreModal) &&
                <ViewMoreModal
                    handleCloseViewMore={handleCloseViewMore}
                    info={studentInfo}
                />
            }
            {(typeModalState) &&
                <ChangeStudTypeModal 
                    handleClose = {handleCloseType}
                    typeStatus ={typeStatus}
                    id = {rowId}
                />
            }
        </div>

    )
}

export default TableStudentUserAcct;