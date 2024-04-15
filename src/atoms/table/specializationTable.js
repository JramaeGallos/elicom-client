import React, {useState} from 'react'
import {  
    Table, 
    TableRow,
    TableBody,
    TableCell,
    Collapse,
    Box,
} from "@mui/material";
import ViewSectionButton from "../button/viewSectionButton.js"
import {ViewSectionModal} from "../../molecules"
import axios from "axios"

const SpecializationTable = ({open, majorList, yearLevel, yearLevelNum, degreeCode, degreeDesc, isOpenTransaction}) =>{
    const [sectionModal, setSectionModal] = useState(false)
    const [degMajor, setDegMajor] = useState("")
    const [degMajorCode, setDegMajorCode] = useState("")
    const [sectionList, setSectionList]= useState([])
    const [rowIndex, setRowIndex] = useState()

    const handleCloseViewSection =()=>{
        setSectionModal(false)
    }

    const majorCodeList=Object.keys(majorList)
    const majorDescList=Object.values(majorList)


    const handleClickButton = (index) =>{
        setSectionModal(true)
        setRowIndex(index)
        setDegMajor(majorDescList[index])
        setDegMajorCode(majorCodeList[index])
   
        const url = "https://elicom-server-5013ed31e994.herokuapp.com/section/list"

        const data ={degreeCode:degreeCode, specializationCode: majorCodeList[index],yearLevel: yearLevel}
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
                <Table size='small'  aria-label="purchases">
                    <TableBody>
                    {
                        majorDescList.map((major, index)=>(
                            <TableRow key={index}>
                                <TableCell>{major}</TableCell>
                                <TableCell style={{ width: '13%' }}>
                                     <ViewSectionButton handleClickButton ={handleClickButton} index={index}/> 
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
                </Box>
            </Collapse>
            {(sectionModal) &&
                <ViewSectionModal 
                    handleCloseViewSection={handleCloseViewSection} 
                    handleClickButton={handleClickButton}
                    index={rowIndex}
                    yearLevel={yearLevel} 
                    yearLevelNum={yearLevelNum}
                    sectionList={sectionList}
                    degreeCode={degreeCode}
                    degreeDesc={degreeDesc} 
                    major={degMajor}
                    majorCode={degMajorCode}
                    isOpenTransaction={isOpenTransaction}
                />
            }
            </TableCell>
        </TableRow>
    )
}

export default SpecializationTable