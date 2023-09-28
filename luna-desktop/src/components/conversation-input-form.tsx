import { ChangeEvent, FunctionComponent, useState } from "react";
import { Button, ControlGroup, InputGroup, TextArea } from "@blueprintjs/core";

interface ConversationInputFormProps {
   onSend: (s: string) => void; 
}

const ConversationInputForm : FunctionComponent<ConversationInputFormProps> = (({ onSend }) => {
    const [messageValue, setMessageValue] = useState("");

    return (
        <ControlGroup id="conversation_input" vertical={false}>
            <TextArea
                fill={true}
                placeholder="Enter message text here..."
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessageValue(e.currentTarget.value)}
                />
            <Button
                icon="send-message"
                intent="primary"
                large={true}
                onClick={() => onSend(messageValue)}>
            </Button>
        </ControlGroup>
    );
});
export default ConversationInputForm;