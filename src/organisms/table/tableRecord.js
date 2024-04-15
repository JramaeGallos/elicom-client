import React, {useState} from 'react'
import {  
    Table, 
    TableRow,
    TableBody,
    TableContainer,
    Paper,
    TableCell,
    IconButton,
} from "@mui/material";
import {CollapseTable} from "../../molecules"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const TableRecord = ({isOpenTransaction}) => {
    const [openFresh, setOpenFresh] = useState(false);
    const [openSoph, setOpenSoph] = useState(false);
    const [openJun, setOpenJun] = useState(false);
    const [openSen, setOpenSen] = useState(false); 


    return(
        <TableContainer elevation={2} style={{width:"1200px", marginTop: "20px"}} component={Paper}>
            <Table aria-label="collapsible table" size='small'>
                <TableBody>
                    <TableRow> 
                        <TableCell align='left'>
                            <IconButton size="small" onClick={() => setOpenFresh(!openFresh)}>
                                {openFresh ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell align='left' style={{ width: '100%' }}> Freshman </TableCell>
                    </TableRow>
                    <CollapseTable open={openFresh} yearLevel={1} isOpenTransaction={isOpenTransaction}/>
                    <TableRow> 
                        <TableCell align='left'>
                            <IconButton size="small" onClick={() => setOpenSoph(!openSoph)}>
                                {openSoph ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell align='left'> Sophomore </TableCell> 
                    </TableRow>
                    <CollapseTable open={openSoph} yearLevel={2} isOpenTransaction={isOpenTransaction}/>
                    <TableRow>
                        <TableCell align='left'>
                            <IconButton size="small" onClick={() => setOpenJun(!openJun)}>
                                {openJun ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell align='left'> Junior </TableCell> 
                    </TableRow>
                    <CollapseTable open={openJun} yearLevel={3} isOpenTransaction={isOpenTransaction}/>
                    <TableRow> 
                        <TableCell align='left'>
                            <IconButton size="small" onClick={() => setOpenSen(!openSen)}>
                                {openSen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell align='left'> Senior </TableCell> 
                    </TableRow>
                    <CollapseTable open={openSen} yearLevel={4} isOpenTransaction={isOpenTransaction}/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableRecord