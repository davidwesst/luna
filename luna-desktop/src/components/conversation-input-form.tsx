import { ChangeEvent, FunctionComponent, KeyboardEvent, useState } from "react";
import { Button, ControlGroup, TextArea } from "@blueprintjs/core";

interface ConversationInputFormProps {
   onSend: (s: string) => void; 
}

const ConversationInputForm : FunctionComponent<ConversationInputFormProps> = (({ onSend }) => {
    const [messageValue, setMessageValue] = useState("");

    const handleKeyboardEvent = (e: KeyboardEvent) => {
        if(e.ctrlKey && e.key === "Enter") {
            submitMessage();
        }
    }

    const submitMessage = () => {
        onSend(messageValue);
        setMessageValue("");
    }

    return (
        <>
            <ControlGroup id="conversation_input" vertical={false}>
                <TextArea
                    fill={true}
                    placeholder="Enter message text here..."
                    value={messageValue}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessageValue(e.currentTarget.value)}
                    onKeyDown={handleKeyboardEvent}
                    />
                <Button
                    icon="send-message"
                    intent="primary"
                    large={true}
                    onClick={() => submitMessage()}>
                </Button>
            </ControlGroup>
            <span>Pro Tip: Press Ctrl + Enter to submit without a click.</span>
        </>
    );
});
export default ConversationInputForm;