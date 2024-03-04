import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

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
import { AddSendMessage, GetAllChatRoomMessages, GetAllChatRooms, GetAllInstructorsofThePurchaseMsg } from "../../api";
import ErrorAlert from "../../functions/Alert/ErrorAlert";

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
  const [showAddMessage, setshowAddMessage] = useState(true)
  const [messages, setMessages] = useState(initialMessages[selectedUser]);
  const [messageText, setMessageText] = useState("");
  const [userFilter, setUserFilter] = useState("");

  const [instructors, setinstructors] = useState([])
  const [selectedInstructor, setselectedInstructor] = useState("")
  const [selectedInstructorCode, setselectedInstructorCode] = useState("")
  const [selectedCourse, setselectedCourse] = useState("")
  const [messageTextAdd, setmessageTextAdd] = useState("")

  const [roomMessages, setroomMessages] = useState([])

  const [selectedChatCode, setselectedChatCode] = useState("")
  const [selectedCourseTitleName, setselectedCourseTitleName] = useState("")
  const [chatRooms, setchatRooms] = useState([])




  const handleUserClick = (user) => {
    setSelectedUser(user.instructor);
    // setMessages(initialMessages[user]);
    console.log(user)
    setselectedCourseTitleName(user.courseTitle)
    setselectedCourse(user.courseCode)
    setselectedChatCode(user.chatRoomCode)
    setselectedInstructor(user.instructor)
    setselectedInstructorCode(user.instructorUserCode)
    GetAllChatRoomMessages(user.chatRoomCode,setroomMessages)
  };

  

  useEffect(() => {
    GetAllInstructorsofThePurchaseMsg(setinstructors)
    GetAllChatRooms(setchatRooms)
  }, [])

  useEffect(() => {
    console.log(selectedChatCode)
    GetAllChatRoomMessages(selectedChatCode,setroomMessages)
  }, [chatRooms,selectedChatCode])
  


  // Compose Message
  const handleComposeMessage = (e) =>{
    e.preventDefault();
    console.log(selectedInstructor)
    console.log(messageTextAdd)
    console.log(messageTextAdd)

    if(selectedInstructor == ""){
      ErrorAlert("Empty Field","Please Select Instructor")
      return
    }

    if(messageTextAdd == ""){
      ErrorAlert("Empty Field","Please Enter Message")
      return
    }

    AddSendMessage(selectedInstructor,messageTextAdd,selectedCourse,setmessageTextAdd,GetAllChatRooms,setchatRooms)
    
  }


  // Send Message
  const handleSelectedMessageSend = (e) =>{
    e.preventDefault();

    if(selectedInstructor == ""){
      ErrorAlert("Empty Field","Please Select Instructor")
      return
    }

    if(messageTextAdd == ""){
      ErrorAlert("Empty Field","Please Enter Message")
      return
    }

    AddSendMessage(selectedInstructorCode,messageTextAdd,selectedCourse,setmessageTextAdd,GetAllChatRooms,setchatRooms)
   
  }
  
  // Filter
  const filteredChatRooms = chatRooms.filter(user => {
    const searchText = userFilter.toLowerCase();
    return user.instructor.toLowerCase().includes(searchText) || user.courseTitle.toLowerCase().includes(searchText);
  });

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

                <Typography className="p-3 d-flex justify-content-between" variant="h5" gutterBottom>
                 Chat Users  <Button onClick={() => setshowAddMessage(true)} className="mx-1" variant="contained"><i className="fas fa-plus"></i></Button>
               </Typography>


             
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

                <List sx={{ width: '100%' }}>
                {filteredChatRooms.map((user, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      onClick={() => {
                        setshowAddMessage(false);
                        console.log(user);
                        handleUserClick(user)
                      }}
                      alignItems="flex-start"
                    >
                      <ListItemButton selected={selectedUser == user.instructor ? true : false}>
                        <ListItemAvatar>
                          <Avatar alt={user.instructor} src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                <b>{user.instructor}</b> ({user.courseTitle})
                              </Typography>
                              {user.lastMessage.length > 15 ? (
                                <span>{user.lastMessage.substring(0, 15)}...</span>
                              ) : (
                                user.lastMessage
                              )}
                            </React.Fragment>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>

              </Col>

         
    
              {/* New Messages */}
              {showAddMessage ? (
              <Col sm={7} md={7} lg={8}>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                <Typography variant="h5" className="p-3" gutterBottom>
                  New Messages
               </Typography>
                </div>

                <Paper
                  elevation={3}
                  className="p-3"
                  style={{ minHeight: "70vh", overflowY: "auto",background:'#D5D8DC' }}
                >

                <Form onSubmit={handleComposeMessage}>
                  <Form.Select onChange={(e) => {
                    console.log(e.target.value.split(':'))

                    setselectedInstructorCode(e.target.value.split(':')[0])
                    setselectedInstructor(e.target.value.split(':')[0])
                    setselectedCourse(e.target.value.split(':')[1])

                  }} className="my-3" size="md" aria-label="Default select example">
                    <option selected disabled value="">Select Instructor</option>
                    {instructors.length > 0 && instructors.map((instructor,index) => (
                      <option key={index} value={`${instructor.userCode}:${instructor.coursesDetails[0].courseCode}`}>{instructor.name} - {instructor.coursesDetails[0].courseName}</option>
                    ))}
                  </Form.Select>

                 
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label><b>Messages</b></Form.Label>
                  <Form.Control value={messageTextAdd} onChange={(e) => setmessageTextAdd(e.target.value)} as="textarea" rows={5} />
                </Form.Group>

                  <Button type="submit"  className="mx-1" variant="contained">Send</Button>

                  </Form>

                </Paper>

                
  

              </Col>
              ) : (
              <Col sm={7} md={7} lg={8}>
                  <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                  <Typography variant="h6" className="p-2" gutterBottom>
                  Chat with <b>{selectedUser} - {selectedCourseTitleName}</b>
                </Typography>

                  </div>

                 <Paper elevation={3} className="p-3" style={{ minHeight: "70vh", overflowY: "auto", background:'#D5D8DC' }}>
                    <List>
                      {roomMessages.map((message, index) => (
                        <MessageBox
                          key={index}
                          styles={{ width: 300, color: '#000', fontWeight: 'bold', background: message.from == selectedUser ? '#fff' : '#e01D20' }}
                          onReplyMessageClick={() => console.log('reply clicked!')}
                          position={message.from == selectedUser ? 'left' : 'right'}
                          type={'text'}
                          text={message.message}
                        />
                      ))}
                    </List>
                  </Paper>


                  
                  <form onSubmit={handleSelectedMessageSend} className="input-group p-2">
                    <textarea value={messageTextAdd} onChange={(e) => setmessageTextAdd(e.target.value)} placeholder="Type a Message" className="form-control" aria-label="With textarea"></textarea>
                      <Button type="submit" variant="contained"><SendIcon /></Button>
                  </form>
    

                </Col>
              )}

            </Row>
           

          </Container>
        </Card>
        </div>
        </div>
     
      </div>

  );
}

export default Messages;
