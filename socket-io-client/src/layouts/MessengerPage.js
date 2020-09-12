import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import EntryBar from "../components/EntryBar";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar";

const ENDPOINT = "http://127.0.0.1:4001";

export default function MessengerPage() {
    const [socket, setSocket] = useState(socketIOClient(ENDPOINT));
    let [room, setRoom] = useState("1");

    useEffect(() => {
        // CLEAN UP THE EFFECT
        socket.emit("join room", room);

        socket.on('textMessage', (message) => {
            console.log(message);
        })

        return () => socket.disconnect();
    }, []);

    return (
        <Container>
            <h1>This is the messenger page</h1>
            <Navbar bg="light" expand="lg" fixed={"bottom"}>
                <Container>
                    <EntryBar send={(text) => {
                        socket.emit("textMessage", {text: text, room: room});
                    }}/>
                </Container>
            </Navbar>
        </Container>
    );
}
