export interface IConfiguration {
    OpenAIAPIKey: string;
    DefaultTemperature: number;
}

export class Configuration implements IConfiguration {
    OpenAIAPIKey: string;
    DefaultTemperature: number;

    constructor() {
        this.OpenAIAPIKey = "";
        this.DefaultTemperature = 1.2;
    }
}