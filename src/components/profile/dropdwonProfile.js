import React, { useEffect, useState } from "react";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { GetStudentProfile, GetStudentProfileDetails, Logout as LogoutAPI } from "../../api";
import SuccessAlert from "../../functions/Alert/SuccessAlert";
import { useRouter } from "next/router";

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RestoreIcon from '@mui/icons-material/Restore';



const DropDownProfile = ({setisUserLoading, setCURRENTUSER , setOpenProfile}) => {


  const router = useRouter()

  const [first_Name, setfirst_Name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [email, setemail] = useState("")
  const [headline, setheadline] = useState("")
  const [biography, setbiography] = useState("")
  const [website, setwebsite] = useState("")
  const [twitter, settwitter] = useState("")
  const [facebook, setfacebook] = useState("")
  const [linkedin, setlinkedin] = useState("")
  const [youtube, setyoutube] = useState("")
  const [profile_img, setprofile_img] = useState("")
  const [uploadImage, setuploadImage] = useState("")
  

  const handleLogout = () =>{
    setisUserLoading(true)
    setOpenProfile(false)
    LogoutAPI(setCURRENTUSER)
    SuccessAlert("Success","Logout Success")

    setTimeout(() => {
      setisUserLoading(false)
  }, 1500);

  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    GetStudentProfile(setfirst_Name,
        setlast_name,
        setemail,
        setheadline,
        setbiography,
        setwebsite,
        settwitter,
        setfacebook,
        setlinkedin,
        setyoutube,
        setprofile_img)
}, [])

  return (
    <React.Fragment>
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="medium"
          // sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {first_Name == null || last_name == null ? (
              <Avatar alt={`${first_Name} ${last_name}`} src="/static/images/avatar/1.jpg" /> 
          ) : (
          <Avatar alt={`${first_Name} ${last_name}`} src="/static/images/avatar/1.jpg" > 
          {first_Name[0]} {last_name[0]}
          </Avatar>
          )}
        </IconButton>
      </Tooltip>
    </Box>
    <Menu
      className="p-3"
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {/* <a href="/profile"> */}
        <MenuItem onClick={() => window.location.href = "/profile"}>

          {first_Name == null || last_name == null ? (
              <Avatar alt={`${first_Name} ${last_name}`} src="/static/images/avatar/1.jpg" /> 
          ) : (
          <Avatar alt={`${first_Name} ${last_name}`} src="/static/images/avatar/1.jpg" > 
          {first_Name[0]} {last_name[0]}
          </Avatar>
          )}
          

       {first_Name == null || first_Name == ""  ? "My" : first_Name} {last_name == null || last_name =="" ? "Profile" : last_name}

        <br />
        {email}
        </MenuItem>
      {/* </a> */}

      <Divider />

      <MenuItem onClick={() => window.location.href = "/my-courses"}>
        <ListItemIcon>
          <LibraryBooksIcon fontSize="small" />
        </ListItemIcon>
        My Courses
      </MenuItem>

      <MenuItem onClick={() => window.location.href = "/cart"}>
        <ListItemIcon>
          <ShoppingCartIcon fontSize="small" />
        </ListItemIcon>
        My Cart
      </MenuItem>

      <MenuItem onClick={() => window.location.href = "https://instructor.aethenos.com"}>
        <ListItemIcon>
          <PeopleIcon fontSize="small" />
        </ListItemIcon>
        Switch to Instructor
      </MenuItem>

      <Divider />

      <MenuItem>
        <ListItemIcon>
          <NotificationsIcon fontSize="small" />
        </ListItemIcon>
        Notifications
      </MenuItem>

      <MenuItem onClick={() => window.location.href = "/messages"}>
        <ListItemIcon>
          <MessageIcon fontSize="small" />
        </ListItemIcon>
        Messages
      </MenuItem>

      <Divider />

      <MenuItem>
        <ListItemIcon>
          <RestoreIcon fontSize="small" />
        </ListItemIcon>
        Purchase History
      </MenuItem>

      <MenuItem onClick={() => window.location.href = "/profile"}>
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>

    </Menu>
  </React.Fragment>
  );
};

export default DropDownProfile;
