import React, {useEffect, useState} from 'react'
import { useLocation} from 'react-router-dom';
import { PageHeader, LoadingComponent } from '../../atoms';
import { useNavigate} from 'react-router-dom';
import { Navbar} from "../../organisms";
import { 
    Button,
    Box,
    Container
} from "@mui/material";
import axios from "axios"
import {TableClassList} from "../../organisms"

const ClassRecordR =()=>{
    const navigate = useNavigate();
    const { state } = useLocation();

    const sectionId = state.sectionId;
    const sectionCode= state.sectionCode;
    const yearLevel= state.yearLevel;
    const isOpenTransaction= state.isOpenTransaction;

    const [classList, setClassList]= useState([])
    const [instructorList, setInstructorList]= useState([])
    const classIDList = []
    const instructorIDList=[]

    const [loading, setLoading] = useState(true)

    const [activeButton, setActiveButton] = useState(1); // 1-student, 2-instructor

    useEffect(()=>{
        const data = {SectionListId: sectionId}

        const url1 = "http://localhost:3001/enroll/list"
        axios.post(url1, data)
        .then(function(response){
            console.log("SUCCESS - Student List")
            setClassList(response.data)
            setLoading(false)
        })
        .catch(function(error){
            console.log(error)
        })

        const url2 = "http://localhost:3001/instructor-section/list"
        axios.post(url2, data)
        .then(function(response){
            console.log("SUCCESS - Instructor List")
            setInstructorList(response.data)
            setLoading(false)
        })
        .catch(function(error){
            console.log(error)
        })
    },[sectionId, yearLevel])

    // function to handle the add student button
    const handleAddStudent = () =>{
        for (const index of classList){
            classIDList.push(index.id)
        }
        navigate(
            "/source-list",{
                state : {
                    sectionId: sectionId,
                    sectionCode: sectionCode,
                    yearLevel: yearLevel,
                    userIDList: classIDList,
                    type: activeButton
                }
            })
    }

    const handleAddInstructor =()=>{
        for (const index of instructorList){
            instructorIDList.push(index.id)
        }
        navigate(
            "/source-list",{
                state : {
                    sectionId: sectionId,
                    sectionCode: sectionCode,
                    yearLevel: yearLevel,
                    userIDList: instructorIDList,
                    type: activeButton
                }
            })
    }

     // function for toggling the student and instructor button
     const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    return(
        <div>
        <Navbar/>
        <PageHeader title={"Class Record"}/>

        { (loading) ?
            <LoadingComponent/>
            :
            <Box style={{boxShadow: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        padding: '10px',
            }} >
                <Box sx={{justifyContent: 'center',  display: 'flex', flexDirection: 'row'}}>
                    <Container style={{width:"1200px"}}>
                    <Button 
                            variant="contained" 
                            type="submit"
                            style = {{
                                width: 250, 
                                position: 'relative',
                                left: 900,
                                backgroundColor: "#28588C",  
                                borderRadius:"10px",
                            }}
                            onClick={()=>{ activeButton === 1 ? handleAddStudent() : handleAddInstructor()}}
                            >
                                {activeButton === 1 ? "Add Student" : "Add Instructor"}
                    </Button>
                    </Container>
                </Box>
                
                <Box style={{display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}> 
                    <TableClassList 
                        type={activeButton}
                        handleButtonClick={handleButtonClick} 
                        activeButton = {activeButton}
                        classList={classList} 
                        instructorList={instructorList}
                        yearLevel={yearLevel} 
                        sectionCode={sectionCode} 
                        sectionId={sectionId}
                        isOpenTransaction={isOpenTransaction}
                        /> 
                </Box>
            </Box>
        }
        </div>
    )
}

export default ClassRecordR;