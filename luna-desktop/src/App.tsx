import { ChangeEvent, useState } from "react";

import "./App.css";

import ConversationOutput from "./components/conversation-output";
import ConversationInputForm from "./components/conversation-input-form";
import Conversation from "./models/conversation";

import { Button, Drawer, FormGroup, InputGroup } from "@blueprintjs/core";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { BaseMessage, HumanMessage } from "langchain/schema";

function App() {
  const [outputMessage, setOutputMessage] = useState(new Conversation("Output message...", "Convo Title"));
  const [showConfigDialogue, setShowConfigDialogue] = useState(false);
  const [openaiApiKey, setOpenaiApiKey] = useState("");

  const onSendInput = async (s: string) => {
    const OPENAI_API_KEY = openaiApiKey;

    const chatModel = new ChatOpenAI({
      openAIApiKey: OPENAI_API_KEY,
      temperature: 1.3 
    });
    const messages : Array<BaseMessage> = [
      new HumanMessage({ content: s })
    ];
    const chatResult = await chatModel.predictMessages(messages);

    setOutputMessage(new Conversation(chatResult.content, "Convo Title"));
  }

  const toggleConfigDialog = () => {
    setShowConfigDialogue(!showConfigDialogue);
  }

  return (
    <section className="container">
      <header className="convo_header">
          <h1 className="convo_title">{outputMessage.title}</h1>
          <Button icon="wrench" onClick={toggleConfigDialog} />
      </header>
      <ConversationOutput conversation={outputMessage} />
      <ConversationInputForm
        onSend={onSendInput}
        />
      <Drawer isOpen={showConfigDialogue} onClose={toggleConfigDialog}>
        <FormGroup
          label="OpenAI API Key"
          inline={false}
          >
          <InputGroup id="openai_api_key" 
            placeholder="Enter OpenAI API Key"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setOpenaiApiKey(e.currentTarget.value)}/>
        </FormGroup>
      </Drawer>
    </section>
  );
}

export default App;
