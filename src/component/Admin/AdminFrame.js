import {Fragment, useState,useEffect} from 'react';
import { styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdminItems from './AdminItems';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setInfor, setLogin } from '../../actions/action';
import AppAvatar from '../../myTool/handleAvatar';
import { useSelector} from 'react-redux'
import axios from 'axios';

export function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        SANG VŨ TRƯỜNG
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);



function AdminFrame() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState({})
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(true);
  const username=useSelector(state => state.infor.username||'')

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

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    dispatch(setInfor({}));
    dispatch(setLogin(false));
    navigate("/login");
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleGoInfor = () => {
    navigate("/infor");
  };
  const handleGoHome = () => {
    navigate("/home");
  };
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu sx={{top:'35px'}}
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
      <MenuItem onClick={handleGoInfor}><AccountCircle/> Profile</MenuItem>
      <MenuItem onClick={handleGoHome}><HomeWorkOutlinedIcon/> HomePage</MenuItem>
      <MenuItem onClick={handleLogout}><LogoutIcon/> Logout</MenuItem>
    </Menu>
  );
  return (
    <Fragment>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Elearning
            </Typography>
            <p style={{ lineHeight:'60px'}}>{username}</p>
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
          </Toolbar>
        </AppBar>
        
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <AdminItems/>
          </List>
        </Drawer>
        {renderMenu}
        </Fragment>
  );
}

export default AdminFrame
