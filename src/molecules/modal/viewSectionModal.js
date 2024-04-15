import React, {useState} from 'react'
import { 
    Box, 
    Typography,
    Modal,
    Button,
    TableBody,
    TableRow,
    TableCell,
    Table,
    IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {DelSectionModal} from "../../atoms"
import axios from "axios"
import { useNavigate} from 'react-router-dom';

const ViewSectionModal = ({ 
        handleClickButton, 
        handleCloseViewSection,
        index,
        yearLevel, 
        yearLevelNum, 
        degreeCode, 
        degreeDesc, 
        sectionList, 
        major,
        majorCode,
        isOpenTransaction
    })=>{

    const navigate = useNavigate();
    const [delModalState, setDelModalState]= useState(false)
    const [sectID, setSectId] = useState()
    const [sectCode, setSectCode] = useState("")

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        borderRadius: '8px', 
        boxShadow: 24,
        p: 4,
      };

    const close =() =>{
        handleCloseViewSection()
    }

    const createSectionName=()=>{
        const letters=["a","b","c","d","e","f","g","h","i","j"]
        const sectLen=sectionList.length

        if(major===null){
            return degreeCode+"-"+yearLevelNum.toString()+letters[sectLen].toUpperCase()
        }else{
            return majorCode+"-"+yearLevelNum.toString()+letters[sectLen].toUpperCase()
        }
    }

    const addSection=()=>{
        const url = "http://localhost:3001/section/create"

        const data ={
            degreeCode:degreeCode,
            degreeDesc: degreeDesc,
            specializationCode: majorCode,
            specializationDesc: major,
            sectionCode: createSectionName(),
            yearLevel: yearLevel
        }

        axios.post(url, data)
        .then(function(response){
            console.log(response.data)
            handleClickButton(index)
        })
        .catch(function(error){
            console.log(error)
        })
    }

    const handleClickDel=(id, sectionCode)=>{
        setSectId(id)
        setSectCode(sectionCode)
        setDelModalState(true)
    }

    const handleCloseModal=(status, id)=>{
        if(status===true){
            const url = "http://localhost:3001/section/delete"

            const data ={id:id}
            axios.post(url, data)
            .then(function(response){
                console.log(response.data)
                handleClickButton(index)
            })
            .catch(function(error){
                console.log(error)
            })
        }
        setDelModalState(false)
    }

    const handleSectionClick =(sectionCode, sectionId)=>{
        navigate(
            "/class-record",
            {state:{
                yearLevel:yearLevel,
                sectionCode: sectionCode,
                sectionId: sectionId,
                isOpenTransaction: isOpenTransaction
            }}
        )
    }

    return(
        <div>
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                        <Typography id="modal-modal-description" variant="body1" component="h1">
                            {yearLevel.toUpperCase()} - {degreeCode} {major}
                        </Typography>
                    </Box>
                    <Table>
                        <TableBody>
                                {   (sectionList.length !==0) ?
                                    sectionList.map((section, index)=>(
                                        <TableRow key={index}>
                                            {(index === (sectionList.length-1)) ?
                                                (isOpenTransaction) ?
                                                <TableCell ></TableCell>
                                                :
                                                <TableCell >
                                                <IconButton size='small' onClick={()=>handleClickDel(section.id, section.sectionCode)}> 
                                                    <DeleteIcon ></DeleteIcon> 
                                                </IconButton>
                                                </TableCell >
                                                :
                                                <TableCell ></TableCell>
                                            }
                                            <TableCell style={{ width: '100%' }}> {section.sectionCode}</TableCell>
                                            <TableCell style={{width:"10%"}}>
                                                    <Button 
                                                        style={{minWidth:"100px", maxWidth:"100px"}} 
                                                        size='small'
                                                        onClick={()=>handleSectionClick(section.sectionCode, section.id)}
                                                        >
                                                            View Class
                                                    </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    (
                                    <TableRow>
                                        <TableCell> No Section List </TableCell>
                                    </TableRow>
                                    )
                                }
                        </TableBody>
                    </Table>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"20px" }}>
                        <Button
                            style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                            variant="contained"
                            disabled={(sectionList.length >=10) ? true : false}
                            onClick={addSection}  >
                            Add Section
                        </Button>
                        <Button 
                            style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                            variant="contained"
                            onClick={close}  >
                            Close
                        </Button>
                    </Box>
                    {(sectionList.length >=10) &&
                        <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                            <p className="error"> <i> You have reached the maximum allowable number of sections.</i> </p>
                        </Box>
                    }
            </Box>
        </Modal>
        {(delModalState) &&
            <DelSectionModal handleCloseModal={handleCloseModal} id={sectID} sectionCode={sectCode}/>
        }
        </div>
    )
}

export default ViewSectionModal;
