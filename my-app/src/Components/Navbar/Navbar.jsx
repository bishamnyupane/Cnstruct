import React,{useState} from "react";
import {BsCart2} from "react-icons/bs";
import {HiOutlineBars3} from "react-icons/hi2";
import {Box,Drawer,Divider,ListItem,ListItemButton,ListItemIcon,ListItemText,List,} from "@mui/material";
import './Navbar.css'
import logo_light from '../../assets/logo-black.png'
import search_icon_light from '../../assets/se.png'
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

const Navbar = () => {

    const [openMenu,setOpenMenu]=useState(false);
    const menuOptions = [
      {
        text: "Home",
      },

      {
        text: "Shop",
      },
      {
        text: "About",
      },

      {
        text: "cart",
        icon:<ShoppingCartRoundedIcon/>
      },

      
    ];

    
  return (
  <nav>
      <div className="navbar-logo-container">
        <img src={logo_light} alt="" />
      </div>
      <div className="navbar-links-container">
        <a href="">Home</a>
        <a href="">shop</a>
        <a href="">About</a>
        <a href="">
          <BsCart2 className="navbar-cart-icon" />
        </a>

        <div className="search-box">
      <input type="text" placeholder='Search'/>
      <img src={search_icon_light} alt="" />
    </div>

        <button className="btn">Login</button>
        <button className="btn">Register</button>
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
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>



    </nav>
  )
}

export default Navbar