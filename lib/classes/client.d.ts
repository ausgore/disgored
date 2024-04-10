import { Client as DiscordClient, ClientOptions, Collection } from "discord.js";
import { ClientProps } from "../typings";
import Command from "./command";
export default class Client extends DiscordClient implements ClientProps {
    commands: Collection<string, Command>;
    constructor(options: ClientOptions);
    init(token: string): Promise<void>;
    private register;
    loadSlashCommands(): Promise<void>;
}
