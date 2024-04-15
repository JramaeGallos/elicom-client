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
import { Container, Row, Col, Pagination } from 'react-bootstrap';

const StudentRemarkList = ({clearanceRemark, InstructorRemark, registrarRemark}) =>{
    const tableHeaders = ["Position", "Name", "Remarks"]

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const pageCount = Math.ceil((InstructorRemark.length+ clearanceRemark.length) / rowsPerPage);
    const paginationItems = [];

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
            <TableContainer elevation={2} style={{width:"1200px", marginTop: "20px"}} component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {
                            (tableHeaders.map((header, index) => {
                                return <StyledTableCell key={index} align="center"> <b>{header}</b></StyledTableCell>
                            }))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(InstructorRemark.length === 0 && clearanceRemark.length ===0 && registrarRemark.length === 0) && 
                        <StyledTableRow > 
                            <StyledTableCell align="center" colSpan={3}> No Record </StyledTableCell>
                        </StyledTableRow>
                    }
                    {(InstructorRemark.length !== 0) &&
                        InstructorRemark.map((remark) => (
                            <StyledTableRow key={remark.dataValues.id}>
                            <StyledTableCell align='center'>{toTitleCase(remark.position)}</StyledTableCell>
                            <StyledTableCell align="center">{toTitleCase(remark.firstName) + 
                                " " + toTitleCase(remark.lastName)}</StyledTableCell>
                            <StyledTableCell align="center">
                               {(remark.dataValues.isClearedMT && remark.dataValues.isClearedFinal) ?
                                    <Typography style={{ color: 'green' }}>
                                     complete
                                    </Typography>
                                    :
                                    (remark.dataValues.remark === "") ?
                                    <Typography >
                                        incomplete
                                    </Typography>
                                    :
                                    <Typography >
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
                                <StyledTableCell align='center'>{toTitleCase(toTitleCase(remark.position))}</StyledTableCell>
                                <StyledTableCell align="center">{toTitleCase(remark.firstName) + " " + 
                                    toTitleCase(remark.lastName)}</StyledTableCell>
                                <StyledTableCell align="center">
                                   {(remark.dataValues.isClearedRecord) ?
                                        <Typography style={{ color: 'green' }}>
                                         complete
                                        </Typography>
                                        :
                                        (remark.dataValues.remark === "") ?
                                        <Typography >
                                         incomplete
                                        </Typography>
                                        :
                                        <Typography >
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
                                <StyledTableCell align='center'>{toTitleCase(remark.position)}</StyledTableCell>
                                <StyledTableCell align="center">{toTitleCase(remark.firstName) + " " +
                                 toTitleCase(remark.lastName)}</StyledTableCell>
                                <StyledTableCell align="center">
                                   {(remark.dataValues.remark === "") ?
                                        <Typography>
                                            no remark
                                        </Typography>
                                        :
                                        <Typography >
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
            {/* table pagination */}
            <Container style={{marginTop:"10px", width:"1200px"}} >
                <Row >
                    <Col>
                    <div >
                        <span style={{marginRight:"5px"}}>Rows per page:  </span>
                        <select className="form-select" style={{width:"15%"}} onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        </select>
                    </div>
                    </Col>
                    <Col>
                    <Pagination className="custom-pagination" style={{marginTop:"15px"}}>
                        {paginationItems}
                    </Pagination>
                    </Col>
                </Row>
            </Container>
            </Box>
        </div>

    )
}

export default StudentRemarkList;