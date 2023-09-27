import { FunctionComponent } from "react";
import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";

const ConversationInputForm : FunctionComponent = (() => {
    return (
        <ControlGroup vertical={false}>
            <InputGroup fill={true} large={true} placeholder="Enter message text here..."></InputGroup>
            <Button icon="send-message" intent="primary" large={true}></Button>
        </ControlGroup>
    );
});
export default ConversationInputForm;