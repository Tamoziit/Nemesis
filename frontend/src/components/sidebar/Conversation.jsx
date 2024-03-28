import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    //Online functionality
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return <>
        <div className={`flex gap-2 items-center hover:bg-gray-600 rounded  p-2 py-1 cursor-pointer
            ${isSelected ? "bg-gray-600" : ""}`}
            onClick={() => setSelectedConversation(conversation)}>
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                    <img src={conversation.profilePic} alt={conversation.fullName} />
                </div>
            </div>

            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <div className="flex flex-col">
                        <p className='font-bold text gray-200'>{conversation.username}</p>
                        <p className='text gray-100 font-extralight'>{conversation.fullName}</p>
                    </div>
                    <span className='text-xl'>{emoji}</span>
                </div>
            </div>
        </div>

        {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
}

export default Conversation