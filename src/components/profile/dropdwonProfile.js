import React from "react";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const DropDownProfile = () => {


  return (
    <div className="submenu-wrapper">
      <div className="submenu">
        <div className="user-info">
          <AccountCircleIcon className="m-2" />
          <h3>GIMNA KATUGAMPALA</h3>
        </div>
        <hr/>
        <a href="/viewprofile" className="submenu-link">
        <SwitchAccountIcon />
        <p>My Profile</p>
        </a>
        <a href="/eidtprofile" className="submenu-link">
        <ManageAccountsIcon />
        <p>Edit Profile</p>
        </a>
        <a href="#" className="submenu-link">
        <MessageIcon />
        <p>Messages</p>
        </a>
        <a href="#" className="submenu-link">
        <SettingsIcon />
        <p>Setting</p>
        </a>
        <a href="#" className="submenu-link">
        <LogoutIcon />
        <p>Log out</p>
        </a>
        
      </div>
    </div>
  );
};

export default DropDownProfile;
