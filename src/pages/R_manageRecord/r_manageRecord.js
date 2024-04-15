import React, {useState} from 'react'
import { Navbar, ManagementStatusModal, TableRecord} from "../../organisms";
import {SelectStatusButton, PageHeader, LoadingComponent} from "../../atoms"
import {  
    Box, 
    Container
} from "@mui/material";
import axios from "axios"


const ManageRecordR =()=>{
    const [initEnStat, setInitEnStat] = useState(undefined)
    const [initTranStat, setInitTranStat] = useState(undefined)

    const [isOpenEnrollment, setOpenEnrollment] = useState(initEnStat);
    const [isOpenTransaction, setOpenTransaction] = useState(initTranStat);

    const [enrollModalState, setEnrollModalState] = useState(false)
    const [clickEnrollVal, setClickEnrollVal] = useState(false)

    const [transactModalState, setTransactModalState] = useState(false)
    const [clickTransactVal, setClickTransactVal] = useState(false)

    const handleEnrollment = (event) => {
        setClickEnrollVal(event.target.value)
        setEnrollModalState(true)
    }

    const handCloseEnrollModal =(response) =>{
        (response !== isOpenEnrollment) && updateEnrollmentStatus(response)
        setOpenEnrollment(response)
        setEnrollModalState(false)
    }


    const handleTransaction = (event) => {
        setClickTransactVal(event.target.value)
        setTransactModalState(true)
    }

    const handleCloseTransactModal = (response) =>{
        (response !== isOpenTransaction) && updateTransactStatus(response)
        setOpenTransaction(response)
        setTransactModalState(false)
    }

    const updateTransactStatus = (status) =>{
        axios.post("https://elicom-server-5013ed31e994.herokuapp.com/management/set-transaction", {isOpenTransaction: status})
            .then(function(response){
                console.log(response)
            })
            .catch(function(error){
                console.log(error)
            })
    }

    const updateEnrollmentStatus = (status) =>{
        axios.post("https://elicom-server-5013ed31e994.herokuapp.com/management/set-enrollment", {isOpenEnrollment: status})
            .then(function(response){
                console.log(response)
            })
            .catch(function(error){
                console.log(error)
            })
    }

    const handleStatus=(enStat, tranStat)=>{
        setInitEnStat(enStat)
        setInitTranStat(tranStat)
    }

    
    return(
        <div>
            <Navbar getStatus={handleStatus}/>
            
            <PageHeader title={"Manage Record"}/>

            {(initEnStat!==undefined && initTranStat!==undefined) ?
                <>
                <Box style={{boxShadow: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    padding: '10px',
                }} ></Box>

                    <Box sx={{justifyContent: 'center',  display: 'flex', flexDirection: 'row'}}>
                        <Container style={{width:"1200px"}}>
                        <SelectStatusButton type={"enrollment"} handleEnrollment={handleEnrollment} isOpenEnrollment={initEnStat}/>
                        <SelectStatusButton type={"transaction"} handleTransaction={handleTransaction} isOpenTransaction={initTranStat}/>
                        </Container>
                    </Box>

                    <Box style={{display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}> 
                        <TableRecord isOpenTransaction={initTranStat}/>
                    </Box>
                </>
                :
                <LoadingComponent/>
            }

           

           {(enrollModalState) &&
                <ManagementStatusModal 
                    type={"enrollment"} 
                    handCloseEnrollModal={handCloseEnrollModal} 
                    value={clickEnrollVal}
                />
           }

           {
            (transactModalState) &&
                <ManagementStatusModal 
                    type={"transaction"} 
                    handleCloseTransactModal={handleCloseTransactModal} 
                    value={clickTransactVal}
                />
           }
        </div>
    )
}

export default ManageRecordR