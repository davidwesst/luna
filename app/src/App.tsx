import { ChangeEvent, useEffect, useState } from "react";

import "./App.css";

import ConversationOutput from "./components/conversation-output";
import ConversationInputForm from "./components/conversation-input-form";
import { toaster as ConversationToaster } from "./components/conversation-toaster";

import { Button, Drawer, FormGroup, InputGroup,  Slider } from "@blueprintjs/core";

import { ConversationChain } from "langchain/chains";
import { BaseMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { OpenAI } from "@langchain/openai";
import { IConfiguration } from "./models/configuration";
import { IConfigurationService, WebStorageConfiguraionService } from "./services/configuration.service";

function App() {
  const conversationTitle = "Conversation with Luna 🐈‍⬛"; // TODO: change to useState to change titl
  const [conversationMessages, setConversationMessages] = useState(new Array<BaseMessage>(
      new SystemMessage("You are a helpful AI assistant named Luna, named after the cat from the anime series Sailor Moon. You are meant to help your user, like Luna would help Usagi, and occasionally make a reference to the point that you are an AI in the form of a cat.")
  ));
  const [showConfigDialogue, setShowConfigDialogue] = useState(false);
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [temperature, setTemperature] = useState(1.2);

  const configService : IConfigurationService = new WebStorageConfiguraionService();

  const handleSendMessage = async (message: string) => {
    try {
      // send the message to OpenAI
      const model = new OpenAI({
        openAIApiKey: openaiApiKey,
        temperature: temperature
      });

      if(openaiApiKey) {
        const memory = new BufferMemory({
          chatHistory: new ChatMessageHistory(conversationMessages)
        });

        const chain = new ConversationChain({ llm: model, memory: memory });

        // update UI state to display message that was submitted
        setConversationMessages(conversationMessages.concat(new HumanMessage(message)));

        // update it again with the response when it returns
        await chain.run(message);
        const updatedMessages = await memory.chatHistory.getMessages();
        setConversationMessages(new Array<BaseMessage>(...updatedMessages));
      }
    }
    catch(e: string | unknown) {
      // console.error(e);
      ConversationToaster.show({
        message: `${e}`,
        icon: "error",
        intent: "danger"
      })
    }
  }

  const toggleConfigDialog = () => {
    setShowConfigDialogue(!showConfigDialogue);
  }

  const handleSaveConfigurationClick = async () => {
    await configService.saveConfiguration({
      OpenAIAPIKey: openaiApiKey,
      DefaultTemperature: temperature
    });
  }

  useEffect(()=> {
    const loadConfig = async () => {
      const config : IConfiguration = await configService.loadConfiguration();

      setOpenaiApiKey(config.OpenAIAPIKey);
      setTemperature(config.DefaultTemperature);
    }
    loadConfig();
  },[]);

  return (
    <section className="container">
      <header className="convo_header">
          <h1 className="convo_title">{conversationTitle}</h1>
          <Button icon="wrench" onClick={toggleConfigDialog} />
      </header>
      <ConversationOutput messages={conversationMessages} />
      <ConversationInputForm
        onSend={handleSendMessage}
        />
      <Drawer isOpen={showConfigDialogue} onClose={toggleConfigDialog} className="config_panel">
        <FormGroup
          label="OpenAI API Key"
          inline={false}
          >
          <InputGroup id="openai_api_key" 
            placeholder="Enter OpenAI API Key"
            type="password"
            value={openaiApiKey}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setOpenaiApiKey(e.currentTarget.value)} />
        </FormGroup>
        <FormGroup
          label="Default Temperature"
          inline={false}>
            <Slider
              min={0.0}
              max={2.0}
              stepSize={0.1}
              onChange={(val: number) => setTemperature(val)}
              value={temperature} />
        </FormGroup>
        <Button
          icon="floppy-disk"
          text="Save Configuration"
          onClick={handleSaveConfigurationClick}
          />
      </Drawer>
    </section>
  );
}

export default App;