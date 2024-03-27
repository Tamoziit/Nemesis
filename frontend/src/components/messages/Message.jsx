
const Message = () => {
    return (
        <div className='chat chat-end'>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="avatar" src={"profile.jpg"} />
                </div>
            </div>
            <div className={'chat-bubble text-white bg-slate-600'}>Hi! kaisa chal raha?</div>
            <div className="chat-footer opacity-500 text-xs flex gap-1 items-center">12:24</div>
        </div>
    )
}

export default Message