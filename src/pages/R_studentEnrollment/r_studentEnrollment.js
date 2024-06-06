import React, {useState, useEffect} from 'react'
import { Navbar, SnackbarComp, AddUserModal, TableStudentUserAcct, ResponseModal} from "../../organisms";
import {NoteCard} from "../../molecules"
import {  PageHeader, LoadingComponent} from '../../atoms';
import axios from "axios"
import { useNavigate, useLocation} from 'react-router-dom';
import {getUserAuth, getAccessToken} from '../../auth'
import { AddUserByCSV } from "../../molecules"

const StudentEnrollmentR =()=>{
    const { state } = useLocation();
    const userType = "student" //usertype of table record

    const [registrarId, setRegistrarId] = useState()
    const [modalState, setModalState] = useState(false)
    const [csvModalState, setCsvModalState] = useState(false)

    const [snackbarState, setSnackbarState] = useState(false)
    const [responseMessage, setResponseMessage] = useState("")
    const [responseState, setResponseState] = useState(false)

    const [csvResponse, setCSVResponse] = useState([])
    const [csvUserCnt, setCSVUserCnt] = useState(0)
    const [userCnt, setUserCnt] = useState(0)
    const [listOfUser, setListOfUser] = useState([])

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const addUser =()=>{
        setModalState(true)
    }

    const addUserByCSV = () =>{
        setCsvModalState(true)
    }

    const handleCloseCSV =()=>{
        setCsvModalState(false)
    }

    const viewEnrolled =()=>{
        navigate('/enrolled-student', {state})
    }

    const [showResModal, setShowResModal] = useState(false);

    const handleOpenResModal = () => {
        setShowResModal(true);
    };

    const handleCloseResModal = () => {
        setShowResModal(false);
        setCSVResponse([])
        window.location.reload(false);
    };

    const handleCloseResponse = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarState(false);
      };

    useEffect(() => {
        const interval = setInterval(() => {
          if ((csvResponse.length !== 0 || userCnt !==0) && csvUserCnt !==0) {
            handleOpenResModal()
            setLoading(false)
          }
        }, 1000); // Check every 1000ms (1 second)
    
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [csvResponse, userCnt, csvUserCnt]); 


    const submitCSV = (data) => {
        setCSVUserCnt(data.length)
        let allCSVResponse = []

        for (const user of data){
            axios.post("https://elicom-server-5013ed31e994.herokuapp.com/login/register-student", user)
            .then(function(response){
                if (response.data.error){
                    allCSVResponse.push(response.data.error)
                }else{
                    setUserCnt(userCnt+1) // user successfully added
                }
            })
            .catch(function(error){
                console.log(error)
            });
        }
        setCSVResponse(allCSVResponse)
        handleCloseCSV()
        setLoading(true)
    }

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
            const result = await getAccessToken()

            if (result) {
                const data = await getUserAuth(result)
                setRegistrarId(data.id)
            }
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

            {(csvModalState) &&
                <AddUserByCSV handleCloseCSV={handleCloseCSV} submitCSV={submitCSV} userType={"student"}/>
            }
       
            <ResponseModal show={showResModal} handleClose={handleCloseResModal} message={csvResponse} csvUserCnt={csvUserCnt}/>
            

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
                    addUserByCSV={addUserByCSV}
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