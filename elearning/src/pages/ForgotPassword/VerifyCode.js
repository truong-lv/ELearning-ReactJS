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
import {VALUE_KEY, VERIFY_CODE} from '../../config'

function VerifyCode() {
    const [verifyCode, setVerifyCode] = useState('');
    const [loading, setLoading] = useState(false);

    const [isValid, setValid] = useState('none');
    const dispatch = useDispatch()
    let navigate = useNavigate();


    const handleChangeVerifyCode = (event) => {
        setVerifyCode(event.target.value);
    };
    const handleSunmit = () => {
        setLoading(true);

        const keyValue = sessionStorage.getItem(VALUE_KEY);
        var data = JSON.stringify({
            key: keyValue,
            codeValue: verifyCode
        });

        var config = {
            method: 'post',
            url: axios.defaults.baseURL + '/api/student/verify-code',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if(response.status===200){
                    const {valueKey,codeValue}=response.data;
                    console.log(valueKey+" - "+codeValue)
                    sessionStorage.setItem(VALUE_KEY, valueKey)
                    sessionStorage.setItem(VERIFY_CODE, codeValue)

                    navigate("/recover-password");
                    setLoading(false);
                }
                
            })
            .catch(function (error) {
                setValid('block')
                console.log({ error });
                setLoading(false);
            });
    }

   
    return (
        <div >
            <Banner />
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                <img src={background} alt="Login" style={{ width: '30%', height: 'auto' }} />
                <div style={{ border: '1px solid #CCCCCC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFFF' }}>
                    <Typography variant='h6' component='div' color="#000000">Xác thực email của bạn</Typography>
                    <Typography variant='p' component='div' color="#000000">Vui lòng nhập mã xác thực có 6 số đã gửi đến mail của bạn</Typography>
                    <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Mã xác thực</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-text"
                            type='text'
                            value={verifyCode} onChange={handleChangeVerifyCode}
                            label="Username"
                        />
                    </FormControl><br />

                    <strong style={{ color: "red", display: `${isValid}` }}>Mã xác thực không hợp lệ !!</strong><br />
                    <LoadingButton variant="contained"
                        size="large"
                        type="submit"
                        loading={loading}
                        onClick={handleSunmit}>
                        Xác thực
                    </LoadingButton>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default VerifyCode

