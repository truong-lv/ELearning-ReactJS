import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setInfor, setLogin } from '../../actions/action';
import Footer from '../../component/Footer/Footer';
import Banner from '../../component/Header/banner'
import background from '../../assets/image/background-login.png'

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography'
import {VALUE_KEY} from '../../config'

function VerifyForgotPassword() {
    const [userCode, setUserCode] = useState('');
    const [loading, setLoading] = useState(false);

    const [isValid, setValid] = useState('none');
    const [erorrMess, setErorrMess] = useState('');
    const dispatch = useDispatch()
    let navigate = useNavigate();


    const handleChangeUserCode = (event) => {
        setUserCode(event.target.value);
    };
    const handleSunmit = () => {
        setLoading(true);
        var config = {
            method: 'post',
            url: axios.defaults.baseURL + '/api/student/verify-forget-password?student-code='+userCode,
        };

        axios(config)
            .then(function (response) {
                if(response.status===200){
                    const {valueKey}=response.data
                    console.log(valueKey);
                    sessionStorage.setItem(VALUE_KEY, valueKey);
                    navigate("/verify-code");
                    setLoading(false);
                }
                
            })
            .catch(function (error) {
                if(error.response.status===400 || error.response.status===404){
                    setValid('block')
                    setErorrMess(error.response.data)
                    setLoading(false);

                }
            });
    }

   
    return (
        <div >
            <Banner />
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                <img src={background} alt="Login" style={{ width: '30%', height: 'auto' }} />
                <div style={{ border: '1px solid #CCCCCC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFFF',width: '40%',padding: '5px'}}>
                    <Typography variant='h6' component='div' color="#000000">Quên mật khẩu?</Typography>
                    <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Mã sinh viên</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-text"
                            type='text'
                            value={userCode} onChange={handleChangeUserCode}
                            label="Username"
                        />
                    </FormControl><br />

                    <strong style={{ color: "red", display: `${isValid}` }}>{erorrMess}</strong><br />
                    <LoadingButton variant="contained"
                        size="large"
                        type="submit"
                        loading={loading}
                        onClick={handleSunmit}>
                        Xác nhận
                    </LoadingButton>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default VerifyForgotPassword

