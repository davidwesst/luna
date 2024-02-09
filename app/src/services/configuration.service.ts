import { Configuration, IConfiguration } from "../models/configuration";

export interface IConfigurationService {
    loadConfiguration(): Promise<IConfiguration>;
    saveConfiguration(config: IConfiguration): Promise<void>;
}

export class WebStorageConfiguraionService implements IConfigurationService {
    static readonly STORAGEKEY_OPENAIAPIKEY = "openai";
    static readonly STORAGEKEY_TEMPERATURE = "temperature";

    async loadConfiguration(): Promise<IConfiguration> {
        const config = new Configuration();
        if(window.localStorage) {
            config.OpenAIAPIKey = localStorage.getItem(WebStorageConfiguraionService.STORAGEKEY_OPENAIAPIKEY) || "";
            
            const unparsedTemperature = localStorage.getItem(WebStorageConfiguraionService.STORAGEKEY_TEMPERATURE);
            if(unparsedTemperature) {
                config.DefaultTemperature = Number.parseFloat(unparsedTemperature);
            }
            else {
                config.DefaultTemperature = 0.1;
            }
        }

        return Promise.resolve<IConfiguration>(config); 
    }

    async saveConfiguration(config: IConfiguration): Promise<void> {

        if(window.localStorage) {
            localStorage.setItem(WebStorageConfiguraionService.STORAGEKEY_OPENAIAPIKEY, config.OpenAIAPIKey);
            localStorage.setItem(WebStorageConfiguraionService.STORAGEKEY_TEMPERATURE, config.DefaultTemperature.toString());
        }

        return Promise.resolve();
    }
}

