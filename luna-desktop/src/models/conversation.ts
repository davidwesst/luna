import ConversationMessage from "./conversation-message";

class Conversation { 
    messageLog: ConversationMessage[];
    title: string;

    constructor(message?: string, title: string = "") {
        this.messageLog = [
            {
                message: message + " is in the message log",
                user: "test-user"
            }
        ];
        this.title = title;
    }
}
export default Conversation;