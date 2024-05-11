import React, {useState, useEffect} from 'react'
import { 
    Box, 
    Typography,
    Modal,
    Button,
    TextField,
    IconButton,
    Tooltip
} from "@mui/material";
import { useNavigate} from 'react-router-dom';
import {ClearRecordModal, LoadingComponent} from "../../atoms"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios"

const ViewStatusModal = ({handCloseStatus, statusData, registrarId, enrollmentStatus}) =>{
    const navigate = useNavigate();

    const name=statusData.firstName
    const clearanceRecord= statusData.isClearRecordClear
    const instructorRecord= statusData.isClearRecordInst
    const isPreregistered=statusData.isPreregistered
    const isNewStudent = statusData.isNewStudent
    const isRegular = statusData.isRegular
    const isVerified = statusData.isVerified

    const [loading, setLoading] = useState(true)

    const [textValue, setTextValue] = useState('');
    const [existingRemark, setExistingRemark] = useState()

    const [clearRecordState, setClearRecordState] = useState(false)
    const [clearRecordTitle, setClearRecordTitle] = useState("")

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
        handCloseStatus()
    }

    const submit =()=>{
        setLoading(true)
        axios.post("https://elicom-server-5013ed31e994.herokuapp.com/registrar-remark/update-remark",
        {
            StudentAccountId: statusData.id,
            RegistrarAccountId: registrarId,
            remark: textValue
        }
        )
        .then(function(response){
            setExistingRemark(textValue)
            setTextValue("")
            setLoading(false)
        })
        .catch(function(error){
            console.log(error)
        })
    }


    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 50) {
          setTextValue(inputValue);
        }
    };

    useEffect(()=>{
        axios.post("https://elicom-server-5013ed31e994.herokuapp.com/registrar-remark/get-remark",
        {
            StudentAccountId: statusData.id,
            RegistrarAccountId: registrarId,
        }
        )
        .then(function(response){
            setExistingRemark(response.data)
            setLoading(false)
        })
        .catch(function(error){
            console.log(error)
        })
    },[registrarId, statusData])

    const checkClearance =()=>{
        setClearRecordState(true)
        setClearRecordTitle("clearance")
    }

    const checkInstructor =()=>{
        setClearRecordState(true)
        setClearRecordTitle("test permit")

    }

    const handleCloseClearModal = (state, title) =>{
        setClearRecordState(false)

        if(state){
            if(title === "clearance"){
                axios.post("https://elicom-server-5013ed31e994.herokuapp.com/update/clear-record-clearance",
                {
                    id: statusData.id,
                    isClearRecordClear: true
                }
                )
                .then(function(response){
                    console.log(response.data)
                    window.location.reload(false);
                })
                .catch(function(error){
                    console.log(error)
                })

            }else if(title === "test permit"){
                axios.post("https://elicom-server-5013ed31e994.herokuapp.com/update/clear-record-instructor",
                {
                    id: statusData.id,
                    isClearRecordInst: true
                }
                )
                .then(function(response){
                    console.log(response.data)
                    window.location.reload(false);
                })
                .catch(function(error){
                    console.log(error)
                })
            }
        }
    }

    const preregister = () =>{
        navigate('/pre-register', {
            state:{
                studentId: statusData.id,
                type: "registrar",
                enrollmentStatus: enrollmentStatus
            }
        })  
    }

    return(
        <>
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                    <Box sx={{alignItems:"center", justifyContent:"flex-start", display:"flex",}}>
                        { (isNewStudent) &&
                            <Typography id="modal-modal-description" variant="body1" component="h1"  >
                                <RadioButtonUncheckedIcon style={{fontSize:"small"}}/> {name.toUpperCase()} is a new student.
                            </Typography>
                        } 
                    </Box>
                    <Box sx={{alignItems:"center", justifyContent:"flex-start", display:"flex",}}>
                        { (isVerified) ?
                            <Typography id="modal-modal-description" variant="body1" component="h1"  >
                                <RadioButtonUncheckedIcon style={{fontSize:"small"}}/> {name.toUpperCase()}'s account is verified
                            </Typography>
                            :
                            <Typography id="modal-modal-description" variant="body1" component="h1"  >
                                <RadioButtonUncheckedIcon style={{fontSize:"small"}}/> {name.toUpperCase()}'s account is not verified.
                            </Typography>
                        } 
                    </Box>
                    <Box sx={{alignItems:"center", justifyContent:"flex-start", display:"flex",}}>
                        { (!isRegular) &&
                            <Typography id="modal-modal-description" variant="body1" component="h1"  >
                                <RadioButtonUncheckedIcon style={{fontSize:"small"}} /> {name.toUpperCase()} is an irregular student.
                            </Typography>
                        } 
                    </Box>
                    <Box sx={{alignItems:"center", justifyContent:"flex-start", display:"flex", marginTop:3}}> 
                        {(clearanceRecord) ?
                            <Typography id="modal-modal-description" variant="body1" component="h1"  >
                                <CheckCircleOutlineIcon sx={{color:"green"}}/> {name.toUpperCase()} has complete clearance records.
                            </Typography>
                            : (!isNewStudent) &&
                            <Typography id="modal-modal-description" variant="body1" component="h1" >
                                <DangerousOutlinedIcon sx={{color:"red"}}/> 
                                {name.toUpperCase()} has incomplete clearance records.
                                <Tooltip title={"Set records to cleared"}>
                                    <IconButton onClick={checkClearance}>
                                        <EditIcon/> 
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        }
                    </Box>
                    <Box sx={{alignItems:"center", justifyContent:"flex-start", display:"flex",}}>
                        {(instructorRecord) ?
                                <Typography id="modal-modal-description" variant="body1" component="h1"  >
                                    <CheckCircleOutlineIcon sx={{color:"green"}}/> {name.toUpperCase()} has complete test permit records.
                                </Typography>
                                : (!isNewStudent) &&
                                <Typography id="modal-modal-description" variant="body1" component="h1" >
                                    <DangerousOutlinedIcon sx={{color:"red"}}/> {name.toUpperCase()} has incomplete test permit records.
                                    <Tooltip title={"Set records to cleared"}>
                                        <IconButton onClick={checkInstructor}>
                                            <EditIcon/> 
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                        }
                    </Box>
                    <Box sx={{alignItems:"center", justifyContent:"flex-start", display:"flex",}}>
                        {(isPreregistered) ?
                                <Typography id="modal-modal-description" variant="body1" component="h1"  >
                                    <CheckCircleOutlineIcon sx={{color:"green"}}/> {name.toUpperCase()} has already pre-registered.
                                </Typography>
                                :
                                <Typography id="modal-modal-description" variant="body1" component="h1" >
                                    <DangerousOutlinedIcon sx={{color:"red"}}/> {name.toUpperCase()} has not yet pre-registered.
                                    <Tooltip title={"Manually pre-register student"}>
                                    <IconButton onClick={preregister} >
                                        <EditIcon/> 
                                    </IconButton>
                                </Tooltip>
                                </Typography>
                        }
                    </Box>
                    <br/>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                        <TextField
                            fullWidth
                            multiline
                            rows={1}
                            value={textValue}
                            onChange={handleChange}
                            label="Write Remark"
                            helperText={`${textValue.length}/50`}
                            variant="outlined"
                        />
                        <IconButton 
                            style={{color: "#28588C", marginLeft:"5px"}} 
                            onClick={submit}> 
                            <SendIcon />
                        </IconButton>
                    </Box>
                    { (loading) ?
                        <Box style={{height: '20px'}}>
                            <LoadingComponent/>
                        </Box>
                        :
                        <Box sx={{ display:"flex",}}> 
                            <Typography id="modal-modal-description" variant="body1" component="h1"  >
                                <b>Your remark: </b>{(existingRemark==="") ? "no remark" : existingRemark}
                            </Typography>
                        </Box>
                    }
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"20px" }}>
                        <Button 
                            style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                            variant="contained"
                            onClick={close}  >
                            Close
                        </Button>
                    </Box>
            </Box>
        </Modal>
        { (clearRecordState) &&
            <ClearRecordModal title={clearRecordTitle} handleCloseClearModal={handleCloseClearModal}/>
        }
        </>
    )
}

export default ViewStatusModal;
