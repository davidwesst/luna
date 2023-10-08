import { Configuration, IConfiguration } from "../models/configuration";

export interface IConfigurationService {
    loadConfiguration(): Promise<IConfiguration>;
    saveConfiguration(): Promise<void>;
}

export class WebStorageConfiguraionService implements IConfigurationService {
    async loadConfiguration(): Promise<IConfiguration> {
        const config = new Configuration();

        return Promise.resolve<IConfiguration>(config); 
    }

    async saveConfiguration(): Promise<void> {
        return Promise.resolve();
    }
}

