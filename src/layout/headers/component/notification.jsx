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
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} years ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    return `${Math.floor(seconds)} seconds ago`;
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
        <div className="wrapper" style={{ width: "550px" }}>
          <ul
            className={`items ${
              unreadNotifications.length > 4 ? "cart-height" : ""
            }`}
          >
            <li>
              <div className="row mb-3">
                <h6 className="title float-left m-2">
                  <i class="bi bi-bell mt-5" style={{ fontSize: "25px" }}></i>
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
              <li key={index} className="each-item" >
                <Card
                  onClick={() => {
                    handleClick();
                    updateNotificationsID(notification.notificationCode);
                  }}
                  style={{ border: "none", cursor: "pointer" }}
                >
                  <div className="content">
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
