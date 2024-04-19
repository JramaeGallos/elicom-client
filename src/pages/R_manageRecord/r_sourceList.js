import React, {useState, useEffect} from 'react'
import { Navbar, TableEnrolledList, AddToSectModal} from "../../organisms";
import {
    Box
} from "@mui/material";
import { PageHeader, LoadingComponent } from '../../atoms';
import axios from "axios"
import { useNavigate, useLocation } from 'react-router-dom';

const SourceListR =()=>{
    const navigate = useNavigate();
    const { state } = useLocation();

    const type = state.type;
    const userIDList = state.userIDList;
    const sectionId = state.sectionId;
    const yearLevel = state.yearLevel;
    const sectionCode = state.sectionCode;
    const [classToBeAdded, setClassToBeAdded] = useState([])
    const [addToSectionModal, setAddToSectionModal] = useState(false)

    const [validAddStudent, setValidAddStudent] = useState(false)
    const [listOfUser, setListOfUser] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        console.log(type)
        if(type===1){
            axios.get("https://elicom-server-5013ed31e994.herokuapp.com/get-student/enrolled-no-section-regular")
            .then(function(response){
                setListOfUser(response.data)
                setLoading(false)
                console.log(response.data)
            })
            .catch(function(error){
                console.log(error)
            })
        }else if(type===2){
            axios.get("https://elicom-server-5013ed31e994.herokuapp.com/getUser/instructor")
            .then(function(response){
                setListOfUser(response.data)
                setLoading(false)
            })
            .catch(function(error){
                console.log(error)
            })
        }
    },[type])

    const handleAddToSect =()=>{
        const toaAdd=[]
        for (const index of selectedRows){
            let rowVal = listOfUser[index]
            toaAdd.push(rowVal.id)
        }
        const alreadyEnrolled = toaAdd.some(element => userIDList.includes(element));
        
        (selectedRows.length !==0 ) && setValidAddStudent(!alreadyEnrolled) // will check first if there are students selected
        setClassToBeAdded(toaAdd)
        setAddToSectionModal(true)
    }

    const back =()=>{
        navigate("/class-record",{state})
    }

    const handleCloseModal=(status)=>{
        setAddToSectionModal(false)
        if(status){
            navigate("/class-record",{state})
        }
    }

    return(
        <div>
            <Navbar/>
            <PageHeader title={type ===1 ? "Student Record" : "Instructor Record"}/>

            { (loading) ?
                <LoadingComponent/>
                :
                <Box style={{boxShadow: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        padding: '10px',
                }} > 
            
                
                <TableEnrolledList 
                    data={listOfUser} 
                    selectedRows={selectedRows} 
                    setSelectedRows={setSelectedRows} 
                    type={type}
                    back={back}
                    handleAddToSect={handleAddToSect}
                    sectionCode={sectionCode}
                />
                    
                </Box>
            }

            {(addToSectionModal) &&
                <AddToSectModal 
                    type={type}
                    handleCloseModal={handleCloseModal} 
                    valid={validAddStudent} 
                    classToBeAdded={classToBeAdded}
                    sectionId={sectionId}
                    yearLevel={yearLevel}
                />
            }
        </div> 
    )
}

export default SourceListR