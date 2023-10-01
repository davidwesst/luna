class ConversationMessage {
    message: string;
    user: string;

    constructor(message: string = "", user: string = "") {
        this.message = message;
        this.user = user;
    }
}
export default ConversationMessage;