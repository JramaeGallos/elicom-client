import React, {useState} from 'react'
import {ViewSectionButton, SpecializationTable} from "../../atoms"
import ViewSectionModal from "../modal/viewSectionModal.js"
import {  
    Table, 
    TableRow,
    TableBody,
    TableCell,
    Collapse,
    Box,
    IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from "axios"

const CollapseTable = ({open, yearLevel, isOpenTransaction}) =>{

    const [sectionModal, setSectionModal] = useState(false)
    const [degProg, setDegProg] = useState("")
    const [degDesc, setDegDesc] = useState("")
    const [rowIndex, setRowIndex] = useState()
    const [sectionList, setSectionList]= useState([])

    const [openBSED, setBSEDOpen] = useState(false)
    const [openBTVTED, setBTVTEDOpen] = useState(false)

    const BSEDMajorList={
        "Eng":"English",
        "Fil":"Filipino",
        "Math":"Math",
        "Sci":"Science",
        "ValEd":"Values Education",
        "SocEd":"Social Education"
    }

    const BTVTEDMajorList={
        "AT":"Automotive Technology",
        "ET":"Electrical Technology",
        "FSM":"Food Service Management"
    }


    const degreeList ={
        "BEED":"Bachelor of Elementary Education",
        "BECED":"Bachelor of Early Childhood Education",
        "BSAB":"Bachelor of Science in Agribusiness",
        "BSED":"Bachelor of Secondary Education",
        "BTVTED":"Bachelor of Technical Vocational Teacher Education"
    }

    const degreeCodeList = Object.keys(degreeList)
    const degreeDescList=Object.values(degreeList)


    const handleCloseViewSection =()=>{
        setSectionModal(false)
    }

    
    const getYearLevel =()=>{
        if(yearLevel===1){
            return "freshman"
        }else if(yearLevel===2){
            return "sophomore"
        }else if(yearLevel===3){
            return "junior"
        }else if(yearLevel===4){
            return "senior"
        }
    }

    const handleClickButton = (index) =>{
        const degreeCode = degreeCodeList[index]
        setSectionModal(true)
        setRowIndex(index)
        setDegDesc(degreeDescList[index])
        setDegProg(degreeCode)

        const url = "http://localhost:3001/section/list"

        const data ={degreeCode:degreeCode, specializationCode: null, yearLevel: getYearLevel()}
        axios.post(url, data)
        .then(function(response){
            console.log(response.data)
            setSectionList(response.data)
        })
        .catch(function(error){
            console.log(error)
        })
    }

    return(
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                <Table  aria-label="purchases" size='small'>
                    <TableBody>
                    <TableRow>
                        <TableCell> {degreeDescList[0]} ({degreeCodeList[0]}) </TableCell>
                        <TableCell style={{ width: '15%' }}> <ViewSectionButton handleClickButton ={handleClickButton} index={0}/> </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> {degreeDescList[1]} ({degreeCodeList[1]}) </TableCell>
                        <TableCell style={{ width: '15%' }}> <ViewSectionButton handleClickButton ={handleClickButton}  index={1}/> </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{degreeDescList[2]} ({degreeCodeList[2]}) </TableCell>
                        <TableCell style={{ width: '15%' }}> <ViewSectionButton handleClickButton ={handleClickButton}  index={2}/> </TableCell>
                    </TableRow>
                    <TableRow style={{ width: '100%' }}>
                        <TableCell align='left'>
                            <IconButton size="small" onClick={() => setBSEDOpen(!openBSED)}>
                                {openBSED ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                            {degreeDescList[3]} ({degreeCodeList[3]})
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <SpecializationTable 
                        open={openBSED} 
                        majorList={BSEDMajorList} 
                        yearLevel={getYearLevel()} 
                        yearLevelNum={yearLevel} 
                        degreeCode={degreeCodeList[3]} 
                        degreeDesc={degreeDescList[3]}
                        isOpenTransaction={isOpenTransaction}
                    />
                    <TableRow>
                        <TableCell align='left'>
                            <IconButton size="small" onClick={() => setBTVTEDOpen(!openBTVTED)}>
                                {openBTVTED ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                            {degreeDescList[4]} ({degreeCodeList[4]})
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <SpecializationTable
                        open={openBTVTED} 
                        majorList={BTVTEDMajorList} 
                        yearLevel={getYearLevel()} 
                        yearLevelNum={yearLevel} 
                        degreeCode={degreeCodeList[4]} 
                        degreeDesc={degreeDescList[4]}
                        isOpenTransaction={isOpenTransaction}
                    />
                    </TableBody>
                </Table>
                </Box>
            </Collapse>
            {(sectionModal) &&
                <ViewSectionModal 
                    handleCloseViewSection={handleCloseViewSection} 
                    handleClickButton={handleClickButton}
                    index={rowIndex}
                    yearLevel={getYearLevel()} 
                    yearLevelNum={yearLevel}
                    degreeCode={degProg}
                    degreeDesc={degDesc} 
                    sectionList={sectionList}
                    major={null}
                    majorCode={null}
                    isOpenTransaction={isOpenTransaction}
                />
            }
            </TableCell>
        </TableRow>
    )
}

export default CollapseTable