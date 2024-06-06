import React, {useState} from 'react'
import { 
    Box, 
    Typography,
    Modal,
    Button,
} from "@mui/material";
import Papa from "papaparse";

const AddUserByCSV = ({handleCloseCSV, submitCSV, userType}) =>{
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        borderRadius: '8px', 
        boxShadow: 24,
        p: 4,
        width: 400
      };

    const [file, setFile] = useState("");
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false)
    const allowedExtensions = ["csv"];
    const [customHeadersStudent, setCustomHeadersStudent] = useState(['firstName', 'lastName', 'studentNumber', 'email']);
    const [customHeadersStaff, setCustomHeadersStaff] = useState(['firstName', 'lastName', 'employeeNumber', 'email']);

    const handleFileChange = (e) => {
        setError("");
        setFile("")
        setIsError(false)
 
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
 
            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension =
                inputFile?.type.split("/")[1];
            if (
                !allowedExtensions.includes(fileExtension)
            ) {
                setError("Please input a csv file");
                setIsError(true)
                return;
            }
 
            // If input type is correct set the state
            console.log(inputFile.name)
            setFile(inputFile);
        }
    };

    const generatePassword = () => {
        let charset = "";
        let newPassword = "";
        const passwordLength=8;

        charset += "!@#$%^&*()";
        charset += "0123456789";
        charset += "abcdefghijklmnopqrstuvwxyz";
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < passwordLength; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        return newPassword
    };


    const addPassword = (data)=>{
        for (const d of data){
            const password = generatePassword()
            d["password"]=password
        }
        return data
    }

    const handleParse = () => {
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return alert("Enter a valid file");
 
        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();
 
        // Event listener on reader when the file
        // loads, we parse it and set the data. 
        reader.onload = async ({ target }) => {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    const originalHeaders = Object.keys(results.data[0]);
                    const mappedData = results.data.map(row => {
                        if(userType==="student"){
                            return customHeadersStudent.reduce((acc, customHeadersStudent, index) => {
                            acc[customHeadersStudent] = row[originalHeaders[index]];
                            return acc;
                            }, {});
                        }else if(userType==="staff"){
                            return customHeadersStaff.reduce((acc, customHeadersStaff, index) => {
                            acc[customHeadersStaff] = row[originalHeaders[index]];
                            return acc;
                            }, {});
                        }
                    });
                    const compData = addPassword(mappedData)
                    submitCSV(compData)
                },
              });
        };
        reader.readAsText(file);
    };


    return(
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex",}}> 
                        <Typography id="modal-modal-description" variant="body1" component="h1">
                            Upload CSV file that contains user information to add users by batch.
                        </Typography>
                    </Box>

                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"20px", flexDirection: 'column', }}>
                        <label htmlFor="file-input">
                            <input
                                id="file-input"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <Button variant="outlined" component="span" style={{marginBottom: 5, width:160}}>
                                Upload CSV File
                            </Button>
                        </label>
                        <Button variant="outlined" component="span" onClick={()=>handleParse()} style={{width:160}}>
                                Submit
                        </Button>
                    </Box>

                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"15px"}}>
                    {
                        (isError) ? 
                            <p className="error"> <i> {error} </i></p>
                            :
                            <p> <i> {file.name} </i></p>
                    }
                    </Box>

                    <Box sx={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"20px" }}>
                        
                        <Button 
                            style={{borderRadius:"15px", marginRight:"10px", backgroundColor: "#28588C"}}
                            variant="contained"
                            onClick={()=>handleCloseCSV()}  >
                            Cancel
                        </Button>
                    </Box>
            </Box>
        </Modal>
    )
}

export default AddUserByCSV;
