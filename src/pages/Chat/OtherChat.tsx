import { FC } from "react";
import { IChatProps } from "../../interfaces/ChatProps";

const OtherChat: FC<IChatProps> = ({text, username, createdAt}) => {
    return (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-8 h-8 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User avatar" />
                </div>
            </div>
            <div className="chat-header mb-1">
                {username}
                <time className="text-xs opacity-50 ml-1">{new Date(createdAt).toLocaleTimeString()}</time>
            </div>
            <div className="chat-bubble">{text}</div>
        </div>
    );
}

export default OtherChat;
