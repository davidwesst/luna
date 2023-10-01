import { FunctionComponent } from "react";
import Conversation from "../models/conversation";

interface ConversationOutputProps {
    conversation: Conversation;
}

const ConversationOutput : FunctionComponent<ConversationOutputProps> = (({ conversation } : ConversationOutputProps) => {
    const messageLogItems = conversation.messageLog.map((msg, index) => {
        return (
            <article key={index}>
                <span>{msg.user} : </span>
                <span>{msg.message}</span>
            </article>
        )
    });

    return (
        <div id="conversation_output">
            {messageLogItems}
        </div>
    );
});
export default ConversationOutput;