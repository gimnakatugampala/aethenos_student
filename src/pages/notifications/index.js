import React, { useEffect } from 'react'
import { Wrapper } from '../../layout'
import SEO from '../../components/seo'
import CardContainer from '../../contexts/CardContainer'
import { Footer, Header } from '../../layout';
import Table from 'react-bootstrap/Table';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from 'react-bootstrap/Button';
import { GetNotifications, GetRefunds, PurchaseHistory } from '../../api';
import { useState } from 'react';
import moment from 'moment/moment';
import getSymbolFromCurrency from 'currency-symbol-map';
import Modal from 'react-bootstrap/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LargeLoading from '../../functions/Loading/LargeLoading';



const index = () => {

    const [notifications, setnotifications] = useState(null)

    useEffect(() => {
        GetNotifications(setnotifications)
    }, [])
    

  return (
    <Wrapper>
    <SEO pageTitle={'Notifications'} />
    <Header />


    <div className="edu-brand-area brand-area-1 p-5 bg-lighten01">
            <div className="container-fluid">
                <div className="row">

                <div className='mb-4'>
                <h3 className="title m-0">Notifications</h3>
                </div>

                {notifications == null ? <LargeLoading /> : (

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {notifications.length > 0 ? notifications.map((notification,index) => (
                    <>
                    
                    <ListItem key={index} alignItems="flex-start">
                    
                        <ListItemText
                        primary={notification.notification}
                        secondary={
                            <React.Fragment>
                            {moment(notification.notificationTime).startOf('hour').fromNow()}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </>
                )) : "No Notifications"}
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