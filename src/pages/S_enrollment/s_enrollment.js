import React, {useState, useEffect} from 'react'
import { Navbar, SnackbarComp} from "../../organisms";
import {CloseStatusCard, OpenStatusCard, ReminderCard} from "../../molecules"
import { PageHeader, LoadingComponent} from '../../atoms';
import axios from "axios"
import {getUserAuth} from '../../auth'
import {
    Button,
    Box,
    Tooltip,
    Typography,
    Paper,
    Container
} from "@mui/material";
import { useNavigate, useLocation} from 'react-router-dom';

const EnrollmentS =()=>{
    const { state } = useLocation();
    const navigate = useNavigate();

    const [studentData, setStudentData] = useState()
    const [studentId, setStudentId] = useState()
    const [completeRemark, setCompleteRemark] = useState(false)
    const [isNewStudent, setIsNewStudent] = useState(false)
    const [isEnrolled, setIsEnrolled] = useState(false)
    const [isPreregistered, setIsPreregistered] = useState(false)

    const [snackbarState, setSnackbarState] = useState(true)

    const [loading, setLoading] = useState(true)

    // for snackbar modal
    const handleCloseResponse = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setSnackbarState(false);
    };

    const toTitleCase = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };
    
    const formatSubjects =()=>{
        let subjectList = []
        let subject = ""
        Array.from(studentData.subjects).forEach(char => {
            if(char !== "$"){
                subject = subject + char
            }else{
                subjectList.push(subject)
                subject=""
            }
          });
        return subjectList
    }

    useEffect(()=>{
        const getData = async () => {
            const result = await getUserAuth()
            
            if (result) {
                setStudentId(result.id)

                axios.post("https://elicom-server-5013ed31e994.herokuapp.com/update/data",{id: result.id})
                .then(function(response){

                    setStudentData(response.data)
                    setIsNewStudent(response.data.isNewStudent)
                    setIsEnrolled(response.data.isEnrolled)
                    setIsPreregistered(response.data.isPreregistered)
                    if(response.data.isClearRecordInst && response.data.isClearRecordClear){
                        setCompleteRemark(true)
                    }
                    setLoading(false)
                    
                })  
                .catch(function(error){
                    console.log(error)
                })
            }
        }
        getData()
    }, [])
  
    return(
        <div>
            <Navbar/>
            <PageHeader title={"Enrollment"}/>
            {
                (state.enrollmentStatus) ? //open enrollment status
                    (loading) ?
                        <LoadingComponent/>
                    :
                    <>{
                    (isEnrolled) ? // if the student is already enrolled
                        <>
                        <ReminderCard title={"You are now officially enrolled for this semester!"}/>
                        <Box style={{boxShadow: 4 }} display="flex" justifyContent="center" alignItems="center">
                            <Container 
                                style={{width:"1200px", backgroundColor: "#E3ECF5", paddingTop:"10px", paddingBottom:"10px", boxShadow: 2}} 
                                sx={{ marginTop: "10px",}} component={Paper}
                            >
                                <Typography fontFamily={"Segoe UI"} fontSize={16}  color={"#6D6262"}  >
                                    <b> Enrolled Subjects: </b>
                                </Typography>
                                {(formatSubjects()).map((subject) =>(
                                    <Typography fontFamily={"Segoe UI"} fontSize={16}  color={"#6D6262"}   >
                                        {toTitleCase(subject)}
                                    </Typography>
                                ))
                                }

                            </Container>
                        </Box>
                        </>
                    : 
                    (isPreregistered) ? // if the student is already pre-registered
                        <><ReminderCard title={"Thank you for filling out the pre-registration form! \
                        \n Kindly pick up the white form at the registrar’s office on the assigned date to \
                        be officially enrolled for this semester."}/>

                        <SnackbarComp 
                            handleCloseResponse={handleCloseResponse} 
                            snackbarState={snackbarState} 
                            responseState={true}
                            responseMessage={"You are now pre-registered."}
                        />
                        </>
                    :
                        <div> 
                            <OpenStatusCard title={"Enrollment is Open"}/>
                            {(isNewStudent) ?  // for new student
                                <ReminderCard title={"Welcome to LICOM! You can fill out the pre-registration form now."}/>
                            :
                            (completeRemark) ? // for old student
                                <ReminderCard title={"Your records are cleared. You can fill out the pre-registration form now."} />
                                : 
                                <ReminderCard title={"Please settle your outstanding records first to pre-register."} />
                            }
                            {(isNewStudent || completeRemark) && // for clear records
                                <Box  sx={{ marginTop: "20px"}} display="flex" justifyContent="center" alignItems="center">
                                    <Tooltip title={"Fill out Pre-registration Form"}>
                                        <Button 
                                            variant="contained" 
                                            style = {{width: 350, backgroundColor: "#28588C"}}
                                            onClick={()=>{navigate('/pre-register', 
                                                {
                                                    state:{
                                                        studentId: studentId,
                                                        enrollmentStatus: state.enrollmentStatus
                                                    }
                                                }
                                            )}}
                                            >
                                                Pre-Register
                                        </Button>
                                    </Tooltip>
                                </Box>
                            }
                        </div>
                    }</>
                : //close enrollment status
                    <CloseStatusCard title={"Enrollment is Close"}/>
            }
        </div>
    )
}

export default EnrollmentS

