import { useState } from "react";

import "./App.css";

import ConversationOutput from "./components/conversation-output";
import ConversationInputForm from "./components/conversation-input-form";
import Conversation from "./models/conversation";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { BaseMessage, HumanMessage } from "langchain/schema";

function App() {
  const [outputMessage, setOutputMessage] = useState(new Conversation("Output message..."));

  const onSendInput = async (s: string) => {
    const OPENAI_API_KEY = "";

    const chatModel = new ChatOpenAI({
      openAIApiKey: OPENAI_API_KEY,
      temperature: 1.3 
    });
    const messages : Array<BaseMessage> = [
      new HumanMessage({ content: s })
    ];
    const chatResult = await chatModel.predictMessages(messages);

    setOutputMessage(new Conversation(chatResult.content));
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
