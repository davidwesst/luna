import ConversationMessage from "./conversation-message";

class Conversation { 
    messageLog: ConversationMessage[];

    constructor(message?: string) {
        this.messageLog = [
            {
                message: message + " is in the message log",
                user: "test-user"
            }
        ];
    }
}
export default Conversation;