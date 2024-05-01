import React, { useState, useEffect} from 'react'
import { Navbar, ClearanceSignClassList} from "../../organisms";
import { useLocation } from "react-router-dom";
import {CloseStatusCard} from "../../molecules"
import { PageHeader, LoadingComponent } from '../../atoms';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from "axios"
import {getUserAuth, getAccessToken} from '../../auth'
import { 
    Container,
    Box
} from "@mui/material";

const StudentRecordC =()=>{
    const { state } = useLocation();
    const [userId, setUserId] = useState()

    const yearLevels = ["Freshman", "Sophomore", "Junior", "Senior"]
    const degreeList ={
        "BEED":"Bachelor of Elementary Education",
        "BECED":"Bachelor of Early Childhood Education",
        "BSAB":"Bachelor of Science in Agribusiness",
        "BSED":"Bachelor of Secondary Education",
        "BTVTED":"Bachelor of Technical Vocational Teacher Education"
    }
    const degreeCodeList = Object.keys(degreeList)
    const [sectList, setSectList] = useState([])
    const [classList, setClassList] = useState([])
    // const degreeDescList=Object.values(degreeList)

    const [yearLevelVal, setYearLevelVal] = useState("");
    const [degProgVal, setDegProgVal] = useState("")
    const [sectVal, setSectVal] = useState("")
   
    const [loading, setLoading] = useState(false)

    const handleYearLevel = (event) => {
        setYearLevelVal(event.target.value)
        setDegProgVal("")
        setSectVal("")
    }

    const handleDegProg = (event) =>{
        setDegProgVal(event.target.value)
        setSectVal("")
        
        axios.post("https://elicom-server-5013ed31e994.herokuapp.com/clearanceSign/section-list",{yearLevel: yearLevelVal, degreeCode: event.target.value})
        .then(function(response){
            setSectList(response.data)
        })
        .catch(function(error){
            console.log(error)
        })
        
    }

    const handleSectVal = (type) => (event)  =>{
        // click event trigger
        if(type === 1){
            setSectVal(event.target.value)

            if(event.target.value){
                axios.post("https://elicom-server-5013ed31e994.herokuapp.com/clearanceSign/class-list",{SectionListId : event.target.value, ClearanceSignAccountId: userId})
                .then(function(response){
                    setClassList(response.data)
                    setLoading(false)
                })
                .catch(function(error){
                    console.log(error)
                })
            }
        // refresh component
        }else{
            axios.post("https://elicom-server-5013ed31e994.herokuapp.com/clearanceSign/class-list",{SectionListId : sectVal, ClearanceSignAccountId: userId})
            .then(function(response){
                setClassList(response.data)
                console.log(response.data)
                setLoading(false)
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }

    useEffect(()=>{
        const getData = async () => {
            const accesstoken = await getAccessToken()

            if (accesstoken) {
                const data = await getUserAuth(accesstoken)
                setUserId(data.id)
            }
        }
        getData()
    }, [])


    return(
        <div>
            <Navbar/>
            <PageHeader title={"Student Record"}/>
            {
                (state.transactionStatus) ? 
                    <div>
                        <Box style={{boxShadow: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            padding: '10px',
                        }} >

                        <Box sx={{justifyContent: 'center',  display: 'flex', flexDirection: 'row'}}>
                        <Container style={{width:"1200px", position: 'absolute'}}>
                        <Select
                            required
                            value={yearLevelVal}
                            onChange={handleYearLevel}
                            displayEmpty
                            renderValue={yearLevelVal !== "" ? undefined : () => "Year Level"}
                            size='small'
                            style={{
                                borderRadius:"10px",
                                width: 250, 
                                height: 35,
                                position: 'relative',
                                left: 400,
                                marginRight: 5
                            }}
                            >
                            <MenuItem value={yearLevelVal}></MenuItem>
                            {
                                (yearLevels).map((level, index) => (
                                    <MenuItem key={index} value={level}>{level}</MenuItem>
                                ))
                            }
                        </Select>

                        <Select
                            required
                            disabled ={yearLevelVal==="" ? true : false}
                            value={degProgVal}
                            onChange={handleDegProg}
                            displayEmpty
                            renderValue={degProgVal !== "" ? undefined : () => "Degree Program"}
                            size='small'
                            style={{
                                borderRadius:"10px",
                                width: 250, 
                                height: 35,
                                position: 'relative',
                                left: 400,
                                marginRight: 5
                            }}
                            >
                            <MenuItem value={degProgVal}></MenuItem>
                            {
                                (degreeCodeList).map((degCode, index) => (
                                    <MenuItem key={index} value={degCode}>{degCode}</MenuItem>
                                ))
                            }
                        </Select>

                        <Select
                            required
                            disabled ={degProgVal==="" ? true : false}
                            value={sectVal}
                            onChange={handleSectVal(1)}
                            displayEmpty
                            renderValue={sectVal !== "" ? undefined : () => "Section"}
                            size='small'
                            style={{
                                borderRadius:"10px",
                                width: 250, 
                                height: 35,
                                position: 'relative',
                                left: 400,
                                marginRight: 5
                            }}
                            >
                            <MenuItem value={sectVal}></MenuItem>
                            {   
                                (sectList.length === 0) ?
                                    <MenuItem value={false} >No Section</MenuItem>
                                :
                                (sectList).map((section, index) => (
                                    <MenuItem key={index} value={section.id}>{section.sectionCode}</MenuItem>
                                ))
                            }
                        </Select>
                        </Container>
                        </Box>

                        { (loading) ?
                            <LoadingComponent/>
                            :
                            <ClearanceSignClassList 
                                data={classList} 
                                ClearanceSignAccountId={userId} 
                                handleSectVal={handleSectVal()}
                                setLoading={setLoading}
                                />
                        }
                        
                        </Box>

                    </div>
                :
                    <CloseStatusCard title={"Transaction is Close"} />
            }
        </div>
    )
}

export default StudentRecordC