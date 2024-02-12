import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Button from '@mui/material/Button';

import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import { MessageBox } from 'react-chat-elements'
import CardContainer from "../../contexts/CardContainer";
import 'react-chat-elements/dist/main.css'

function Messages() {
  const initialMessages = {
    User1: [
      {
        sender: "User1",
        text: "Hello!",
      },
      {
        sender: "You",
        text: "Hi, how are you?",
      },
      {
        sender: "User1",
        text: "I am good, thanks!",
      },
    ],
    User2: [
      {
        sender: "User2",
        text: "Hey there!",
      },
      {
        sender: "You",
        text: "Hello!",
      },
    ],
    User3: [
      {
        sender: "User3",
        text: "Hi!",
      },
    ],
  };

  const [selectedUser, setSelectedUser] = useState("User1");
  const [messages, setMessages] = useState(initialMessages[selectedUser]);
  const [messageText, setMessageText] = useState("");
  const [userFilter, setUserFilter] = useState("");

  const handleMessageSend = () => {
    if (messageText.trim() === "") return;

    const newMessage = {
      text: messageText,
      sender: "You",
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages(initialMessages[user]);
  };

  const filteredUsers = Object.keys(initialMessages).filter((user) =>
    user.toLowerCase().includes(userFilter.toLowerCase())
  );
  

  return (
    <div>
       <div className="container-fluid"  >
      <div className=" col-11 m-lg-auto  ">
          
        <div className="row">
             <Typography className="mt-5" variant="h4" gutterBottom>
             Messages
            </Typography>
        </div>
        

        <Card className="p-3">
          <Container fluid>
            <Row  className="vh-130">

              <Col sm={5} md={5} lg={4} className="bg-light border-right">

                <Typography className="p-3" variant="h5" gutterBottom>
                 Chat Users
               </Typography>

                {/* <h3 className="p-3">Chat Users</h3> */}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Chat Users"
                    aria-label="Search Chat Users"
                    onChange={(e) => setUserFilter(e.target.value)}
                    value={userFilter}
                  />
                  <Button variant="contained"><SearchIcon /></Button>
                </div>

                <List sx={{ width: '100%'}}>
                {filteredUsers.map((user) => (
                  <>
                      <ListItem onClick={() => handleUserClick(user)} key={user} alignItems="flex-start">
                        <ListItemButton selected={selectedUser === user ? true : false}>
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={user}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Ali Connors
                              </Typography>
                              {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                          }
                        />
                        </ListItemButton>
                      </ListItem>
                    <Divider variant="inset" component="li" /> 
                    </>
                ))}

                    </List>
              </Col>

              <Col sm={7} md={7} lg={8}>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                <Typography variant="h5" className="p-3" gutterBottom>
                Chat with <b>{selectedUser}</b>
               </Typography>

                </div>
                <Paper
                  elevation={3}
                  className="p-3"
                  style={{ minHeight: "70vh", overflowY: "auto",background:'#D5D8DC' }}
                >
                  <List>

                  <MessageBox
                  styles={{width:300,color:'#000',fontWeight:'bold'}}

                    onReplyMessageClick={() => console.log('reply clicked!')}
                    position={'left'}
                    type={'text'}
                    text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}
                  />
                  <MessageBox
                  styles={{width:300,color:'#000',fontWeight:'bold'}}

                    onReplyMessageClick={() => console.log('reply clicked!')}
                    position={'left'}
                    type={'text'}
                    text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}
                  />



                  <MessageBox
                  styles={{width:300,background:'#e01D20',color:'#fff',fontWeight:'bold'}}
                    onReplyMessageClick={() => console.log('reply clicked!')}
                    position={'right'}
                    type={'text'}
                    text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}
                  />
                  <MessageBox
                  styles={{width:300,background:'#e01D20',color:'#fff',fontWeight:'bold'}}
                    onReplyMessageClick={() => console.log('reply clicked!')}
                    position={'right'}
                    type={'text'}
                    text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}
                  />
                   
                   
                  </List>
                </Paper>

                
                <div className="input-group p-2">
                  <textarea placeholder="Type a Message" className="form-control" aria-label="With textarea"></textarea>
                    <Button variant="contained"><SendIcon /></Button>
                    
                </div>
  

              </Col>

            </Row>
           

          </Container>
        </Card>
        </div>
        </div>
     
      </div>

  );
}

export default Messages;
