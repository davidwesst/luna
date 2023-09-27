import { FunctionComponent } from "react";

interface ConversationOutputProps {
    message: string;
}

const ConversationOutput : FunctionComponent<ConversationOutputProps> = (({ message } : ConversationOutputProps) => {
    return (
        <div id="conversation_output">
            {message}
        </div>
    );
});
export default ConversationOutput;