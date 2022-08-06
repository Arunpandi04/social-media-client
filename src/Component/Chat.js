import React, { useState, useEffect } from "react";
import socketClient from "socket.io-client";
import { Container, Row, Col, Stack, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser, search } from "../Store/Action/authAction";
import axios from "../Utlis/custom-axios";
import Header from "./Header";
import Sidebar from "./Sidebar";

const SERVER = "http://localhost:5000";
const socket = socketClient(SERVER);
const Base_URL = "http://localhost:5000";

function Chat() {
  const [sender, setSender] = useState("");
  const [reciever, setReciever] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);

  useEffect(() => {
    const me = sessionStorage.getItem("email");
    setSender(me);
  }, []);
  useEffect(() => {
    socket.on("connection", () => {
      console.log("connected ......!");
    });

    socket.on("disconnect", () => {
      console.log("disconnect ......!");
    });

    socket.on("output", (data) => {
      console.log("data", data);
      setMessages(data);
    });

    socket.on("message", (data) => {
      console.log("conxt", messages, data);
      setMessages((list) => [...list, data]);
    });
    return () => {
      socket.off("connection");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, [socket]);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    dispatch(getUser(id));
  }, [dispatch]);

    useEffect(()=>{
      if(selector.search.length > 0){
        setSearchValue([...selector.search]);
      }
    },[selector.search, dispatch])
  useEffect(() => {
    if (selector?.user?.followers && selector?.user?.following) {
      const tUser = selector?.user?.following
        .map((e) => {
          // if(e?.message?.length > 0 && e?.message[0].from !== sender){
          return {
            email: e?.user.email,
            onlineUser: e?.user?.onlineUser,
            message: e?.message,
          };
          // }
        })
        .filter((e) => e !== undefined);
      const fUser = selector?.user?.followers
        .map((e) => {
          if (e?.message?.length > 0 && e?.message[0].from !== sender) {
            return {
              email: e?.user.email,
              onlineUser: e?.user?.onlineUser,
              message: e?.message,
            };
          }
        })
        .filter((e) => e !== undefined);
      const user = [...tUser, ...fUser];
      const uniqueUser = [...new Set(user.map(JSON.stringify))].map(JSON.parse);
      setUsers(uniqueUser);
    }
  }, [selector.user, dispatch]);
  const sendMessage = async () => {
    await socket.emit("chatMessage", {
      fromUser: sender,
      toUser: reciever,
      msg: message,
      date: new Date(),
    });
    setMessage("");
  };

  const connecting = (user) => {
    setReciever(user);
    socket.emit("userDetails", {
      fromUser: sender,
      toUser: user,
    });
  };
  const handlesearch = async (e) => {
    setSearchKey(e.target.value);
    dispatch(search(e.target.value));
    if(e.target.value === ''){
      setSearchValue([]);
    }
  };
  const addChat = (user) => {
    const prevUser = users;
    if(!users.find(({email})=> email === user.email)){
      prevUser.push({
        email: user.email,
        onlineUser: user.onlineUser,
        message: []
      })
      setUsers([...prevUser]);
    }
    setSearchValue([]);
    setSearchKey('')
  }
  console.log("trye",users)
  return (
    <>
      <Header />
      <Sidebar />
      <div className="custom-container">
        <Container fluid>
          <Row>
            <Col className="dashboard-content" sm={12}>
              <Row>
                <Col sm={6}>
                  <Row className="user-row">
                    <Col sm={6}>
                    <div className="user-container">
                      <h6>Online Users</h6>
                      {users?.length > 0 &&
                        users.map((e) => {
                          return (
                            e?.onlineUser && (
                              <h5 onClick={() => connecting(e?.email)}>
                                {e?.email}
                              </h5>
                            )
                          );
                        })}
                    </div>
                    <br />
                    <div className="user-container">
                    <h6>Offline Users</h6>
                      {users?.length > 0 &&
                        users.map((user) => {
                          return (
                            !user?.onlineUser && (
                              <h5 onClick={() => connecting(user?.email)}>
                                {user?.email}
                              </h5>
                            )
                          );
                        })}
                    </div>
                    </Col>
                    <Col sm={6}>
                      <input onChange={handlesearch} value={searchKey}/>
                      <div className="search-container">
                        {searchValue.map((user) => (
                          <h5 onClick={()=> addChat(user)}>{user.email}</h5>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm={6} className="message">
                  <div className="message-body">
                    {messages.length > 0 ? (
                      messages.map((e) => <div>{e.message}</div>)
                    ) : (
                      <div>No Message Found</div>
                    )}
                    <footer className="message-footer">
                      <Stack direction="horizontal" gap={4}>
                        <Form.Control
                          type="text"
                          name="message"
                          placeholder="Enter Message"
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                        />
                        <Button onClick={sendMessage}>send</Button>
                      </Stack>
                    </footer>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Chat;
