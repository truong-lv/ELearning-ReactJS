import * as React from 'react';
import Tab from '@mui/material/Tab';
import SvgIcon from '@mui/material/SvgIcon';
import { NavLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import './navbar.css'

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
export default function Navbar() {

  return (
    <div className="navbar-container">
      <Container maxWidth="lg" style={{ display: 'flex' }}>
        <NavLink className="navLink" to='/home' activeclassname="active">
          <Tab icon={<HomeIcon color="#ffff" />} iconPosition="start" label="TRANG CHỦ" />
        </NavLink>
        <NavLink className="navLink" to='/course'>
          <Tab label="KHÓA HỌC" />
        </NavLink>
        <NavLink className="navLink" to='/schedule'>
          <Tab label="TKB" />
        </NavLink>
        <NavLink className="navLink" to='/infor'>
          <Tab label="TRANG CÁ NHÂN" />
        </NavLink>
      </Container>
    </div>
  );
}
