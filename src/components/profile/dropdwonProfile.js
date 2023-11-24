import React from "react";
const DropDownProfile = () => {


  return (
    <div className="submenu-wrapper">
      <div className="submenu">
        <div className="user-info">
          <img src="/assets/images/user.png" alt="user" />
          <h3>GIMNA KATUGAMPALA</h3>
        </div>
        <hr/>
        <a href="/viewprofile" className="submenu-link">
        <img src="/assets/images/icons/user.png" alt="user" />
        <p>My Profile</p>
        </a>
        <a href="/eidtprofile" className="submenu-link">
        <img src="/assets/images/icons/edit.png" alt="user" />
        <p>Edit Profile</p>
        </a>
        <a href="#" className="submenu-link">
        <img src="/assets/images/icons/envelope.png" alt="user" />
        <p>Messages</p>
        </a>
        <hr/>
        <a href="#" className="submenu-link">
        <img src="/assets/images/icons/settings.png" alt="user" />
        <p>Setting</p>
        </a>
        <a href="#" className="submenu-link">
        <img src="/assets/images/icons/question.png" alt="user" />
        <p>Helps</p>
        </a>
        <a href="#" className="submenu-link">
        <img src="/assets/images/icons/night.png" alt="user" />
        <p>Edit Profile</p>
        </a>
        <a href="#" className="submenu-link">
        <img src="/assets/images/icons/log-out.png" alt="user" />
        <p>Log out</p>
        </a>
        
      </div>
    </div>
  );
};

export default DropDownProfile;
