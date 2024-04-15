import React, {useState, useEffect} from 'react'
import { Navbar, SnackbarComp, AddUserModal, TableStudentUserAcct} from "../../organisms";
import {NoteCard} from "../../molecules"
import {  PageHeader, LoadingComponent} from '../../atoms';
import axios from "axios"
import { useNavigate, useLocation} from 'react-router-dom';
import {getUserAuth} from '../../auth'

const StudentEnrollmentR =()=>{
    const { state } = useLocation();
    const userType = "student" //usertype of table record

    const [registrarId, setRegistrarId] = useState()
    const [modalState, setModalState] = useState(false)
    const [snackbarState, setSnackbarState] = useState(false)
    const [responseMessage, setResponseMessage] = useState("")
    const [responseState, setResponseState] = useState(false)
    const [listOfUser, setListOfUser] = useState([])

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const addUser =()=>{
        setModalState(true)
    }

    const viewEnrolled =()=>{
        navigate('/enrolled-student', {state})
    }

    const handleCloseResponse = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarState(false);
      };

    const OnSubmitData = (value) => {
        if (value.success){
            const userInput = value.success
            const password = value.password
            const data = {
                firstName: userInput.firstName,
                lastName: userInput.lastName,
                password: password,
                studentNumber: userInput.studentNumber,
                email: userInput.email,
            }

            axios.post("https://elicom-server-5013ed31e994.herokuapp.com/login/register-student", data)
                .then(function(response){
                    if (response.data.error){
                        console.log(response.data.error)
                        setResponseMessage(response.data.error)
                        setResponseState(false)
                    }else{
                        console.log("User Successfully Added!")
                        setResponseMessage("User successfully Added!")
                        setResponseState(true)
                        window.location.reload(false);
                    }
                    setSnackbarState(true)
                })
                .catch(function(error){
                    console.log(error)
                });
        }
        setModalState(false)
    }

    useEffect(()=>{
        const getData = async () => {
            const result = await getUserAuth()
            setRegistrarId(result.id)
        }
        getData()

        axios.get("https://elicom-server-5013ed31e994.herokuapp.com/get-student/not-enrolled")
        .then(function(response){
            setLoading(false)
            setListOfUser(response.data)
        })
        .catch(function(error){
            console.log(error)
        })
    },[])

    return(
        <div>
            <Navbar />
            <PageHeader title={"Student Enrollment Record"}/>


            {(modalState) && 
                <AddUserModal OnSubmitData={OnSubmitData} userType={userType}/>
            }

            {(snackbarState) &&
                <SnackbarComp 
                handleCloseResponse={handleCloseResponse} 
                snackbarState={snackbarState} 
                responseState={responseState}
                responseMessage={responseMessage}
                />
            }

            { (loading) ?
                <LoadingComponent/>
                :
                <>
                <TableStudentUserAcct 
                    data={listOfUser} 
                    enrolled={false} 
                    registrarId={registrarId} 
                    enrollmentStatus={state.enrollmentStatus}
                    addUser={addUser}
                    viewEnrolled={viewEnrolled}
                />

                {(!state.enrollmentStatus) &&
                    <NoteCard title={"Enrollment is Close"}/>
                }

                </>
            }
             
        </div> 
    )
}

export default StudentEnrollmentR