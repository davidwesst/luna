import { ChangeEvent, FunctionComponent } from "react";
import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";

interface ConversationInputFormProps {
   onSend: (s: string) => void; 
}

const ConversationInputForm : FunctionComponent<ConversationInputFormProps> = (({ onSend }) => {
    return (
        <ControlGroup vertical={false}>
            <InputGroup 
                fill={true}
                large={true}
                placeholder="Enter message text here..."
                onChange={(e:ChangeEvent) => onSend("Text change!")}>
            </InputGroup>
            <Button
                icon="send-message"
                intent="primary"
                large={true}
                onClick={() => onSend("Hello!")}>
            </Button>
        </ControlGroup>
    );
});
export default ConversationInputForm;