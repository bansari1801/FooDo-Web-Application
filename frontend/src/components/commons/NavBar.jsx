// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLogout } from '../../config/state';
import { store } from '../../config/store';
import { tokens } from '../../Theme';

function NavBar() {
  const colors = tokens();

  const [value, setValue] = useState(0);

  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [restaurantId, setRestaurantId] = useState(null);
  const [role, setRole] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const state = store.getState();
    setRestaurantId(state.restaurant._id);
    setRole(state.restaurant.loginRole);

    // if(state.restaurant.loginRole === "Chef")
    if(location.pathname.startsWith('/order')) setValue(1)
    if(location.pathname.startsWith('/menu')) setValue(2)
    if(location.pathname.startsWith('/staff')) setValue(3)


    console.log(value);

  }, [restaurantId]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (url) => {
    setAnchorElNav(null);
    navigate(url);
  };

  const handleCloseUserMenu = (url) => {
    setValue(null);
    setAnchorElUser(null);
    if (url) {
      navigate(url);
    }
  };

  const changeTab = (url, value) => {
    setValue(value)
    navigate(url);

    console.log(value)
  };

  const tabVisibility = () => {
    if (role === 'Chef') {
      return 'none';
    }

    return 'block';
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={role === 'Chef' ? '/order' : '/'}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FOODO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key="dashboard" onClick={() => handleCloseNavMenu('/')}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem key="order" onClick={() => handleCloseNavMenu('/order')}>
                <Typography textAlign="center">Orders</Typography>
              </MenuItem>
              <MenuItem key="menu" onClick={() => handleCloseNavMenu('/menu')}>
                <Typography textAlign="center">Menu</Typography>
              </MenuItem>
              <MenuItem key="staff" onClick={() => handleCloseNavMenu('/staff')}>
                <Typography textAlign="center">Staff</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FOODO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tabs
              sx={{ marginRight: 'auto' }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: colors.black[500],
                },
              }}
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Box sx={{ display: tabVisibility }}>
                <Tab label="Dashboard" onClick={() => changeTab('/', 0)} />
              </Box>
              <Box>
              
              <Tab label="Orders" onClick={() => changeTab('/order', 1)} />
              </Box>
              

              <Box sx={{ display: tabVisibility }}>
                <Tab label="Menu" onClick={() => changeTab('/menu', 2)} />
              </Box>
              <Box sx={{ display: tabVisibility }}>
                <Tab label="Staff" onClick={() => changeTab('/staff', 3)} />
              </Box>
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="/user/profile" onClick={() => handleCloseUserMenu('/user/profile/' + restaurantId)} sx={{ display: tabVisibility }}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem
                key="logout"
                onClick={() => {
                  dispatch(setLogout());
                  handleCloseUserMenu('/login');
                }}
              >
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
