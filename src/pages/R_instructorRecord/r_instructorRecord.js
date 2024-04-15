import React, {useState, useEffect} from 'react'
import { Navbar, AddUserModal, SnackbarComp, TableUserAcct} from "../../organisms";
import { PageHeader, LoadingComponent} from '../../atoms';
import axios from "axios"

const InstructRecordR =()=>{
    const userType = "instructor"
    const [modalState, setModalState] = useState(false)
    const [snackbarState, setSnackbarState] = useState(false)
    const [responseMessage, setResponseMessage] = useState("")
    const [responseState, setResponseState] = useState(false)

    const [listOfUser, setListOfUser] = useState([])

    const [loading, setLoading] = useState(true)

    const addUser =()=>{
        setModalState(true)
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
                employeeNumber: userInput.employeeNumber, 
                email: userInput.email
            }

            console.log(data)

            axios.post("http://localhost:3001/login/register-instructor", data)
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
        axios.get("http://localhost:3001/getUser/instructor")
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
            <Navbar/>
            <PageHeader title={"Instructor Record"}/>

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
                <TableUserAcct data={listOfUser} userType={userType} addUser={addUser}/>
            }
        </div>
    )
}

export default InstructRecordR

//todo: render user accounts in a table - fix ui
