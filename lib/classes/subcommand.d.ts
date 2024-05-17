import { ChatInputCommandInteraction, Collection } from "discord.js";
import { SubcommandProps } from "../typings";
export default class Subcommand implements SubcommandProps {
    name: string;
    group?: string;
    run: (interaction: ChatInputCommandInteraction) => void;
    constructor(props: SubcommandProps);
}
declare const loadSubcommands: (dir: string, collection: Collection<string, Subcommand>) => Promise<void>;
declare const getSubcommand: (subcommands: Collection<string, Subcommand>, subcommand: string, subcommandGroup?: string) => Subcommand;
export { loadSubcommands, getSubcommand };
