import React, { useState, useEffect } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { HiOutlineBars3 } from 'react-icons/hi2';
import {
  Box,
  Drawer,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from '@mui/material';
import './Navbar.css';
import logo_light from '../../assets/logo-black.png';
import search_icon_light from '../../assets/se.png';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [openMenu, setOpenMenu] = useState(false);

  const [currentUser, setCurrentUser] = useState(undefined);
  
  const menuOptions = [
    {
      text: 'Home',
    },
    {
      text: 'About',
    },

    {
      text: 'Admin',
    },
    {
      text: 'Cart',
      icon: <ShoppingCartRoundedIcon />,
    },
    {
      text: 'Login',
      route: '/login',
    },
    {
      text: 'Signup',
      route: '/signup', 
    },

  ];

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("userObject"));
};

const logOut = () => {
  localStorage.removeItem("user");
  setCurrentUser(undefined);
};

useEffect(() => {
  const user = getCurrentUser();
  if(user){
    setCurrentUser(user);
  }
}, []);

  return (
    <nav>
      <div className="navbar-logo-container">
        <Link to="/home">
        <img src={logo_light} alt="" />
        </Link>
      </div>
      <div className="navbar-links-container">
        <Link to="/Home">Home</Link>
        {/* <Link to="/shop">Shop</Link> */}
        <Link to="/about">About</Link>
        <Link to="/Admin">Admin</Link>

        <Link to="/Cart">
          <BsCart2 className="navbar-cart-icon" />Cart
        </Link>

       
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <img src={search_icon_light} alt="Search" />
        </div>

        {currentUser ? (
          <>
          <Link className="btn userNavEmail">
            {currentUser.user.email}
          </Link>
          <Link to="/login" className="btn" onClick={logOut}>Logout</Link>
          </>
        ) : 
        (
          <>
        <Link to="/login" className="btn">
          Login
        </Link>
        <Link to="/signup" className="btn">
          Signup
        </Link>
        </>
        )
}
      </div>

      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>

      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 350 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
          {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                                <Link to={`/${item.text.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton>
                      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;