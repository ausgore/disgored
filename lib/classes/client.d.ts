import { Client as DiscordClient, ClientOptions, Collection } from "discord.js";
import { ClientProps, InitOptionsProps } from "../typings";
import Command from "./command";
import Subcommand from "./subcommand";
export default class Client<Ready extends boolean = boolean> extends DiscordClient<Ready> implements ClientProps {
    commands: Collection<string, Command>;
    subcommands: Collection<string, Subcommand>;
    constructor(options: ClientOptions);
    init(token: string, options?: InitOptionsProps): Promise<void>;
    private register;
    getSubcommand(command: string, subcommand: string, subcommandGroup?: string | null): Subcommand;
    loadSlashCommands(): Promise<void>;
}
