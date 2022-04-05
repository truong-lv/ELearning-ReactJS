import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClassIcon from '@mui/icons-material/Class';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Divider from '@mui/material/Divider';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminItems(){
  const indexItems={
    'credit-class-infor':0,
    'credit-class-member':1,
    'credit-class-post':2,
    'credit-class-file':3,
    'account':4
  }
  const navigate=useNavigate()
  const location = useLocation();
  const { pathname } = location;
  let pathSplit = pathname.split('/');
  let intialIndex =( pathSplit[2] === '') ? "credit-class-infor" :  pathSplit[2];
  const [selectedIndex, setSelectedIndex] = useState(indexItems[intialIndex]);

  const handleListItemClick = (event, index, name) => {
    setSelectedIndex(index);
    navigate(name)
  };
  return (
  <React.Fragment>
    <ListSubheader component="div" inset color='primary'>
      QUẢN LÝ LỚP TÍN CHỈ
    </ListSubheader>
    <ListItemButton 
    selected={selectedIndex === 0}
    onClick={(event) => handleListItemClick(event, 0,Object.keys(indexItems)[0])}>
      <ListItemIcon>
        <ClassIcon/>
      </ListItemIcon>
      <ListItemText primary="Thông tin lớp tín chỉ" />
    </ListItemButton>
    <ListItemButton
    selected={selectedIndex === 1}
    onClick={(event) => handleListItemClick(event, 1,Object.keys(indexItems)[1])}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Thành viên lớp" />
    </ListItemButton>
    <ListItemButton
    selected={selectedIndex === 2}
    onClick={(event) => handleListItemClick(event, 2,Object.keys(indexItems)[2])}>
      <ListItemIcon>
        <LocalPostOfficeIcon />
      </ListItemIcon>
      <ListItemText primary="Bài post" />
    </ListItemButton>
    <ListItemButton
    selected={selectedIndex === 3}
    onClick={(event) => handleListItemClick(event, 3,Object.keys(indexItems)[3])}>
      <ListItemIcon>
        <AttachFileIcon />
      </ListItemIcon>
      <ListItemText primary="File" />
    </ListItemButton>
    <Divider sx={{ my: 1 }} />
    <ListSubheader component="div" inset color='primary'>
      QUẢN LÝ NGƯỜI DÙNG
    </ListSubheader>
    <ListItemButton
    selected={selectedIndex === 4}
    onClick={(event) => handleListItemClick(event, 4,Object.keys(indexItems)[4])}>
      <ListItemIcon>
        <ManageAccountsIcon />
      </ListItemIcon>
      <ListItemText primary="Tài khoản" />
    </ListItemButton>
  </React.Fragment>
)}