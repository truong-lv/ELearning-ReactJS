import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import { NavLink } from 'react-router-dom';
import './navbar.css'

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
export default function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs className="navbar-container"
      value={value}
      onChange={handleChange}
      aria-label="icon position tabs example"
    >
        <NavLink className="navLink" to='/home'>
            <Tab icon={<HomeIcon color="#ffff" />} iconPosition="start" label="TRANG CHỦ" style={{color:'#FFFFFF'}}/>
        </NavLink>
        <NavLink className="navLink" to='/coures'>
            <Tab label="KHÓA HỌC" style={{color:'#ffff'}}/>
        </NavLink>
        <NavLink className="navLink" to='/schedule'>
            <Tab label="TKB" style={{color:'#ffff'}}/>
        </NavLink>
        <NavLink className="navLink" to='/infor'>
            <Tab label="TRANG CÁ NHÂN" style={{color:'#ffff'}}/>
        </NavLink>
        <NavLink className="navLink" to='/home'>
            <Tab label="HƯỚNG DẪN" style={{color:'#ffff'}}/>
        </NavLink>
    </Tabs>
  );
}
