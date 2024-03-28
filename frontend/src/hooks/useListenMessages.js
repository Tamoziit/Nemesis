import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true; //styling
            const sound = new Audio(notificationSound); //notific sound
            sound.play();
            setMessages([...messages, newMessage]);
        })

        //cleanup func. --> to prevent multiple listening to event "newMessage"
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
}

export default useListenMessages