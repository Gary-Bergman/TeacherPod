import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import API from "../../utils/API";

const MessageModal = (props) => {
    const [msgData, setMsgData] = useState({
        receiver: "",
        content: "",
        sender: props.username
    });

    useEffect(() => {
        if (props.receiver) {
            setMsgData({
                ...msgData,
                receiver: props.receiver
            })
        }
    }, [])

    const handleInputChange = event => {
        setMsgData({
            ...msgData,
            [event.target.name]: event.target.value
        })
    }

    const sendMsg = event => {
        event.preventDefault();
        props.toggle();

        API.createConversation({participants: [props.username,msgData.receiver]})
            .then(res => {
                if (msgData.content !== "") {
                    API.createMessage({message: msgData})
                        .then(res => console.log(res))
                }
            })
            .catch(err => console.log(err));
    }


    return (
        <Modal isOpen={props.messageModal} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Start a conversation!</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="podName">Receipients's Email</Label>
                        <Input type="text" name="receiver" value={msgData.receiver} id="podName" placeholder="Email" onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="grade">Send with a message</Label>
                        <Input type="text" name="content" value={msgData.content} id="grade" placeholder="Optional" onChange={handleInputChange} />
                    </FormGroup>
                    <Button onClick={sendMsg}>Send</Button>
                    <Button onClick={props.toggle} className="ml-3 mr-0">Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default MessageModal;