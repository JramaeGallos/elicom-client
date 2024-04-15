import React, {useEffect, useState} from 'react'
import { Navbar} from "../../organisms";
import { useLocation } from "react-router-dom";
import {CloseStatusCard, ReminderCard} from "../../molecules"
import { PageHeader, LoadingComponent } from '../../atoms';
import {getUserAuth} from '../../auth'
import {StudentRemarkList} from "../../organisms"
import axios from "axios"

const RecordS =()=>{
    const { state } = useLocation();
    const [isNewStudent, setIsNewStudent] = useState(false)
    const [instRemarkList, setInstRemarkList] = useState([])
    const [clearRemarkList, setClearRemarkList] = useState([])
    const [regRemarkList, setRegRemarkList] = useState([])

    const [completeRemark, setCompleteRemark] = useState(false)

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getData = async () => {
            const result = await getUserAuth()
            
            if (result) {

                axios.post("https://elicom-server-5013ed31e994.herokuapp.com/update/data",{id: result.id})
                .then(function(response){
                    setIsNewStudent(response.data.isNewStudent)

                    if(response.data.isClearRecordInst && response.data.isClearRecordClear){
                        setCompleteRemark(true)
                    }
                    
                })  
                .catch(function(error){
                    console.log(error)
                })


                axios.post("https://elicom-server-5013ed31e994.herokuapp.com/student-remark/list",{StudentAccountId: result.id})
                .then(function(response){
                    setInstRemarkList(response.data.instructorData)
                    setClearRemarkList(response.data.ClearanceData)
                    setRegRemarkList(response.data.registrarData)
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
            <PageHeader title={"Record Status"}/>
            {
                (state.transactionStatus) ? 
                    (loading) ?
                        <LoadingComponent/>
                    :
                    <>   
                        { (isNewStudent) ? 
                            <ReminderCard title={"Welcome to LICOM! This module contains your outstanding records with remarks."}/>
                        : (completeRemark) ?
                            <>
                            <ReminderCard title={"Your records are cleared."}/>
                            <StudentRemarkList 
                            clearanceRemark={[]} 
                            InstructorRemark={[]} 
                            registrarRemark={regRemarkList}/>
                            </>
                            :
                            <>
                            <ReminderCard title={"This module contains your outstanding records with remarks. \
                            Please settle your outstanding records to pre-register."}/>
                            
                            <StudentRemarkList 
                            clearanceRemark={clearRemarkList} 
                            InstructorRemark={instRemarkList} 
                            registrarRemark={regRemarkList}/>
                            </>
                        }
                    </> 
                :
                    <CloseStatusCard title={"Transaction is Close"}/>
            }
        </div>
    )
}

export default RecordS