import { useEffect, useState } from "react";
import { stompService } from "../services";
import { Typography, Button, Input } from "@material-tailwind/react";
import Message from "../widgets/Message";
import axios from "axios";

export function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [sender, setSender] = useState("richi");  // Predeterminado a 'richi'
    const [to, setTo] = useState("kevin");          // Predeterminado a 'user1'

    // Suscripción a los mensajes recibidos
    useEffect(() => {
        console.log("Cambio el sender", sender);
        stompService
            .subscribe(`/messageTo/${sender}`, (message) => {
                setMessages((prev) => [...prev, message]);
            })
            .catch((e) => console.error("Error al conectarme", e));

        return () => {
            stompService.unsubscribe(`/messageTo/${sender}`);
        };
    }, [sender]);

    // Manejo del envío de mensajes
    async function handleSendMessage(e) {
        e.preventDefault();
        const messageData = {
            sender: sender,
            type: "message",
            content: newMessage,
            isRead: false,
        };

        const data = await axios.post(`http://localhost:8080/chat?to=${to}`, messageData)
            .then(() => {
                setMessages((prev) => [...prev, messageData]); // Añadir el nuevo mensaje al chat
                setNewMessage(""); // Limpiar el input después de enviar
            })
            .catch((err) => {
                console.error("Error al enviar el mensaje", err);
            });
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-5">
            <div className="flex-grow bg-white shadow-md rounded-lg p-6 mb-4">
                <Typography variant="h2" className="text-center mb-4 text-blue-500">
                    Chat Room
                </Typography>
                <div className="overflow-auto max-h-80 mb-4 no-scrollbar">
                    {messages.map((message, index) => (
                        <Message key={index} message={message} sender={sender} />
                    ))}
                </div>
            </div>

            <div className="flex space-x-2 my-8">
                <Input
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    label="Escribe el remitente"
                    className="flex-grow"
                />
                <Input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    label="Escribe el receptor"
                    className="flex-grow"
                />

            </div>
            <form onSubmit={(e) => handleSendMessage(e)}>
                <div className="flex space-x-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        label="Escribe tu mensaje..."
                        className="flex-grow"
                    />
                    <Button
                        onClick={(e) => handleSendMessage(e)}
                        color="blue"
                        variant="gradient"
                        className="px-4 py-2"
                    >
                        Enviar
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Chat;
