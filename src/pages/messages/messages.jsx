import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useTheme } from 'next-themes';
import { Container, Row, Col } from "react-bootstrap";
import Button from "@mui/material/Button";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  ListItemButton,
} from "@mui/material";
import Card from "react-bootstrap/Card";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import {
  AddSendMessage,
  GetAllChatRoomMessages,
  GetAllChatRooms,
  GetAllInstructorsofThePurchaseMsg,
} from "../../api";
import ErrorAlert from "../../functions/Alert/ErrorAlert";

function Messages() {
  const [selectedUser, setSelectedUser] = useState("");
  const [showAddMessage, setShowAddMessage] = useState(true);
  const [messageTextAdd, setMessageTextAdd] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedInstructorCode, setSelectedInstructorCode] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [selectedChatCode, setSelectedChatCode] = useState("");
  const [selectedCourseTitleName, setSelectedCourseTitleName] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleUserClick = (user) => {
    setSelectedUser(user.instructor);
    setSelectedCourseTitleName(user.courseTitle);
    setSelectedCourse(user.courseCode);
    setSelectedChatCode(user.chatRoomCode);
    setSelectedInstructor(user.instructor);
    setSelectedInstructorCode(user.instructorUserCode);

    setLoadingMessages(true);
    GetAllChatRoomMessages(user.chatRoomCode, (messages) => {
      setRoomMessages(messages);
      setLoadingMessages(false);
    });
  };

  useEffect(() => {
    GetAllInstructorsofThePurchaseMsg(setInstructors);
    GetAllChatRooms(setChatRooms);
  }, []);

  useEffect(() => {
    if (selectedChatCode) {
      const fetchMessages = () => {
        GetAllChatRoomMessages(selectedChatCode, (messages) => {
          setRoomMessages(messages);
        });
      };

      fetchMessages(); // Initial fetch
      const intervalId = setInterval(fetchMessages, 5000); // Poll every 5 seconds

      return () => clearInterval(intervalId);
    }
  }, [selectedChatCode]);

  const handleComposeMessage = (e) => {
    e.preventDefault();

    if (!selectedInstructor) {
      ErrorAlert("Empty Field", "Please Select Instructor");
      return;
    }

    if (!messageTextAdd) {
      ErrorAlert("Empty Field", "Please Enter Message");
      return;
    }

    AddSendMessage(selectedInstructor, messageTextAdd, selectedCourse, () => {
      setMessageTextAdd("");
      GetAllChatRooms(setChatRooms);
      setShowAddMessage(false);
    });
  };

  const handleSelectedMessageSend = (e) => {
    e.preventDefault();

    if (!selectedInstructorCode) {
      ErrorAlert("Empty Field", "Please Select Instructor");
      return;
    }

    if (!messageTextAdd) {
      ErrorAlert("Empty Field", "Please Enter Message");
      return;
    }

    AddSendMessage(
      selectedInstructorCode,
      messageTextAdd,
      selectedCourse,
      () => {
        setMessageTextAdd("");
      }
    );
  };

  const filteredChatRooms = chatRooms.filter((user) => {
    const searchText = userFilter.toLowerCase();
    return (
      user.instructor.toLowerCase().includes(searchText) ||
      user.courseTitle.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="container-fluid my-5">
      <div className="col-11 m-auto">
        <Card.Header>
          <h3 className="title mt-5">Messages</h3>
        </Card.Header>

        <Card
          className={`p-3 ${theme === "dark" ? "" : "bg-light"}`}
          style={{ backgroundColor: theme === "dark" ? "#1c242f" : "" }}
        >
          <Container fluid>
            <Row className="vh-130">
              <Col
                sm={5}
                md={5}
                lg={4}
                className={`${theme === "dark" ? "" : "bg-light"}`}
                style={{ backgroundColor: theme === "dark" ? "#1c242f" : "" }}
              >
                <h4 className="pt-3 ">
                  Chat Users
                  <span className="float-end">
                    <Button
                      onClick={() => setShowAddMessage(true)}
                      className="edu-btn btn-small"
                    >
                      <i className="fas fa-plus p-0"></i>
                    </Button>
                  </span>
                </h4>

                <div className="input-group mt-4 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Chat Users"
                    aria-label="Search Chat Users"
                    onChange={(e) => setUserFilter(e.target.value)}
                    value={userFilter}
                  />
                  <Button variant="contained" className="edu-btn btn-small">
                    <SearchIcon />
                  </Button>
                </div>

                <List sx={{ width: "100%" }}>
                  {filteredChatRooms.map((user, index) => (
                    <React.Fragment key={index}>
                      <ListItem
                        onClick={() => {
                          setShowAddMessage(false);
                          handleUserClick(user);
                        }}
                        alignItems="flex-start"
                      >
                        <ListItemButton
                          selected={
                            selectedUser === user.instructor &&
                            user.courseTitle === selectedCourseTitleName
                          }
                        >
                          <ListItemAvatar>
                            <Avatar
                              alt={user.instructor}
                              src="/static/images/avatar/1.jpg"
                            />
                          </ListItemAvatar>
                          <ListItemText
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  style={{
                                    color: theme === "dark" ? "#ffffff" : "",
                                  }}
                                  color="text.primary"
                                >
                                  <b>{user.instructor}</b> ({user.courseTitle})
                                </Typography>
                                {user.lastMessage.length > 15 ? (
                                  <>
                                    {" "}
                                    <span>
                                      {user.lastMessage.substring(0, 15)}...
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <span> {user.lastMessage}</span>
                                  </>
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

              {showAddMessage ? (
                <Col sm={7} md={7} lg={8}>
                  <div className="d-flex justify-content-between align-items-center p-3 ">
                    <h4 className="py-2 ">New Messages </h4>
                  </div>

                  <Paper
                    elevation={0}
                    className={`${theme === "dark" ? "" : "bg-light"}`}
                    style={{
                      minHeight: "70vh",
                      overflowY: "auto",
                      backgroundColor: theme === "dark" ? "#1c242f" : "",
                    }}
                  >
                    <Form onSubmit={handleComposeMessage}>
                      <Form.Select
                        onChange={(e) => {
                          const [instructorCode, courseCode] =
                            e.target.value.split(":");
                          setSelectedInstructorCode(instructorCode);
                          setSelectedInstructor(instructorCode);
                          setSelectedCourse(courseCode);
                        }}
                        className="my-3"
                        size="md"
                        aria-label="Select Instructor"
                        style={{
                          backgroundColor: theme === "dark" ? "#1c242f" : "",
                          color: theme === "dark" ? "#ffffff" : "",
                        }}
                      >
                        <option selected disabled value="">
                          Select Instructor
                        </option>
                        {instructors &&
                          instructors.length > 0 &&
                          instructors.map((instructor, index) => (
                            <option
                              key={index}
                              value={`${instructor.userCode}:${instructor.coursesDetails[0]?.courseCode}`}
                            >
                              {instructor.name} -{" "}
                              {instructor.coursesDetails[0]?.courseName}
                            </option>
                          ))}
                      </Form.Select>

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>
                          <h5 className="m-3">Messages</h5>
                        </Form.Label>
                        <Form.Control
                          value={messageTextAdd}
                          onChange={(e) => setMessageTextAdd(e.target.value)}
                          as="textarea"
                          rows={8}
                          className={`${theme === "dark" ? "" : "bg-light"}`}
                          style={{
                            backgroundColor: theme === "dark" ? "#1c242f" : "",
                            color: theme === "dark" ? "#ffffff" : "",
                          }}
                        />
                      </Form.Group>

                      <Button
                        type="submit"
                        className=" float-end edu-btn btn-small"
                        variant="contained"
                      >
                        Send
                      </Button>
                    </Form>
                  </Paper>
                </Col>
              ) : (
                <Col sm={7} md={7} lg={8}>
                  <div className="d-flex justify-content-between align-items-center p-3 "  style={{
                            backgroundColor: theme === "dark" ? "#1c242f" : "",
                            color: theme === "dark" ? "#ffffff" : "",
                          }}>
                    <h4 className="py-2">
                      {" "}
                      Chat with{" "}
                      <b>
                        {selectedUser} - {selectedCourseTitleName}
                      </b>
                    </h4>
                  </div>

                  <Paper
                    elevation={3}
                    className="p-3 m-3"
                    style={{
                      minHeight: "70vh",
                      overflowY: "auto",
                      backgroundColor: theme === "dark" ? "#1c242f" : "",
                    }}
                  >
                    {loadingMessages ? (
                      <Typography>Loading messages...</Typography>
                    ) : (
                      <List>
                        {roomMessages &&
                          roomMessages.map((message, index) => (
                            <MessageBox
                              key={index}
                              styles={{
                                width: 300,
                                color:
                                  message.from === selectedUser
                                    ? "#000"
                                    : "#fff",
                                fontWeight: "bold",
                                background:
                                  message.from === selectedUser
                                    ? "#ebeff0"
                                    : "#e01D20",
                              }}
                              onReplyMessageClick={() =>
                                console.log("reply clicked!")
                              }
                              position={
                                message.from === selectedUser ? "left" : "right"
                              }
                              type={"text"}
                              text={message.message}
                            />
                          ))}
                      </List>
                    )}
                  </Paper>

                  <form
                    onSubmit={handleSelectedMessageSend}
                    className="input-group p-2"
                  >
                    <textarea
                      value={messageTextAdd}
                      onChange={(e) => setMessageTextAdd(e.target.value)}
                      placeholder="Type a Message"
                      className="form-control mx-3"
                      aria-label="With textarea"
                      style={{                      
                        backgroundColor: theme === "dark" ? "#1c242f" : "", color: theme === "dark" ? "#ffffff" : "",
                      }}
                    ></textarea>
                    <Button
                      type="submit"
                      variant="contained"
                      className="edu-btn btn-small"
                    >
                      <SendIcon />
                    </Button>
                  </form>
                </Col>
              )}
            </Row>
          </Container>
        </Card>
      </div>
    </div>
  );
}

export default Messages;
