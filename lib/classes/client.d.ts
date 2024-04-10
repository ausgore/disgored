import { Client as DiscordClient, ClientOptions } from "discord.js";
import { ClientProps } from "../typings";
import Command from "./command";
export default class Client extends DiscordClient implements ClientProps {
    commands: Map<string, Command>;
    constructor(options: ClientOptions);
    init(token: string): Promise<void>;
    private register;
}
