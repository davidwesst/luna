import { FunctionComponent, useEffect, useState } from "react";
import { BaseMessage, MessageType } from "langchain/schema";

interface ConversationOutputProps {
    messages: Array<BaseMessage>;
}

const ConversationOutput : FunctionComponent<ConversationOutputProps> = (({ messages } : ConversationOutputProps) => {
    const getDisplayName = (messageType: MessageType) => {
        let displayName = "Unknown";
        switch (messageType) {
            case "ai":
                displayName = "Luna";
                break;
            case "function":
                displayName = "Luna";
                break;
            case "generic":
                displayName = "Generic";
                break;
            case "human":
                displayName = "You";
                break;
            case "system":
                displayName = "System";
                break;
            default:
                break;
        }

        return displayName;
    }

    const messageLogItems = messages.map((msg, index) => {
        const messageType = msg._getType();
        if(messageType !== "system") {
            const displayName = getDisplayName(messageType); 
            return (
                <article className="message_item" key={index}>
                    <span className="sender">{displayName}</span>
                    <span className="content">{msg.content}</span>
                </article>
            )
        }
    });

    return (
        <div id="conversation_output">
            {messageLogItems}
        </div>
    );
});
export default ConversationOutput;