import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import './HeaderStyle.css';
import { useDispatch } from 'react-redux';
import { setInfor, setLogin } from '../../actions/action';
import AppAvatar from '../../myTool/handleAvatar';

import Banner from './banner'

import { useSelector } from 'react-redux'

export default function Header() {
  let navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [unseenNoti, setUnseenNoti] = useState(0)
  const username = useSelector(state => state.infor.username || '')
  const userRoles = useSelector(state => state.infor.roles || [])
  const [userInfo, setUserInfo] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
        axios.get('/api/user/get-user-info', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setUserInfo({ ...response.data })
            //console.log(response.data)

        }).catch(error => {

            console.log(error)
        })
  }, [])


  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    axios.get('/api/notification/unseen-notification', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setUnseenNoti(res.data)
    }).catch((err) => {
      handleLogout();
    })
  }, [])

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleGoInfor = () => {
    navigate("/infor");
  };

  const handleGoNotifi = () => {
    navigate("/notification")
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    dispatch(setInfor({}));
    dispatch(setLogin(false));
    navigate("/login");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu sx={{ top: '35px' }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleGoInfor}><AccountCircle /> Profile</MenuItem>
      <MenuItem onClick={handleLogout}><LogoutIcon /> Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      {userRoles.some(role => role === "ROLE_USER") && <MenuItem onClick={handleGoNotifi}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={unseenNoti} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>}
      <MenuItem onClick={handleGoInfor}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="lg">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >

              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {userRoles.some(role => role === "ROLE_USER") &&
                  <IconButton
                    onClick={handleGoNotifi}
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={unseenNoti} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>}

                <p style={{ lineHeight: '60px' }}>{username}</p>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AppAvatar url={userInfo.avatar}/>
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <Banner />
    </div>
  );
}
