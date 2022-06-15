import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import {useState} from 'react'
// type: 0:success - 1:erorr - 2:warining
export default function AppToast({content,type,isOpen, callback}){
    const [openToast, setOpenToast] = useState(isOpen);
    return(
        <Snackbar 
        open={isOpen} 
        sx={{ width: '100%' }} spacing={2}
        anchorOrigin={{ vertical:'top', horizontal:'right' }} 
        autoHideDuration={2000} 
        onClose={callback}
        >
            <Alert severity={(type===0)?"success":"error"} action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={callback}
                >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            sx={{ mb: 2 }}>
                <AlertTitle>{(type===0)?"Thành công":"Thất bại"}</AlertTitle>
                {content}
            </Alert>
        </Snackbar>
    )
}