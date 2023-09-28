import { ChangeEvent, FunctionComponent, useState } from "react";
import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";

interface ConversationInputFormProps {
   onSend: (s: string) => void; 
}

const ConversationInputForm : FunctionComponent<ConversationInputFormProps> = (({ onSend }) => {
    const [messageValue, setMessageValue] = useState("");

    return (
        <ControlGroup vertical={false}>
            <InputGroup 
                fill={true}
                large={true}
                placeholder="Enter message text here..."
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMessageValue(e.currentTarget.value)}>
            </InputGroup>
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