import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConversation from "../../zustand/useConversation";
import { TiMessage } from "react-icons/ti";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { IoMdArrowRoundBack } from "react-icons/io";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    //Reseting last selected convo status on logoout
    useEffect(() => {
        //cleanup function (unmounting)
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    const handleClick = () => {
        setSelectedConversation(null);
    }

    return (
        <div className="md:min-w-[450px] flex flex-col">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between">
                        <div>
                            <span className="label-text">To:{" "}{" "}</span>
                            <span className="text-gray-900 font-bold">{selectedConversation.username}</span>
                        </div>
                        <button className="text-gray-900 font-bold" onClick={handleClick}><IoMdArrowRoundBack /></button>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    )
}

export default MessageContainer



const NoChatSelected = () => {
    const { authUser } = useAuthContext();

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋🏽 {authUser?.fullName} 🥂</p>
                <p>Select a chat to start messaging...</p>
                <TiMessage className="text-3xl md:text-6xl text-center" />
            </div>
        </div>
    )
}