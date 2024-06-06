import React, {useState, useEffect} from 'react'
import { Navbar, AddUserModal, SnackbarComp, TableUserAcct, ResponseModal} from "../../organisms";
import { PageHeader, LoadingComponent } from '../../atoms';
import axios from "axios"
import { AddUserByCSV } from "../../molecules"

const ClearanceAdminR =()=>{
    const userType = "clearanceSign"
    const [modalState, setModalState] = useState(false)
    const [snackbarState, setSnackbarState] = useState(false)
    const [responseMessage, setResponseMessage] = useState("")
    const [responseState, setResponseState] = useState(false)

    const [listOfUser, setListOfUser] = useState([])

    const [loading, setLoading] = useState(true)

    const [csvModalState, setCsvModalState] = useState(false)
    const [csvResponse, setCSVResponse] = useState([])
    const [csvUserCnt, setCSVUserCnt] = useState(0)
    const [userCnt, setUserCnt] = useState(0)

    const addUser =()=>{
        setModalState(true)
    }

    const handleCloseResponse = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarState(false);
      };

    const addUserByCSV = () =>{
        setCsvModalState(true)
    }

    const handleCloseCSV =()=>{
        setCsvModalState(false)
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

    const submitCSV=(data)=>{
        setCSVUserCnt(data.length)
        let allCSVResponse = []

        for (const user of data){
            axios.post("https://elicom-server-5013ed31e994.herokuapp.com/login/register-clearanceSign", user)
            .then(function(response){
                console.log(response.data)
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
                employeeNumber: userInput.employeeNumber, 
                position:userInput.position, 
                email: userInput.email
            }

            console.log(data)

            axios.post("https://elicom-server-5013ed31e994.herokuapp.com/login/register-clearanceSign", data)
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
        axios.get("https://elicom-server-5013ed31e994.herokuapp.com/getUser/clearanceSign")
        .then(function(response){
            setListOfUser(response.data)
            setLoading(false)
        })
        .catch(function(error){
            console.log(error)
        })
    },[])

    return(
        <div>
            <Navbar/>
            <PageHeader title={"Clearance Admin Record"}/>


            {(modalState) && 
                <AddUserModal OnSubmitData={OnSubmitData} userType={userType}/>
            }

            {(csvModalState) &&
                <AddUserByCSV handleCloseCSV={handleCloseCSV} submitCSV={submitCSV} userType={"staff"}/>
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
                <TableUserAcct data={listOfUser} userType={userType} addUser={addUser} addUserByCSV={addUserByCSV}/>
            }

        </div>
    )
}

export default ClearanceAdminR