import {React} from 'react'
import {
    Snackbar,
    Alert
} from "@mui/material";

const SnackbarComp =({ handleCloseResponse, snackbarState, responseState, responseMessage}) =>{
    return(
        <Snackbar
            open={snackbarState}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleCloseResponse}
        >
            <Alert
            severity={(responseState) ? "success" : "error"}
            variant="filled"
            sx={{ width: '100%' }}
            >
            {responseMessage}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarComp;