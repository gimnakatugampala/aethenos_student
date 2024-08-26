import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { GetNotifications, updateNotifications } from "../../../api";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Button, Card } from "react-bootstrap";
import { notification } from "antd";

const Notification = () => {
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    GetNotifications(setNotifications);
  }, []);

 
  const calculateTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);
  
    const years = Math.floor(seconds / 31536000);
    const months = Math.floor((seconds % 31536000) / 2592000);
    const days = Math.floor((seconds % 2592000) / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    if (years > 0) return years === 1 ? 'A year ago' : `${years} years ago`;
    if (months > 0) return months === 1 ? 'A month ago' : `${months} months ago`;
    if (days > 0) return days === 1 ? 'A day ago' : `${days} days ago`;
    if (hours > 0) return hours === 1 ? 'An hour ago' : `${hours} hours ago`;
    if (minutes > 0) return minutes === 1 ? 'A minute ago' : `${minutes} minutes ago`;
    return 'just now';
  };
  const unreadNotifications = (notifications || []).filter(
    (notification) => !notification.isRead
  );

  const handleClick = () => {
    window.location.href = "/notifications";
  };

  const updateNotificationsID = (id) => {
    updateNotifications(id);
    GetNotifications(setNotifications);
  };
  return (
    <div className="edublink-header-mini-cart ">
      {unreadNotifications.length === 0 ? (
        <div className="wrapper">
          <h5 className="empty-cart">You have No New notifications</h5>
        </div>
      ) : (
        <div className="wrapper" style={{ maxWidth: "650px" , minWidth: "550px"}}>
          <ul
            className={`items ${
              unreadNotifications.length > 4 ? "cart-height" : ""
            }`}
          >
            <li>
              <div className="row mb-3">
                <h6 className="title float-left m-2">
                  <i class="bi bi-bell" style={{ fontSize: "25px" }}></i>
                  <span className="mx-3">
                    {" "}
                    You have{" "}
                    {
                      notifications.filter(
                        (notification) => !notification.isRead
                      ).length
                    }{" "}
                    New notifications
                  </span>
                  <Button className="edu-btn btn-small mx-1 float-end" onClick={handleClick}>
                    View All
                  </Button>
                </h6>
              </div>
            </li>

            {unreadNotifications.map((notification, index) => (
              <li key={index} className="each-item " style={{  }} >
                <Card
                className="wrapper pt-0"
                  onClick={() => {
                    handleClick();
                    updateNotificationsID(notification.notificationCode);
                  }}
                  style={{ border: "none", cursor: "pointer" ,width: "100%" , boxShadow: "none"}}
                >
                  <div className="content ">
                    <h6 className="title"> {notification.notification}</h6>

                    <p className="d-flex justify-content-end">
                      {calculateTimeAgo(notification.notificationTime)}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
