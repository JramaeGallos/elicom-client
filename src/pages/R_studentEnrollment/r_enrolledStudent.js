import React, {useState, useEffect} from 'react'
import { Navbar, TableStudentUserAcct} from "../../organisms";
import { PageHeader, LoadingComponent } from '../../atoms';
import axios from "axios"
import { useNavigate, useLocation } from 'react-router-dom';

const EnrolledStudentR =()=>{
    const navigate = useNavigate();
    const { state } = useLocation();
    const [listOfUser, setListOfUser] = useState([])

    const [loading, setLoading] = useState(true)

    const back = () =>{
        navigate('/student-enrollment', {state})
    }


    useEffect(()=>{
        axios.get("https://elicom-server-5013ed31e994.herokuapp.com/get-student/enrolled")
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
            <PageHeader title={"Enrolled Student Record"}/>

            { (loading) ?
                <LoadingComponent/>
                :
                <TableStudentUserAcct data={listOfUser} enrolled={true} back={back}/>
            }
        </div> 
    )
}

export default EnrolledStudentR