import { useState } from "react";

import "./App.css";

import ConversationOutput from "./components/conversation-output";
import ConversationInputForm from "./components/conversation-input-form";
import Conversation from "./models/conversation";
import { invoke } from "@tauri-apps/api";

function App() {
  const [outputMessage, setOutputMessage] = useState(new Conversation("Output message..."));

  const onSendInput = async (s: string) => {
    const response = await invoke("send_message", { "message": s}) as string;
    setOutputMessage(new Conversation(response));
  }

  return (
    <section className="container">
      <ConversationOutput conversation={outputMessage} />
      <ConversationInputForm
        onSend={onSendInput}
        />
    </section>
  );
}

export default App;
