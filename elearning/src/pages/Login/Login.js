import {useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setInfor, setLogin } from '../../actions/action';
import Footer from '../../component/Footer/Footer';

function Login(){
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const handleChangeAccount = (event) => {
        setAccount(event.target.value);
        // console.log(event.target.value)
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        // console.log(event.target.value)
    };
    const handleLogin=()=>{
        // console.log({account,password})
        var data = JSON.stringify({
            username: account,
            password: password
        });
        
        var config = {
            method: 'post',
            url: axios.defaults.baseURL+'/api/auth/signin',
            headers: { 
                'Content-Type': 'application/json'
        },
         data : data
        };

        axios(config)
        .then(function (response) {
            let {accessToken,...infor}=response.data
            dispatch(setInfor(infor));
            dispatch(setLogin(true));

            localStorage.setItem('accessToken',accessToken)
            navigate("/home");
        })
        .catch(function (error) {
            console.log(error);
        });        
    }
    return(
        <div style={{minHeight:'721px'}}>
            <div>
            <input type="text" value={account} onChange={handleChangeAccount}></input><br/> 
            <input type="password" value={password} onChange={handleChangePassword}></input><br/> 
            <button 
                type="submit"
                onClick={handleLogin}
            >Đăng nhập</button> 
            </div>
            <Footer/>
        </div>
    )
}

export default Login