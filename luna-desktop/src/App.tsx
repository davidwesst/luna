import { useState } from "react";

import "./App.css";

import ConversationOutput from "./components/conversation-output";
import ConversationInputForm from "./components/conversation-input-form";
import { invoke } from "@tauri-apps/api";

function App() {
  const [outputMessage, setOutputMessage] = useState("Output message here...");

  const onSendInput = async (s: string) => {
    const response = await invoke("send_message", { "message": s}) as string;
    setOutputMessage(response);
  }

  return (
    <section className="container">
      <ConversationOutput message={outputMessage} />
      <ConversationInputForm
        onSend={onSendInput}
        />
    </section>
  );
}

export default App;
