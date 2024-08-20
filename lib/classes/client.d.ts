import { Client as DiscordClient, ClientOptions, REST, Collection } from "discord.js";
import { ClientProps, InitOptionsProps } from "../typings";
import Command from "./command";
import Subcommand from "./subcommand";
export default class Client<Ready extends boolean = boolean> extends DiscordClient<Ready> implements ClientProps {
    rest: REST;
    commands: Collection<string, Command>;
    subcommands: Collection<string, Subcommand>;
    constructor(options: ClientOptions);
    init(token: string, options: InitOptionsProps): Promise<void>;
    /** Get a command or subcommand */
    getCommand(command: string, subcommand: string, group?: string | null): Subcommand;
    /** Loads the slash commands after registering the commands */
    private loadSlashCommands;
    /** Register handler */
    private register;
}
