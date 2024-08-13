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
import { Card } from "react-bootstrap";

const index = () => {

    const [notifications, setnotifications] = useState(null)

    useEffect(() => {
        GetNotifications(setnotifications)
    }, [])
    

  return (
    <Wrapper>
    <SEO pageTitle={'Notifications'} />
    <Header />


      <div className="edu-brand-area brand-area-1 p-5 ">
        <div className="container-fluid">
          <div className="row mx-5">
            <div className="mb-4 ">
              <h3 className="title m-0">Notifications</h3>
            </div>

            {notifications == null ? (
              <LargeLoading />
            ) : (
              <List
                sx={{
                  width: "100%",

                  bgcolor: "bg-dark",
                }}
              >
                {notifications.length > 0
                  ? notifications.map((notification, index) => (
                      <>
                        <Card>
                          <ListItem
                            key={index}
                            className="mx-1"
                            alignItems="flex-start"
                          >
                            <ListItemText
                              primary={notification.notification}
                              secondary={
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  {moment(notification.notificationTime)
                                    .startOf("hour")
                                    .fromNow()}
                                </div>
                              }
                            />
                          </ListItem>
                        </Card>

                        <Divider variant="inset" component="li" />
                      </>
                    ))
                  : "No Notifications"}
              </List>
            )}
          </div>
        </div>
      </div>

    <Footer />
    </Wrapper>
  )
}

export default index