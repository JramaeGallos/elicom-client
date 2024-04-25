import React, {useState} from 'react'
import { PageHeader, LoadingComponent } from '../../atoms';
import { Navbar, SnackbarComp} from "../../organisms";
import {
    Button,
    Box,
    TextField, 
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Chip,
    IconButton,
    Typography
} from "@mui/material";
import { useLocation, useNavigate} from 'react-router-dom';
import axios from "axios"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const PreRegistrationForm = () =>{
    const { state } = useLocation();
    const navigate = useNavigate();

    const studentId = state.studentId
    const type = state.type
    const enrollmentStatus= state.enrollmentStatus

    const [values, setValues] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [errorDate, setErrorDate] = useState(false);
    const [errorSubject, setErrorSubject] = useState(false);

    const [snackbarState, setSnackbarState] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const [responseState, setResponseState] = useState(true)

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        sex: '',
        age: '',
        birthDate: '',
        birthPlace: '',
        contactNumber: '',
        civilStatus: '',
        course: '',
        specialization: '',
        temporaryAddress: '',
        permanentAddress: '',
        lrn:'',
        motherName: '',
        motherOccupation: '',
        fatherName: '',
        fatherOccupation: '',
        annualIncome: '',
        guardianName: '',
        guardianRelationship:'',
        guardianAddress: '',
        guardianContact: '',
        subjects: '',
        yearLevel: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if(name === "birthDate"){
            const inputDate = value;
            const currentDate = new Date().toISOString().slice(0, 10);

            if (inputDate <= currentDate) {
                setFormData({
                    ...formData,
                    [name]: value,
                });
                setErrorDate(false);
            } else {
                setErrorDate(true);
            }
        }else{
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // for snackbar modal
    const handleCloseResponse = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarState(false);
      };

    // for multiple valued textfield - subjects textfield
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleInputKeyDown = () => {
        if (inputValue) {
            setValues([...values, inputValue]);

            formData.subjects = formData.subjects + inputValue + "$"
            setInputValue('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.subjects === ''){
            setErrorSubject(true)
        }else{
            setErrorSubject(false)
            setLoading(true)
            const data = {...formData, id:studentId}

            axios.post("https://elicom-server-5013ed31e994.herokuapp.com/update/preregister",data)
            .then(function(response){

                setLoading(false)
                if(response.data === "SUCCESS"){
                    if(type==="registrar"){
                        navigate('/student-enrollment', {
                            state:{
                                enrollmentStatus: enrollmentStatus
                            }
                        })  
                    }else{
                        navigate('/enrollment', {
                            state:{
                                enrollmentStatus: state.enrollmentStatus
                            }
                        })  
                    }
                }else{
                    setResponseMessage("There is an error in submitting the form. Refresh the page and try again. Make sure that all the fields are complete before submitting.")
                    setResponseState(false)
                    setSnackbarState(true)
                }             
            })  
            .catch(function(error){
                console.log(error)
                setResponseMessage("There is an error in submitting the form. Refresh the page and try again. Make sure that all the fields are complete before submitting.")
                setResponseState(false)
                setSnackbarState(true)
            })
        }
    };


    const back = () =>{
        if(type==="registrar"){
            navigate('/student-enrollment', {
                state:{
                    enrollmentStatus: enrollmentStatus
                }
            })  
        }else{
            navigate('/enrollment', {
                state:{
                    enrollmentStatus: state.enrollmentStatus
                }
            })  
        }
    }



    return(
        <div>
            <Navbar/>
            <PageHeader title={"Pre-Registration Form"}/>
            <Typography> 
                <b>Note:</b>
                Make sure all the fields are cleared before submitting. In case you encounter an error in submitting the form. 
                Refresh the page and try again.
            </Typography>

            {(loading) ?
                <LoadingComponent/>
            :
                <>        
                <br></br>
                <form onSubmit={handleSubmit}>
                <Grid container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                <Grid item xs={12} sm={6} style={{marginLeft: 20, marginRight: 20}}>
                    <InputLabel id="select-label" > <b> Student Information </b></InputLabel>
                    <TextField
                        fullWidth
                        required
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        margin="dense"
                        size='small'
                    />
                    <TextField
                        fullWidth
                        required
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        margin="dense"
                        size='small'
                    />
                    <TextField
                        fullWidth
                        required
                        label="Middle Name"
                        variant="outlined"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        margin="dense"
                        size='small'
                    />
                    <Select
                        size='small'
                        required
                        style={{marginTop: "5px"}}
                        fullWidth
                        labelId="select-label"
                        id="select"
                        name='sex'
                        margin="dense"
                        value={formData.sex}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={formData.sex !== "" ? undefined : () => <h6 style={{ color: '#6D6262' }}>Sex</h6>}
                        >
                        <MenuItem value={formData.sex}></MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Male"}>Male</MenuItem>
                    </Select>
                    <TextField
                        size='small'
                        required
                        type='number'
                        margin="dense"
                        name= "age"
                        label="Age"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                <TextField
                        fullWidth
                        required
                        margin="dense"
                        size='small'
                        id="date"
                        label="Birthdate"
                        type="date"
                        name='birthDate'
                        value={formData.birthDate}
                        onChange={handleChange}
                        error={errorDate}
                        helperText={errorDate ? "Date should be before the current date" : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        required
                        label="Place of Birth"
                        variant="outlined"
                        name="birthPlace"
                        value={formData.birthPlace}
                        onChange={handleChange}
                        margin="dense"
                        size='small'
                    />
                    <TextField
                        size='small'
                        required
                        type="tel"
                        margin="dense"
                        value={formData.contactNumber}
                        name= "contactNumber"
                        label="Contact Number"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                    <Select
                        size='small'
                        required
                        fullWidth
                        name='civilStatus'
                        margin="dense"
                        value={formData.civilStatus}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={formData.civilStatus !== "" ? undefined : () =>  <h6 style={{ color: '#6D6262' }}>Civil Status</h6>}
                        style={{marginTop: "5px"}}
                        >
                        <MenuItem value={formData.civilStatus}></MenuItem>
                        <MenuItem value={"Single"}>Single</MenuItem>
                        <MenuItem value={"Married"}>Married</MenuItem>
                    </Select>

                    <InputLabel id="select-label" >Temporary Address</InputLabel>
                    <TextField
                        fullWidth
                        required
                        label='Purok / Barangay / Municipality / Province / Zip Code'
                        margin='dense'
                        size='small'
                        value={formData.temporaryAddress}
                        name= "temporaryAddress"
                        onChange={handleChange}
                    />
                    <InputLabel id="select-label">Permanent Address</InputLabel>
                    <TextField
                        fullWidth
                        required
                        label='Purok / Barangay / Municipality / Province / Zip Code'
                        margin='dense'
                        size='small'
                        value={formData.permanentAddress}
                        name= "permanentAddress"
                        onChange={handleChange}
                    />
                    <br></br>
                    <InputLabel id="select-label"  style={{marginTop: "15px"}}> <b> Academic Information </b></InputLabel>
                    <TextField
                        size='small'
                        required
                        type='number'
                        margin="dense"
                        name= "lrn"
                        label="LRN"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                    <Select
                        size='small'
                        required
                        fullWidth
                        name='yearLevel'
                        margin="dense"
                        value={formData.yearLevel}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={formData.yearLevel !== "" ? undefined : () =>  <h6 style={{ color: '#6D6262' }}>Year Level</h6>}
                        style={{marginTop: "5px"}}
                        >
                        <MenuItem value={formData.yearLevel}></MenuItem>
                        <MenuItem value={"Freshman"}>Freshman</MenuItem>
                        <MenuItem value={"Sophomore"}>Sophomore</MenuItem>
                        <MenuItem value={"Junior"}>Junior</MenuItem>
                        <MenuItem value={"Senior"}>Senior</MenuItem>
                    </Select>
                    <Select
                        size='small'
                        required
                        fullWidth
                        name='course'
                        margin="dense"
                        value={formData.course}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={formData.course !== "" ? undefined : () =>  <h6 style={{ color: '#6D6262' }}>Course</h6>}
                        style={{marginTop: "5px"}}
                        >
                        <MenuItem value={formData.course}></MenuItem>
                        <MenuItem value={"BEED"}>Bachelor of Elementary Education</MenuItem>
                        <MenuItem value={"BECED"}>Bachelor of Early Childhood Education</MenuItem>
                        <MenuItem value={"BSAB"}>Bachelor of Science in Agribusiness</MenuItem>
                        <MenuItem value={"BSED"}>Bachelor of Secondary Education</MenuItem>
                        <MenuItem value={"BTVTED"}>Bachelor of Technical Vocational Teacher Education</MenuItem>
                    </Select>
                    {(formData.course === "BSED") &&
                        <Select
                        size='small'
                        required
                        fullWidth
                        name='specialization'
                        margin="dense"
                        value={formData.specialization}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={formData.specialization !== "" ? undefined : () =>  <h6 style={{ color: '#6D6262' }}>Specialization</h6>}
                        style={{marginTop: "5px"}}
                        >
                        <MenuItem value={formData.specialization}></MenuItem>
                        <MenuItem value={"BSED English"}>BSED English</MenuItem>
                        <MenuItem value={"BSED Filipino"}>BSED Filipino</MenuItem>
                        <MenuItem value={"BSED Math"}>BSED Math</MenuItem>
                        <MenuItem value={"BSED Science"}>BSED Science</MenuItem>
                        <MenuItem value={"BSED Social Education"}>BSED Social Education</MenuItem>
                        <MenuItem value={"BSED Values Education"}>BSED Values Education</MenuItem>
                        </Select>
                    }

                    {(formData.course === "BTVTED") &&
                        <Select
                        size='small'
                        required
                        fullWidth
                        name='specialization'
                        margin="dense"
                        value={formData.specialization}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={formData.specialization !== "" ? undefined : () =>  <h6 style={{ color: '#6D6262' }}>Specialization</h6>}
                        style={{marginTop: "5px"}}
                        >
                        <MenuItem value={formData.specialization}></MenuItem>
                        <MenuItem value={"BTVTED Automotive Technology"}>BTVTED Automotive Technology</MenuItem>
                        <MenuItem value={"BTVTED Electrical Technology"}>BTVTED Electrical Technology</MenuItem>
                        <MenuItem value={"BTVTED Food Service Management"}>BTVTED Food Service Management</MenuItem>
                        </Select>
                    }
                    
                    <Box>
                        {(values).map((value, index) => (
                            <Chip
                            key={index}
                            label={value}
                            style={{ margin: '4px' }}
                            />
                        ))} 
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start'
                        }} >
                            <TextField
                                size='small'
                                margin='dense'
                                label="Subjects to Take (Write the full description)*"
                                variant="outlined"
                                error={errorSubject}
                                helperText={errorSubject ? "This a required field" : ""}
                                value={inputValue}
                                onChange={handleInputChange}
                                style={{marginRight: 10}}
                                fullWidth
                                placeholder="Enter values then add"
                            />
                            <IconButton onClick={handleInputKeyDown}>
                            <AddCircleOutlineIcon />
                            </IconButton>
                        </Box>
                    </Box>
            
                    <InputLabel id="select-label" style={{marginTop: "15px"}}> <b> Mother's Name </b></InputLabel>
                    <TextField
                        fullWidth
                        required
                        label='First Name / Middle Name / Surname'
                        margin='dense'
                        size='small'
                        value={formData.motherName}
                        name= "motherName"
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        required
                        label='Occupation'
                        margin='dense'
                        size='small'
                        value={formData.motherOccupation}
                        name= "motherOccupation"
                        onChange={handleChange}
                    />
                    <InputLabel id="select-label" style={{marginTop: "15px"}}> <b> Father's Name </b></InputLabel>
                    <TextField
                        fullWidth
                        required
                        label='First Name / Middle Name / Surname'
                        margin='dense'
                        size='small'
                        value={formData.fatherName}
                        name= "fatherName"
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        required
                        label='Occupation'
                        margin='dense'
                        size='small'
                        value={formData.fatherOccupation}
                        name= "fatherOccupation"
                        onChange={handleChange}
                    />
                    <InputLabel id="select-label" style={{marginTop: "15px"}}> <b> Guardian Information </b></InputLabel>
                    <TextField
                        fullWidth
                        required
                        label='Name of Guardian'
                        margin='dense'
                        size='small'
                        value={formData.guardianName}
                        name= "guardianName"
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        required
                        label='Relationship'
                        margin='dense'
                        size='small'
                        value={formData.guardianRelationship}
                        name= "guardianRelationship"
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        required
                        label='Address'
                        margin='dense'
                        size='small'
                        value={formData.guardianAddress}
                        name= "guardianAddress"
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        required
                        type='number'
                        label='Guardian Contact Number'
                        margin='dense'
                        size='small'
                        value={formData.guardianContact}
                        name= "guardianContact"
                        onChange={handleChange}
                    />
                    <TextField
                        size='small'
                        required
                        type='number'
                        margin="dense"
                        name= "annualIncome"
                        label="Annual Gross Income of the Family"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                    <Box sx={{justifyContent: 'flex-start',  display: 'flex', flexDirection: 'row',
                         marginTop: "20px", marginBottom: "20px"}}>
                    <Button 
                        variant="contained" 
                        fullWidth
                        style = {{

                            backgroundColor: "#28588C",  
                            borderRadius:"10px",
                            marginRight: "5px"
                        }}
                        onClick={back}
                        >
                            Back
                    </Button>   

                    <Button  
                        style={{backgroundColor: "#28588C", borderRadius:"10px",}} 
                        type="submit" 
                        variant="contained" 
                        fullWidth>
                        Submit
                    </Button>
                    </Box>
           
                </Grid>
                </Grid>
                </form>
                <br></br>
                </>
            }
                        
            {(snackbarState) &&
                <SnackbarComp 
                handleCloseResponse={handleCloseResponse} 
                snackbarState={snackbarState} 
                responseState={responseState}
                responseMessage={responseMessage}
                />
            }
        </div>
    )
}

export default PreRegistrationForm