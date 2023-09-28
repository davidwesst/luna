import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/tauri";

import "./App.css";

import ConversationOutput from "./components/conversation-output";
import ConversationInputForm from "./components/conversation-input-form";

function App() {
  const [outputMessage, setOutputMessage] = useState("Output message here...");

  return (
    <section className="container">
      <ConversationOutput message={outputMessage}></ConversationOutput>
      <ConversationInputForm
        onSend={(s: string) => setOutputMessage(s)}
        >
      </ConversationInputForm>
    </section>
  );
}

export default App;
