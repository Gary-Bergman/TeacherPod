import React, { useState } from "react";
// import Header from "../Header/header"
import { Container, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button, FormText, Row, CardText, Col } from "reactstrap";
import "./login.css";
import axios from "axios";
import API from "../../utils/API";
import Header from "../Header/header"
import Footer from "../Footer/footer"
// import Home from "../Home/home"

function Login() {
    const [loggedIn, setLogin] = useState("");
    const [username, setUsername] = useState("");
    const [id, setId] = useState("");
    const [loginInput, setInput] = useState({
        username: "",
        password: ""
    })

    const handleInputChange = event => {
        setInput({
            ...loginInput,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        console.log(loginInput);
        axios.post("/api/users/login", loginInput)
            .then(({ data }) => {
                if (data.message === "Logged in") {
                    window.location.replace("/");
                }
            })
    }

    return (
        <>
            <Header loggedIn={loggedIn} id={id} username={username} func={{ setLogin, setUsername, setId }} />
            <Row className="mt-5 profileCardRow loginSignupRowSize">
                <Col xs="8" className="offset-2">
                    <Container className>
                        <Card className="loginCard">
                            <CardTitle className="text-center loginTitle darkGrayText">LOGIN
                    <hr className="line"></hr>
                            </CardTitle>
                            <CardBody>

                                <Form>
                                    <FormGroup>
                                        <Label for="exampleEmail">Email</Label>
                                        <Input type="email" name="username" id="exampleEmail" placeholder="test@example.com" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword">Password</Label>
                                        <Input type="password" name="password" id="examplePassword" placeholder="Enter password here" onChange={handleInputChange} />
                                    </FormGroup>
                                  
                                        <Button className="btnHover hvr-fade" onClick={handleFormSubmit}>Submit</Button>
                                        <div className="floatRt">
                                            Don't have an account yet?<a className="iconHvr-fade2" href="/signup"> Signup</a>
                                        </div>


                         


                                </Form>
                            </CardBody>
                        </Card>
                    </Container>
                </Col>
            </Row>
            <Footer />
        </>
    )
}

export default Login;