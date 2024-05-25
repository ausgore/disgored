import { Client as DiscordClient, ClientOptions, Collection } from "discord.js";
import { ClientProps } from "../typings";
import Command from "./command";
import Subcommand from "./subcommand";
export default class Client extends DiscordClient implements ClientProps {
    commands: Collection<string, Command>;
    subcommands: Collection<string, Subcommand>;
    constructor(options: ClientOptions);
    init(token: string): Promise<void>;
    private register;
    getSubcommand(command: string, subcommand: string, subcommandGroup?: string | null): Subcommand;
    loadSlashCommands(): Promise<void>;
}
