import React, { useEffect } from "react";
import { Wrapper } from "../../layout";
import SEO from "../../components/seo";
import CardContainer from "../../contexts/CardContainer";
import { Footer, Header } from "../../layout";
import Table from "react-bootstrap/Table";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "react-bootstrap/Button";
import { GetNotifications, GetRefunds, PurchaseHistory } from "../../api";
import { useState } from "react";
import moment from "moment/moment";
import getSymbolFromCurrency from "currency-symbol-map";
import Modal from "react-bootstrap/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LargeLoading from "../../functions/Loading/LargeLoading";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Card } from "react-bootstrap";
import CalculateTimeAgo from "../../functions/CalculateTimeAgo";

const index = () => {
  const [notifications, setnotifications] = useState(null);

  useEffect(() => {
    GetNotifications(setnotifications);
  }, []);

  return (
    <Wrapper>
      <SEO pageTitle={"Notifications"} />
      <Header />

      <div className="edu-brand-area brand-area-1 p-5 ">
        <div className="container-fluid">
          <div className="row ">
            <div className="mb-4 ">
              <h3 className="title m-0">Notifications</h3>
            </div>

            {notifications == null ? (
              <LargeLoading />
            ) : (
              <div className="col-lg-12 p-3">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="courses"
                    role="tabpanel"
                    aria-labelledby="courses-tab"
                  >
                    <div className="course-tab-content">
                      <div className="course-overview">
                        {notifications != null && (
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                  <th></th>
                                <th>Notification</th>
                                <th>Time</th>
                               
                              </tr>
                            </thead>
                            <tbody>
                              {notifications.length > 0 ? (
                                notifications.map((notification, index) => (
                                  <tr key={index}>
                                    <td style={{ border: "none", textAlign: "center" }}>
                                      <NotificationsIcon />
                                    </td>
                                    <td>{notification.notification}</td>
                                    <td>
                                      {CalculateTimeAgo(notification.notificationTime)}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <p> No Notifications </p>
                              )}
                            </tbody>
                          </Table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </Wrapper>
  );
};

export default index;
