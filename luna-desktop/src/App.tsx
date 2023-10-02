import { ChangeEvent, useState } from "react";

import "./App.css";

import ConversationOutput from "./components/conversation-output";
import ConversationInputForm from "./components/conversation-input-form";

import { Button, Drawer, FormGroup, InputGroup, Slider } from "@blueprintjs/core";

import { ConversationChain } from "langchain/chains";
import { SystemMessage } from "langchain/schema";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { OpenAI } from "langchain/llms/openai";

function App() {
  const [conversationMemory, setConverstaionMemory] = useState(new BufferMemory({
    chatHistory: new ChatMessageHistory([
      new SystemMessage("You are a helpful AI assistant named Luna, named after the cat from the anime series Sailor Moon. You are meant to help your user, like Luna would help Usagi, and occasionally make a reference to the point that you are an AI in the form of a cat.")
    ])
  }));
  const conversationTitle = "Convo Title"; // TODO: change to useState to change title
  const [showConfigDialogue, setShowConfigDialogue] = useState(false);
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [temperature, setTemperature] = useState(1.3);

  const handleSendMessage = async (message: string) => {
    const model = new OpenAI({
      openAIApiKey: openaiApiKey,
      temperature: temperature
    });
    const memory = conversationMemory;

    const chain = new ConversationChain({ llm: model, memory: memory });
    await chain.run(message);
    setConverstaionMemory(new BufferMemory({
      chatHistory: memory.chatHistory
    }));
  }

  const toggleConfigDialog = () => {
    setShowConfigDialogue(!showConfigDialogue);
  }

  return (
    <section className="container">
      <header className="convo_header">
          <h1 className="convo_title">{conversationTitle}</h1>
          <Button icon="wrench" onClick={toggleConfigDialog} />
      </header>
      <ConversationOutput conversation={conversationMemory.chatHistory} />
      <ConversationInputForm
        onSend={handleSendMessage}
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
        <FormGroup
          label="Temperature"
          inline={false}>
            <Slider
              min={0.0}
              max={2.0}
              stepSize={0.1}
              onChange={(val: number) => setTemperature(val)}
              value={temperature} />
        </FormGroup>
      </Drawer>
    </section>
  );
}

export default App;
