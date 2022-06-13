import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';
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
import AppToast from '../../myTool/AppToast'

function RegisterUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [erorrMess, setErorrMess] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [isValid, setValid] = useState('none');
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const handleMouseDownPasswordConfirm = (event) => {
        event.preventDefault();
    };

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleChangePasswordConfirm = (event) => {
        setPasswordConfirm(event.target.value);
    };

    const handleSunmit = () => {
        setLoading(true);
        if(password!==passwordConfirm){
            setErorrMess('Nhập lại mật khẩu không chính xác !!')
            setLoading(false);
            setValid('block')
            return;
        }else if(password.length<6 || password.length>40){
            setErorrMess('Mật khẩu tối thiểu 6 ký tự và tối đa 40 ký tự !!')
            setLoading(false);
            setValid('block')
            return;
        }

        const keyValue = sessionStorage.getItem(VALUE_KEY);
        const verifyCode = sessionStorage.getItem(VERIFY_CODE);
        var data = JSON.stringify({
            username: username,
            password:password,
            role: ['student'],
            key: keyValue,
            codeValue: verifyCode
        });

        
        var config = {
            method: 'post',
            url: axios.defaults.baseURL + '/api/auth/signup',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if(response.status===200){
                    navigate("/login");
                    setLoading(false);
                    setOpenToast(true);
                    //clearn sessionStorage
                    sessionStorage.removeItem(VALUE_KEY);
                    sessionStorage.removeItem(VERIFY_CODE);
                }
                
            })
            .catch(function (error) {
                if(error.response.status===400 || error.response.status===404){
                    setValid('block')
                    setErorrMess(error.response.data.message)
                    setLoading(false);
                }
                console.log({error})
            });
    }

   
    return (
        <div >
            <Banner />
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                <img src={background} alt="Login" style={{ width: '30%', height: 'auto' }} />
                <div style={{ border: '1px solid #CCCCCC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFFF',width: '40%',padding: '5px' }}>
                    <Typography variant='h6' component='div' color="#000000">Cập nhập thông tin tài khoản</Typography>
                    <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Tài khoản</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type='text'
                            value={username} onChange={handleChangeUsername}
                            label="Tài khoản"
                        />
                    </FormControl><br />

                    <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password} onChange={handleChangePassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl><br />
                    <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password confirm</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={passwordConfirm} onChange={handleChangePasswordConfirm}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPasswordConfirm}
                                        onMouseDown={handleMouseDownPasswordConfirm}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password confirm"
                        />
                    </FormControl><br />

                    <strong style={{ color: "red", display: `${isValid}` }}>{erorrMess}</strong><br />
                    <LoadingButton variant="contained"
                        size="large"
                        type="submit"
                        style={{marginBottom:'8px'}}
                        loading={loading}
                        onClick={handleSunmit}>
                        Cập nhật mật khẩu
                    </LoadingButton>
                </div>
            </div>
            {/* SHOW TOAST THÔNG BÁO KẾT QUẢ */}
            <AppToast content={"Tạo tài khoản thành công"} type={0} isOpen={openToast} callback={() => {
                    setOpenToast(false);
                    }}/>
            <Footer />
        </div>
    )
}

export default RegisterUser

