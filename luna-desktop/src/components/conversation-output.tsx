import { FunctionComponent, useEffect, useState } from "react";
import { BaseChatMessageHistory, BaseMessage } from "langchain/schema";

interface ConversationOutputProps {
    conversation: BaseChatMessageHistory;
}

const ConversationOutput : FunctionComponent<ConversationOutputProps> = (({ conversation } : ConversationOutputProps) => {
    const [messages, setMessages] = useState(new Array<BaseMessage>());

    useEffect(()=> {
        const getMessages = async () => {
            const messages = await conversation.getMessages();
            setMessages(messages);
        }
        getMessages();
    },[conversation]);

    const messageLogItems = messages.map((msg, index) => {
        if(msg._getType() !== "system") {
            return (
                <article key={index}>
                    <span>{msg.name} : </span>
                    <span>{msg.content}</span>
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