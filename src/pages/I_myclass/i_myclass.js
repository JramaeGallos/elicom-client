import React, {useState, useEffect} from 'react'
import { Navbar, InstructorClassList} from "../../organisms";
import { useLocation } from "react-router-dom";
import {CloseStatusCard} from "../../molecules"
import { PageHeader, LoadingComponent } from '../../atoms';
import axios from "axios"
import {getUserAuth, getAccessToken} from '../../auth'
import MenuItem from '@mui/material/MenuItem';
import {Select, Box, Container} from '@mui/material';


const MyClassI =()=>{
    const { state } = useLocation();

    const [userId, setUserId] = useState()

    const [sectList, setSectList] = useState([])
    const [classList, setClassList] = useState([])
    const [sectionVal, setSectionVal] = useState("");

    const [loading, setLoading] = useState(true)

    const handleSectionVal = (type) => (event) => {
        // click event trigger
        if (type=== 1){
            setSectionVal(event.target.value)

            axios.post("https://elicom-server-5013ed31e994.herokuapp.com/instructor-section/class-list",
                {SectionListId: event.target.value, InstructorAccountId: userId})
                    .then(function(response){
                        setClassList(response.data)
                        setLoading(false)
                    })
                    .catch(function(error){
                        console.log(error)
                    })
        // refresh component
        }else{
            axios.post("https://elicom-server-5013ed31e994.herokuapp.com/instructor-section/class-list",
                {SectionListId: sectionVal, InstructorAccountId: userId})
                    .then(function(response){
                        setClassList(response.data)
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

                axios.post("https://elicom-server-5013ed31e994.herokuapp.com/instructor-section/section-list",{InstructorAccountId: data.id})
                .then(function(response){
                    setSectList(response.data)
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
            <PageHeader title={"My Class"}/>
            {
                (state.transactionStatus) ? 
                    <div>
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
                        <Container style={{width:"1200px", position: 'absolute'}}>
                        <Select
                            required
                            value={sectionVal}
                            onChange={handleSectionVal(1)}
                            displayEmpty
                            renderValue={sectionVal !== "" ? undefined : () => "Section List"}
                            size='small'
                            style={{
                                borderRadius:"10px",
                                width: 250, 
                                height: 35,
                                position: 'relative',
                                left: 900
                            }}
                            >
                            <MenuItem value={sectionVal}></MenuItem>
                            {
                                (sectList).map((section, index) => (
                                    <MenuItem key={index} value={section.id}>{section.sectionCode}</MenuItem>
                                ))
                            }
                        </Select>
                        </Container>
                        </Box>

                        <InstructorClassList 
                            data={classList} 
                            InstructorAccountId={userId} 
                            handleSectionVal={handleSectionVal()}
                            setLoading={setLoading}
                            />
                        </Box>
                    }
                    </div>
                     
                    
                :
                    <CloseStatusCard title={"Transaction is Close"}/>
            }
        </div>
    )
}

export default MyClassI
